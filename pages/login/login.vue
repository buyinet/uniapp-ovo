<template>
  <view class="content">
    <scroll-view scroll-y :style="'height: 85vh;width: 100vw;'">
      <div class="box">
        <view :style="'height:'+statusBarHeight+'px'"></view>
        <kt-nav-bar background-color="rgba(255,255,255,0)"></kt-nav-bar>
        <view
        style="position: relative;"
        >
          <text
              style="font-size: 70rpx;font-weight: bold"
          >登录
          </text>
          <view style="text-align: center;position: relative;height: 300rpx">
            <image
                class="login-img"
                :src="$kt.file.byPath('image/login.png')"></image>
          </view>
        <view style="height: 20rpx"></view>
        <text
              class="to-register"
              @click="$kt.util.reTo('/pages/login/register')"
          >前往注册</text>
        </view>

        <view style="height: 20rpx"></view>

        <view class="input" v-if="requestParam.username.indexOf('@') == -1">
          <view style="height: 10rpx;"></view>
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
          <view style="height: 10rpx;"></view>
        </view>

        <view class="input" v-else>
		<view style="height: 10rpx;"></view>
          <u-row>
            <u-col :span="1">
              <u-icon name="email" :size="'40rpx'" color="#333333"></u-icon>
            </u-col>
            <u-col :span="11">
              <!-- 正在发送验证码时，不可修改 -->
              <input
                  :disabled="isSendingVarCode"
                  :placeholder="'手机号 / 邮箱'"
                  v-model="requestParam.username"
              ></input>
            </u-col>
          </u-row>
        <view style="height: 10rpx;"></view>
		</view>


        <view style="height: 40rpx"></view>
        <view
            v-if="requestParam.loginTypeCode == 'password'"
            class="input">
        <view style="height: 10rpx;"></view>
        
		  <u-row>
            <u-col :span="1">
              <u-icon name="lock" :size="'40rpx'" color="#333333"></u-icon>
            </u-col>
            <u-col :span="10">
              <input
                  style="border: none;background-color: rgba(0,0,0,0)"
                  :placeholder="'密码'"
                  :type="passwordIsVisible ? null : 'password'"
                  v-model="requestParam.password"
              ></input>
            </u-col>
            <u-col :span="2">
              <div
                  @click="passwordIsVisible = !passwordIsVisible"
              >
                <u-icon name="eye"
                        v-if="!passwordIsVisible"
                        :size="'40rpx'" color="#333333"></u-icon>
                <u-icon name="eye-off"
                        v-else
                        :size="'40rpx'" color="#333333"></u-icon>
              </div>
            </u-col>
          </u-row>
		  <view style="height: 10rpx;"></view>
		  
        </view>

        <view
            v-if="requestParam.loginTypeCode == 'varCode'"
            class="input">
			<view style="height: 10rpx;"></view>
			
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
                  v-model="requestParam.varCode"
              ></input>
            </u-col>
            <u-col :span="2">
              <view style="text-align: center">
              <view
                  v-if="sendVarCodeTime>0"
                  class="send-btn"
                  @click="sendVarCode()"
                  style="font-size: 28rpx;font-weight: bold;"
              >{{sendVarCodeTime}}</view>
              <view
                  v-else-if="!isSendingVarCode"
                  class="send-btn"
                  @click="sendVarCode()"
              style="font-size: 28rpx"
              >发送</view>
              <view
                  v-else
                  class="send-btn"
                  style="font-size: 28rpx"
              >···</view>
              </view>

            </u-col>
          </u-row>
		  <view style="height: 10rpx;"></view>
        </view>


        <view style="height: 20rpx"></view>
        <view style="font-size: 25rpx">
          <text
              v-if="requestParam.loginTypeCode == 'password'"
              @click="changeLoginType('varCode')"
              style="margin-left: 30rpx;color: #8f8f94">验证码登录 (自动注册)
          </text>
          <text
              v-else-if="requestParam.loginTypeCode == 'varCode'"
              @click="changeLoginType('password')"
              style="margin-left: 30rpx;color: #8f8f94">密码登录
          </text>
        </view>
        <view style="height: 60rpx"></view>
        <kt-button
            ref="ktButton"
            @click="login()"
            :is-open-box-shadow="false"
        >登录
        </kt-button>
        <view style="height: 30rpx"></view>
        <view style="text-align: center;"></view>
        <!-- 协议勾选 -->
        <view style="font-size: 25rpx">
          <text style="margin-left: 30rpx;color: #8f8f94">登录即代表您已同意</text>
          <text style="color: #000000;font-weight: bold;">《用户协议》</text>
          <text style="color: #8f8f94">和</text>
          <text style="color: #000000;font-weight: bold;">《隐私政策》</text>
        </view>
      </div>
    </scroll-view>
    <scroll-view scroll-y style="height: 15vh;width: 100vw;">
      <view class="box-2 box-radius">
        <view>其他登录方式</view>
        <view style="height: 20rpx"></view>
        <view>
          <u-grid
              :border="false"
              align="center"
          >
            <!-- #ifndef MP-WEIXIN -->
            <!-- 微信小程序，不存在以下的方式 -->
            <!-- 谷歌登录 -->
            <u-grid-item
            v-if="false"
            >
              <u-icon
                  @click="getLoginCodeOfGoogle()"
                  name="google-circle-fill" :size="'100rpx'" color="#333333"></u-icon>
            </u-grid-item>
            <!-- #endif -->

            <!-- 微信登录 -->
            <u-grid-item
            @click="getLoginCodeOfWechat()"
            >
              <u-icon name="weixin-circle-fill" :size="'100rpx'" color="#333333"></u-icon>
            </u-grid-item>

          </u-grid>
        </view>
      </view>

    </scroll-view>

  </view>
