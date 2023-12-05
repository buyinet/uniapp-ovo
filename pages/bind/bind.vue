<template>
  <view class="content">
    <scroll-view scroll-y :style="'height: calc(100vh - '+bottomBoxHeight+'px);width: 100vw;'">
      <view class="box">
        <kt-nav-bar></kt-nav-bar>

        <template v-if="!userStore.state.selfInfo.email&&!userStore.state.selfInfo.phone">
          <view>
            <text
                style="font-size: 50rpx;"
            >绑定邮箱或者手机号
            </text>
          </view>

          <view style="height: 40rpx"></view>

          <view class="input" v-if="requestParam.username.indexOf('@') == -1">
            <view style="height: 10rpx"></view>
            <u-row>
              <u-col :span="1.5">
                <u-icon
                    @click="tipPhone()"
                    :name="requestParam.phoneAreaCode" :size="'28rpx'" color="#333333"></u-icon>
              </u-col>
              <u-col :span="10.5">
                <input
                    :placeholder="'手机号 / 邮箱'"
                    v-model="requestParam.username"
                ></input>
              </u-col>
            </u-row>
            <view style="height: 10rpx"></view>
          </view>

          <view class="input" v-else>
            <view style="height: 10rpx"></view>
            <u-row>
              <u-col :span="1">
                <u-icon name="email" :size="'40rpx'" color="#333333"></u-icon>
              </u-col>
              <u-col :span="11">
                <input
                    :placeholder="'手机号 / 邮箱'"
                    v-model="requestParam.username"
                ></input>
              </u-col>
            </u-row>
            <view style="height: 10rpx"></view>
          </view>
        </template>

        <template v-if="userStore.state.selfInfo.email&&!userStore.state.selfInfo.phone">
          <view>
            <text
                style="font-size: 50rpx;"
            >绑定手机号
            </text>
          </view>

          <view style="height: 40rpx"></view>

          <view class="input">
            <view style="height: 10rpx"></view>
            <u-row>
              <u-col :span="1.5">
                <u-icon
                    @click="tipPhone()"
                    :name="requestParam.phoneAreaCode" :size="'28rpx'" color="#333333"></u-icon>
              </u-col>
              <u-col :span="10.5">
                <input
                    :placeholder="'手机号'"
                    v-model="requestParam.username"
                ></input>
              </u-col>
            </u-row>
            <view style="height: 10rpx"></view>
          </view>
        </template>


        <template v-if="!userStore.state.selfInfo.email&&userStore.state.selfInfo.phone">
          <view>
            <text
                style="font-size: 50rpx;"
            >绑定邮箱
            </text>
          </view>

          <view style="height: 40rpx"></view>

          <view class="input">
            <view style="height: 10rpx"></view>
            <u-row>
              <u-col :span="1.5">
                <u-icon name="email" :size="'40rpx'" color="#333333"></u-icon>
              </u-col>
              <u-col :span="10.5">
                <input
                    :placeholder="'邮箱'"
                    v-model="requestParam.username"
                ></input>
              </u-col>
            </u-row>
            <view style="height: 10rpx"></view>
          </view>
        </template>

        <view style="height: 40rpx"></view>

        <view
            class="input">
          <view style="height: 10rpx"></view>

          <u-row>
            <u-col :span="2">
              <u-icon name="minus-square-fill" :size="'50rpx'" color="#333333"></u-icon>
            </u-col>
            <u-col :span="8">
              <input
                  style="border: none;
                  text-align: center;
                  background-color: rgba(0,0,0,0)"
                  :placeholder="'验证码'"
                  maxlength="6"
                  v-model="requestParam.varCode"
              ></input>
            </u-col>
            <u-col :span="2">
              <view style="text-align: center">
                <view v-if="isSendingVarCode">···</view>
                <view
                    v-else-if="sendVarCodeTime>0"
                    @click="sendVarCode()"
                    class="send-btn"
                    style="font-size: 28rpx"
                >
                  {{ sendVarCodeTime }}
                </view>
                <view
                    v-else
                    @click="sendVarCode()"
                    class="send-btn"
                    style="font-size: 28rpx">
                  发送
                </view>
              </view>
            </u-col>
          </u-row>
          <view style="height: 10rpx"></view>

        </view>


        <view style="height: 20rpx"></view>
        <view style="font-size: 25rpx">
          <text
              @click="changeLoginType('varCode')"
              style="margin-left: 30rpx;color: #8f8f94">
            自动绑定已有的账号
          </text>

        </view>
        <view style="height: 60rpx"></view>
        <kt-button
            ref="ktButton"
            @click="submit()"
            :is-open-box-shadow="false"
        >绑定
        </kt-button>
        <view style="height: 20rpx"></view>
        <view style="text-align: center">
          <view class="skip-button"
                @click="skipBind()"
          >跳过绑定
          </view>
        </view>
      </view>
    </scroll-view>


    <view class="bottom-box" ref="bottomBox" id="bottomBox">
      <image
          class="bottom-image"
          mode="aspectFill"
          :src="$kt.file.byPath('image/bind.png')"></image>

    </view>


  </view>