</template>

<script>
import rsa from "@/commonJs/rsa";
import { JSEncrypt } from "@/uni_modules/jsencrypt";
import phoneAndEmail from "@/commonJs/phoneAndEmail";
import userStore from "@/store/modules/user.js";
import user from "@/store/modules/user.js";

export default {
  computed: {
    user() {
      return user
    }
  },
  data() {
    return {
      userStore,
      statusBarHeight:0,
      requestParam: {
        // 账号
        username: '',
        // 密码
        password: '',
        // 手机号码国际区号
        phoneAreaCode: '+86',
        // 登录方式编码
        loginTypeCode: 'password',
        // 验证码
        varCode: '',
        // 微信登录code
        loginCode: '',
      },
      // 密码是否可见
      passwordIsVisible: false,
      // 是否登录中，防止重复点击
      isLogining: false,
      // 剩余时间
      sendVarCodeTime: 0,
      // 正在发送验证码中
      isSendingVarCode: false,
    }
  },
  created() {
    this.initVarCodeTime();
    this.intervalVarCodeTime();
  },
  mounted() {
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
  },
  methods: {
    initVarCodeTime(){
      // 上次发送注册登录验证码的时间
      let lastSendVarCodeTime = uni.getStorageSync('lastSendVarCodeTimeOfLogin');
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
    // 发送验证码
    sendVarCode() {
      this.initVarCodeTime();

      if (this.sendVarCodeTime>0) {
        return;
      }


      if(this.requestParam.username == ''){
        this.$refs.ktButton.error('请输入手机号码或邮箱');
        return;
      }

      // 验证手机号码
      if(this.requestParam.loginTypeCode == 'password'&&this.requestParam.username.indexOf('@') == -1&&phoneAndEmail.checkPhone(this.requestParam.phoneAreaCode,this.requestParam.username) == false) {
        this.$refs.ktButton.error('请输入正确的手机号码');
        return;
      }

      // 验证邮箱
      if(this.requestParam.loginTypeCode == 'password'&&this.requestParam.username.indexOf('@') != -1&&phoneAndEmail.checkEmail(this.requestParam.username) == false) {
        this.$refs.ktButton.error('请输入正确的邮箱');
        return;
      }

      // 如果是验证码登录，且是邮箱
      if(this.requestParam.loginTypeCode == 'varCode'&&this.requestParam.username.indexOf('@') != -1) {
        this.$refs.ktButton.loading();
        this.isSendingVarCode = true;
        this.$request({
          url:"/api-varcode/varCode/send",
          method: "post",
          data: {
            typeCode:"email",
            sceneCode: 'login',
            to: this.requestParam.username,
          },
          stateSuccess: (json) => {
            this.$refs.ktButton.success(json.msg);
            // 存储发送注册登录验证码的时间
            uni.setStorageSync('lastSendVarCodeTimeOfLogin', new Date().getTime());
            this.isSendingVarCode = false;
            this.initVarCodeTime();
            this.intervalVarCodeTime();
          },
          stateFail: (json) => {
            if(json.errMsg){
              this.$refs.ktButton.error(json.errMsg);
            }
            setTimeout(()=>{
              this.isSendingVarCode = false;
            },3000);
          }
        });
        return;
      }

      // 如果验证码登录，且是手机号码
      if(this.requestParam.loginTypeCode == 'varCode'&&this.requestParam.username.indexOf('@') == -1) {
        this.$refs.ktButton.loading();
        this.isSendingVarCode = true;
        this.$request({
          url:"/api-varcode/varCode/send",
          method: "post",
          data: {
            typeCode:"sms",
            sceneCode: 'login',
            to: this.requestParam.phoneAreaCode+this.requestParam.username,
          },
          stateSuccess: (json) => {
            this.$refs.ktButton.success(json.msg);
            // 存储发送注册登录验证码的时间
            uni.setStorageSync('lastSendVarCodeTimeOfLogin', new Date().getTime());
            this.isSendingVarCode = false;
            this.initVarCodeTime();
            this.intervalVarCodeTime();
          },
          stateFail: (json) => {
            if(json.errMsg){
              this.$refs.ktButton.error(json.errMsg);
            }
            setTimeout(()=>{
              this.isSendingVarCode = false;
            },3000);
          }
        });
        return;
      }


    },
    isIos() {
      return uni.getSystemInfoSync().platform == 'ios';
    },
    // 切换成验证码登录
    changeLoginType(code) {
      this.requestParam.loginTypeCode = code;
    },
    tipPhone() {
      uni.showToast({
        title: '目前仅支持中国大陆手机号码',
        icon: 'none',
        duration: 2000
      })
    },
    login(){

      if(this.requestParam.username == ''){
        this.$refs.ktButton.error('请输入手机号码或邮箱');
        return;
      }

      // 验证手机号码
      if(this.requestParam.loginTypeCode == 'password'&&this.requestParam.username.indexOf('@') == -1&&phoneAndEmail.checkPhone(this.requestParam.phoneAreaCode,this.requestParam.username) == false) {
        this.$refs.ktButton.error('请输入正确的手机号码');
        return;
      }

      // 验证邮箱
      if(this.requestParam.loginTypeCode == 'password'&&this.requestParam.username.indexOf('@') != -1&&phoneAndEmail.checkEmail(this.requestParam.username) == false) {
        this.$refs.ktButton.error('请输入正确的邮箱');
        return;
      }

      if(this.requestParam.loginTypeCode == 'password'&&this.requestParam.password == ''){
        this.$refs.ktButton.error('请输入密码');
        return;
      }
      if(this.requestParam.loginTypeCode == 'varCode'&&this.requestParam.varCode == ''){
        this.$refs.ktButton.error('请输入验证码');
        return;
      }

      if(this.requestParam.loginTypeCode == 'password'&&this.requestParam.username.indexOf('@') == -1) {
        this.loginByPhoneAndPassword();
        return;
      }
      if(this.requestParam.loginTypeCode == 'password'&&this.requestParam.username.indexOf('@') != -1) {
        this.loginByEmailAndPassword();
        return;
      }
      if(this.requestParam.loginTypeCode == 'varCode'&&this.requestParam.username.indexOf('@') != -1) {
        this.loginByEmailAndVarCode();
        return;
      }
      if(this.requestParam.loginTypeCode == 'varCode'&&this.requestParam.username.indexOf('@') == -1) {
        this.loginByPhoneAndVarCode();
        return;
      }

    },
    async loginByPhoneAndPassword(){
      this.isLogining = true;
      let phone = "";
      let password = "";
      let encrypt = new JSEncrypt();
      await rsa.getPublicKey().then((res) => {
        encrypt.setPublicKey(res);
        phone = res+"&&"+encrypt.encrypt(this.requestParam.phoneAreaCode+this.requestParam.username);
        console.log("username",phone);
      });
      await rsa.getPublicKey().then((res) => {
        encrypt.setPublicKey(res);
        password = res+"&&"+encrypt.encrypt(this.requestParam.password);
      });
      console.log("phone",phone);
      console.log("password",password);
      this.$refs.ktButton.loading();
      this.$request({
        url:"/system-user-web/user/securityLoginByPhoneAndPassword",
        method: "post",
        data: {
          phone,
          password
        },
        stateSuccess: (json) => {
          this.$refs.ktButton.success(json.msg);
          this.$kt.request.setToken(json.data.token);
          this.userStore.setSelfInfo(json.data.userInfo);
          this.loginSuccess(json);
        },
        stateFail: (json) => {
          console.log(json);
          this.$refs.ktButton.error(json.errMsg);
          this.isLogining = false;
        }
      });
    },
    /**
     * 邮箱+密码登录
     */
    async loginByEmailAndPassword(){
      this.isLogining = true;
      let email = "";
      let password = "";
      let encrypt = new JSEncrypt();
      await rsa.getPublicKey().then((res) => {
        encrypt.setPublicKey(res);
        email = res+"&&"+encrypt.encrypt(this.requestParam.username);
      });
      await rsa.getPublicKey().then((res) => {
        encrypt.setPublicKey(res);
        password = res+"&&"+encrypt.encrypt(this.requestParam.password);
      });

      this.$refs.ktButton.loading();
      this.$request({
        url:"/system-user-web/user/securityLoginByEmailAndPassword",
        method: "post",
        data: {
          email: email,
          password: password
        },
        stateSuccess: (json) => {
          this.$refs.ktButton.success('登录成功');
          this.$kt.request.setToken(json.data.token);
          this.userStore.setSelfInfo(json.data.userInfo);
          this.loginSuccess(json);
        },
        stateFail: (json) => {
          console.log(json);
          this.$refs.ktButton.error(json.errMsg);
          this.isLogining = false;
        }
      });
    },
    /**
     * 邮箱+验证码登录
     */
    async loginByEmailAndVarCode() {
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
        url: "/system-user-web/user/securityLoginByEmailAndVarCode",
        method: "post",
        data: {
          email: email,
          varCode: varCode
        },
        stateSuccess: (json) => {
          this.$refs.ktButton.success(json.msg);
          this.$kt.request.setToken(json.data.token);
          this.userStore.setSelfInfo(json.data.userInfo);
          this.loginSuccess(json);
          this.isLogining = false;
        },
        stateFail: (json) => {
          if(json.errMsg){
            this.$refs.ktButton.error(json.errMsg);
          }
          this.isLogining = false;
        }
      });
    },
    /**
     * 手机号码+验证码登录
     */
    async loginByPhoneAndVarCode() {
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
        url: "/system-user-web/user/securityLoginBySmsAndVarCode",
        method: "post",
        data: {
          phone: phone,
          varCode: varCode
        },
        stateSuccess: (json) => {
          this.$refs.ktButton.success(json.msg);
          this.$kt.request.setToken(json.data.token);
          this.userStore.setSelfInfo(json.data.userInfo);
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
    /**
     * 登录完成后的跳转
     * @param res
     */
    loginSuccess(res) {
      console.log(res);
      if(res.data.userInfo.isTemporary){
        // 关闭此页面，前往绑定页面
        uni.redirectTo({
          url: '/pages/bind/bind'
        });
        return;
      }

      if (!res.data.userInfo.isInit) {
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
    // 获取微信登录code
    getLoginCodeOfWechat() {
      if (this.isLogining) {
        return;
      }
      this.isLogining = true;
      this.$refs.ktButton.loading();
      uni.login({
        provider: 'weixin',
        success: (res) => {
          this.requestParam.loginCode = res.code;
          this.$request({
            url:"/third-party-web/wechat/loginInMp",
            method: "post",
            data: {
              code: this.requestParam.loginCode
            },
            stateSuccess: (json) => {
              this.$refs.ktButton.success(json.msg)
              this.$kt.request.setToken(json.data.token);
              this.userStore.setSelfInfo(json.data.userInfo);
              this.loginSuccess(json);
            },
            stateFail: (json) => {
              if(json.errMsg){
                this.$refs.ktButton.error(json.errMsg);
              }
              this.isLogining = false;
            }
          });
        }
      });
    },
    // 获取谷歌登录code
    getLoginCodeOfGoogle() {
      if (this.isLogining) {
        return;
      }
      this.isLogining = true;
      this.$refs.ktButton.loading();
      uni.login({
        provider: 'google',
        success: (res) => {
          console.log("google",res);
        },
        fail: (err) => {
          console.log("google err",err);
        }
      });
    },
  }
}
</script>

<style scoped>

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

.to-register{
  position: absolute;
  bottom: 0;
  right: 0;
  color:#666666;
  font-size: 30rpx;
  vertical-align: bottom;
}

.to-register:active{
  transform: scale(0.9);
}

.login-img{
  position: absolute;
  width: 600rpx;
  height: 600rpx;
  right: -150rpx;
  bottom: 30rpx;
}
</style>