</template>

<script>
import rsa from "@/commonJs/rsa";
import {JSEncrypt} from "@/uni_modules/jsencrypt";
import userStore from "@/store/modules/user";

export default {
  data() {
    return {
      userStore,
      bottomBoxHeight: 0,
      requestParam: {
        // 账号
        username: '',
        // 密码
        password: '',
        // 手机号码国际区号
        phoneAreaCode: '+86',
        // 登录方式编码
        loginTypeCode: 'varCode',
        // 验证码
        varCode: '',
        // 微信登录code
        loginCode: '',
      },
      // 密码是否可见
      passwordIsVisible: false,
      // 是否登录中，防止重复点击
      isLogining: false,
      // 是否正在发送验证码
      isSendingVarCode: false,
      sendVarCodeTime: 0,
    }
  },
  created() {
    this.initVarCodeTime();
    this.intervalVarCodeTime();
  },
  mounted() {
    // 获取底部盒子的高度
    uni.createSelectorQuery().select('#bottomBox').boundingClientRect((rect) => {
      this.bottomBoxHeight = rect.height;
    }).exec();
  },
  methods: {
    initVarCodeTime() {
      // 上次发送注册登录验证码的时间
      let lastSendVarCodeTime = uni.getStorageSync('lastSendVarCodeTimeOfBind');
      if (lastSendVarCodeTime) {
        // 60秒内不可再次发送
        if (new Date().getTime() - lastSendVarCodeTime < 60 * 1000) {
          this.sendVarCodeTime = 60 - Math.floor((new Date().getTime() - lastSendVarCodeTime) / 1000);
        }
      }
    },
    intervalVarCodeTime() {
      if (this.sendVarCodeTime > 0) {
        this.sendVarCodeTime--;
        setTimeout(() => {
          this.intervalVarCodeTime();
        }, 1000);
      }
    },
    skipBind() {
      this.$request({
        url: "/system-user-web/user/skipBind",
        method: "post",
        stateSuccess: (json) => {
          this.loginSuccess(json);
        },
        stateFail: (json) => {
          console.log(json);
        }
      });
    },
    /**
     * 登录完成后的跳转
     * @param res
     */
    loginSuccess(res) {
      console.log(res);
      if (!res.data.isInit) {
        // 关闭此页面，前往初始化页面
        uni.redirectTo({
          url: '/pages/init/init'
        });
        return;
      }

      // 判断是否有上一页
      if (getCurrentPages().length > 1) {
        uni.navigateBack();
      } else {
        uni.navigateTo({
          url: '/pages/body/body'
        });
      }
    },
    /**
     * 判断是否走手机号
     */
    ifPhone() {
      // 如果有手机号，就走手机号
      if (!this.userStore.state.selfInfo.email && !this.userStore.state.selfInfo.phone && this.requestParam.username.indexOf('@') == -1) {
        return true;
      }
      if (this.userStore.state.selfInfo.email && !this.userStore.state.selfInfo.phone) {
        return true;
      }
      return false;
    },
    /**
     * 判断是否走邮箱
     */
    ifEmail() {
      // 如果有邮箱，就走邮箱
      if (!this.userStore.state.selfInfo.email && !this.userStore.state.selfInfo.phone && this.requestParam.username.indexOf('@') != -1) {
        return true;
      }
      if (!this.userStore.state.selfInfo.email && this.userStore.state.selfInfo.phone) {
        return true;
      }
      return false;
    },
    /**
     * 发送验证码
     */
    sendVarCode() {
      if (!this.userStore.state.selfInfo.email && !this.userStore.state.selfInfo.phone && !this.requestParam.username) {
        this.$refs.ktButton.error('请输入手机号或者邮箱');
        return;
      }
      console.log(this.ifPhone(), this.ifEmail());
      if (this.ifPhone()) {
        this.sendPhoneVarCode();
      } else if (this.ifEmail()) {
        this.sendEmailVarCode();
      }

    },
    /**
     * 发送手机验证码
     */
    sendPhoneVarCode() {
      if (!this.requestParam.username) {
        this.$refs.ktButton.error('请输入手机号');
        return;
      }
      this.isSendingVarCode = true;
      this.$request({
        url: "/api-varcode/varCode/send",
        method: "post",
        data: {
          typeCode: "sms",
          sceneCode: 'bind',
          to: this.requestParam.phoneAreaCode + this.requestParam.username,
        },
        stateSuccess: (json) => {
          this.$refs.ktButton.success(json.msg);
          // 存储发送验证码的时间
          uni.setStorageSync('lastSendVarCodeTimeOfBind', new Date().getTime());
          this.isSendingVarCode = false;
          this.initVarCodeTime();
          this.intervalVarCodeTime();
        },
        stateFail: (json) => {
          if (json.errMsg) {
            this.$refs.ktButton.error(json.errMsg);
          }
          setTimeout(() => {
            this.isSendingVarCode = false;
          }, 3000);
        }
      });
    },
    /**
     * 发送邮箱验证码
     */
    sendEmailVarCode() {
      if (!this.requestParam.username) {
        this.$refs.ktButton.error('请输入邮箱');
        return;
      }
      this.isSendingVarCode = true;
      this.$request({
        url: "/api-varcode/varCode/send",
        method: "post",
        data: {
          typeCode: "email",
          sceneCode: 'bind',
          to: this.requestParam.username,
        },
        stateSuccess: (json) => {
          this.$refs.ktButton.success(json.msg);
          // 存储发送验证码的时间
          uni.setStorageSync('lastSendVarCodeTimeOfBind', new Date().getTime());
          this.isSendingVarCode = false;
          this.initVarCodeTime();
          this.intervalVarCodeTime();
        },
        stateFail: (json) => {
          if (json.errMsg) {
            this.$refs.ktButton.error(json.errMsg);
          }
          setTimeout(() => {
            this.isSendingVarCode = false;
          }, 3000);
        }
      });
    },
    submit(){
      if (!this.userStore.state.selfInfo.email && !this.userStore.state.selfInfo.phone && !this.requestParam.username) {
        this.$refs.ktButton.error('请输入手机号或者邮箱');
        return;
      }
      if (this.ifPhone()) {
        this.initBindBySmsAndVarCode();
      } else if (this.ifEmail()) {
        this.initBindByEmailAndVarCode();
      }
    },
    async initBindBySmsAndVarCode() {

      this.isLogining = true;
      let phone = "";
      let varCode = "";
      let encrypt = new JSEncrypt();
      await rsa.getPublicKey().then((res) => {
        encrypt.setPublicKey(res);
        phone = res + "&&" + encrypt.encrypt(this.requestParam.phoneAreaCode + this.requestParam.username);
      });
      await rsa.getPublicKey().then((res) => {
        encrypt.setPublicKey(res);
        varCode = res + "&&" + encrypt.encrypt(this.requestParam.varCode);
      });

      this.$refs.ktButton.loading();
      this.$request({
        url: "/system-user-web/user/securityInitBindBySmsAndVarCode",
        method: "post",
        data: {
          phone: phone,
          varCode: varCode
        },
        stateSuccess: (json) => {
          this.$refs.ktButton.success(json.msg);
          this.userStore.setSelfInfo(json.data);
          this.loginSuccess(json);
          this.isLogining = false;
        },
        stateFail: (json) => {
          if (json.errMsg) {
            this.$refs.ktButton.error(json.errMsg);
          }
          this.isLogining = false;
        }
      });
    },
    async initBindByEmailAndVarCode() {

      this.isLogining = true;
      let email = "";
      let varCode = "";
      let encrypt = new JSEncrypt();
      await rsa.getPublicKey().then((res) => {
        encrypt.setPublicKey(res);
        email = res + "&&" + encrypt.encrypt(this.requestParam.username);
      });
      await rsa.getPublicKey().then((res) => {
        encrypt.setPublicKey(res);
        varCode = res + "&&" + encrypt.encrypt(this.requestParam.varCode);
      });

      this.$refs.ktButton.loading();
      this.$request({
        url: "/system-user-web/user/securityInitBindByEmailAndVarCode",
        method: "post",
        data: {
          email: email,
          varCode: varCode
        },
        stateSuccess: (json) => {
          this.$refs.ktButton.success(json.msg);
          this.userStore.setSelfInfo(json.data);
          this.loginSuccess(json);
          this.isLogining = false;
        },
        stateFail: (json) => {
          if (json.errMsg) {
            this.$refs.ktButton.error(json.errMsg);
          }
          this.isLogining = false;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>

.content {
}

.box {
  padding: 30px;
  box-sizing: border-box;
}

.box-2 {
  height: 100%;
  color: #333333;
  border-radius: 60rpx 60rpx 0 0;
  padding: 30rpx;
  box-sizing: border-box;
  text-align: center;
  font-size: 30rpx;
}

.input {
  border-radius: 60rpx;
  background-color: #f0f0f0;
  padding: 20rpx;
  font-size: 30rpx;
  text-align: left;
}

.send-btn:active {
  transform: scale(0.9);
}

.bottom-box {
  position: relative;
  padding: 10px;
  font-size: 28rpx;
  text-align: center;

  .bottom-image {
    position: absolute;
    z-index: -1;
    width: 750rpx;
    height: 750rpx;
    left: 0;
    bottom: 0;
    opacity: .3;
  }
}

.skip-button {
  position: relative;
  display: inline-block;
  font-size: 28rpx;
  color: #666666;
}

.skip-button:active {
  transform: scale(0.9);
}

</style>
