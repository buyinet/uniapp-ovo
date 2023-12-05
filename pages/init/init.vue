<template>
  <view>
    <view
        id="ktNavBar"
        style="position: relative">
      <kt-status-bar-height></kt-status-bar-height>
    </view>

    <scroll-view
        :style="'height:calc(100vh - '+ktNavBarHeight+'px)'"
    scroll-y
    >
      <kt-nav-bar
          style="position: absolute;top: 0;left: 0;right: 0;z-index: 999;"
          title="初始化个人信息"
          border-radius=" 0 0 30rpx 30rpx"
          :icon="$kt.file.byPath('/icon/info.svg')"
      ></kt-nav-bar>

      <view class="box">
        <view style="height: 350rpx"></view>
        <view class="back-info">
          <image
              v-if="selectedBackShowList.length==0&&!requestParam.genderCode"
              :src="$kt.file.byPath('/image/defaultShow.png')"
          class="back-info-img"
                 mode="aspectFill"
          ></image>

          <image
              v-if="selectedBackShowList.length==0&&requestParam.genderCode=='male'"
              :src="$kt.file.byPath('/image/defaultShowOfMale.png')"
              class="back-info-img"
              mode="aspectFill"
          ></image>

          <image
              v-if="selectedBackShowList.length==0&&requestParam.genderCode=='female'"
              :src="$kt.file.byPath('/image/defaultShowOfFemale.png')"
              class="back-info-img"
              mode="aspectFill"
          ></image>

          <view
              style="position: absolute;
      bottom: -2rpx;
      left: 0;
      width: 100%;
      height: 30rpx;
      background-color: #FFFFFF;
      border-radius: 30rpx 30rpx 0 0;"
          ></view>

        </view>
        <AvatarSelect :gender-code="requestParam.genderCode"
                      @change="selectedAvatarPath = $event"
        ></AvatarSelect>

        <!-- 昵称 -->
        <view style="height: 20px"></view>
        <view class="box-box">
          <view class="input-box">
            <u-row>
              <u-col :span="2">
                <u-icon name="edit-pen" :size="'50rpx'" color="#333333"></u-icon>
              </u-col>
              <u-col :span="8">
                <input
                    type="nickname"
                    @blur="nicknameChange"
                    style="border: none;
                    text-align: center;
                    background-color: rgba(0,0,0,0)"
                    :placeholder="'昵称'"
                    v-model="requestParam.nickname"
                ></input>
              </u-col>
            </u-row>
          </view>
        </view>

        <!-- 生日 -->
        <view style="height: 20px"></view>
        <view class="box-box">
          <view class="input-box"
                @click="selectBirthday()"
          >
            <u-row>
              <u-col :span="2">
                <u-icon name="calendar" :size="'50rpx'" color="#333333"></u-icon>
              </u-col>
              <u-col :span="8">
                <view v-if="requestParam.gmtBirthday" style="text-align: center">
                  {{ $kt.util.dateFormat(requestParam.gmtBirthday, "yyyy-MM-dd") }}
                </view>
                <view v-else style="text-align: center;color:#666666;">选择生日</view>
              </u-col>
            </u-row>
          </view>
        </view>

        <!-- 性别 -->
        <view style="height: 20px"></view>
        <view class="box-box">
          <view>
            <u-row>
              <u-col :span="5.8">
                <view :class="requestParam.genderCode == 'male'?'sex-btn sex-btn-active':'sex-btn'"
                      :style="requestParam.genderCode=='male'?'border: 5rpx solid #3c9cff;':''"
                      @click="changeGenderCode('male')"
                      style="font-weight: bold;color: #3c9cff;"
                >♂
                </view>
              </u-col>
              <u-col :span="0.4"></u-col>
              <u-col :span="5.8">
                <view :class="requestParam.genderCode == 'female'?'sex-btn sex-btn-active':'sex-btn'"
                      :style="requestParam.genderCode=='female'?'border: 5rpx solid #f56c6c;':''"
                      @click="changeGenderCode('female')"
                      style="font-weight: bold;color: #f56c6c;"
                >♀
                </view>
              </u-col>
            </u-row>

          </view>

        </view>

        <!-- sadomasochism -->
        <view style="height: 20px"></view>
        <view class="box-box">
          <view class="input-box"
                @click="$refs.sadomasochismPopup.open(requestParam.sadomasochismCode)"
          >
            <u-row>
              <u-col :span="2">
                <u-icon name="SM" :size="'30rpx'" color="#333333"></u-icon>
              </u-col>
              <u-col :span="8">
                <view style="height: 10rpx"></view>
                <view style="text-align: center;color:#000000;"
                v-if="requestParam.sadomasochismCode"
                >{{sadomasochismMap[requestParam.sadomasochismCode]}}</view>
                <view
                    v-else
                    style="text-align: center;color:#666666;">选择属性</view>
                <view style="height: 10rpx"></view>
              </u-col>
            </u-row>
          </view>
        </view>

        <view style="height: 20px"></view>
        <view class="box-box">
          <view class="input-box"
                @click="$refs.introductionPopup.open(requestParam.introduction)"
          >
            <u-row>
              <u-col :span="2">
                <u-icon name="tags-fill" :size="'50rpx'" color="#333333"></u-icon>
              </u-col>
              <u-col :span="8">
                <view style="height: 10rpx"></view>
                <view
                v-if="requestParam.introduction"
                class="text-ellipsis"
                >
                  {{requestParam.introduction}}
                </view>
                <view
                    v-else
                    style="text-align: center;color:#666666;">自我介绍</view>
                <view style="height: 10rpx"></view>
              </u-col>
            </u-row>
          </view>
        </view>

          <!-- 下一步 -->
          <view style="height: 20px"></view>
          <view class="box-box">
            <kt-button
                class="bottom"
                ref="ktButton"
                @click="initSelfInfo()"
            >下一步
            </kt-button>
          </view>

        </view>

    </scroll-view>
    <u-datetime-picker
        :show="showOfBirthdaySelect"
        v-model="requestParam.gmtBirthday"
        mode="date"
        confirmColor="#000"
        :borderRadius="20"
        :item-height="100"
        :closeOnClickOverlay="true"
        @close="onBirthdayCancel"
        @cancel="onBirthdayCancel"
        @confirm="onBirthdayConfirm"
        :min-date="birthdayRange.min"
        :max-date="birthdayRange.max"
        :default-index="birthdayRange.defaultIndex"
    ></u-datetime-picker>

    <sadomasochism-popup ref="sadomasochismPopup"
    @change="requestParam.sadomasochismCode = $event"
    ></sadomasochism-popup>

    <introduction-popup ref="introductionPopup"
    @change="requestParam.introduction = $event"
    ></introduction-popup>

  </view>
</template>

<script>
import AvatarSelect from "@/pages/init/components/AvatarSelect.vue";
import common from "@/commonJs/common";

export default {
  // 导入组件
  components: {
    AvatarSelect
  },
  data() {
    return {
      sadomasochismMap: common.sadomasochismMap,
      statusBarHeight: 0,
      // 状态栏高度
      filePathOfAvatar: '',
      requestParam: {
        fileIdOfAvatar: '',
        nickname: '',
        gmtBirthday: '',
        genderCode: '',
        sadomasochismCode: '',
        introduction: ''
      },
      showOfBirthdaySelect: false,
      // 生日区间
      birthdayRange: {
        min: new Date(1970, 0, 1).getTime(),
        max: new Date().getTime(),
        defaultIndex: []
      },
      // 选择的头像path
      selectedAvatarPath: null,
      // 选择的背景展示数组
      selectedBackShowList: [],
      // 获取ktNavBar组件的高度
      ktNavBarHeight: 0
    }
  },
  mounted() {
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
    // 设置生日区间的最大值必须满18岁，按年月日计算
    this.birthdayRange.max = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()).getTime();
    // 默认时间为this.birthdayRange.max
    this.birthdayRange.defaultIndex = [new Date().getFullYear() - 18 - 1900, new Date().getMonth(), new Date().getDate() - 1];
    // 获取ktNavBar组件的高度
    uni.createSelectorQuery().select('#ktNavBar').boundingClientRect((rect) => {
      this.ktNavBarHeight = rect.height;
    }).exec();
  },
  methods: {
    changeGenderCode(genderCode) {
      this.requestParam.genderCode = genderCode;
    },
    nicknameChange(e) {
      console.log(e);
      this.requestParam.nickname = e.detail.value;
    },
    getImageInfo(imgSrc) {
      return new Promise((resolve, reject) => {
        uni.getImageInfo({
          src: imgSrc,
          success: (image) => {
            resolve(image);
            console.log('获取图片成功', image)
          },
          fail: (err) => {
            reject(err);
            console.log('获取图片失败', err)
          }
        });
      });
    },

    selectBirthday() {
      this.showOfBirthdaySelect = true;
    },
    async initSelfInfo() {
      if (!this.selectedAvatarPath) {
        this.$refs.ktButton.error("请选择头像");
        return;
      }

      if (!this.requestParam.nickname) {
        this.$refs.ktButton.error("请输入昵称");
        return;
      }

      if (!this.requestParam.gmtBirthday) {
        this.$refs.ktButton.error("请选择生日");
        return;
      }

      if (!this.requestParam.genderCode) {
        this.$refs.ktButton.error("请选择性别");
        return;
      }

      this.$refs.ktButton.loading();
      console.log("上传图片", this.selectedAvatarPath);
      await new Promise((resolve, reject) => {
        this.$kt.request.uploadFile({
          filePath: this.selectedAvatarPath,
          name: "file",
          compress: true,
          formData: {
            "groupCode": "avatar"
          },
          stateSuccess: (res) => {
            this.requestParam.fileIdOfAvatar = res.data.id;
            this.$kt.request.request({
              url: "/system-user-web/user/initSelfInfo",
              method: "post",
              data: this.requestParam,
              stateSuccess: (res1) => {
                this.$refs.ktButton.success('提交成功');
              }
            });
            resolve(res);
          }
        });
      });

    },
    onBirthdayConfirm(e) {
      this.requestParam.gmtBirthday = e.value;
      this.showOfBirthdaySelect = false;
    },
    onBirthdayCancel(e) {
      this.showOfBirthdaySelect = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding: 60rpx;
  box-sizing: border-box;
}

.box-box {
  padding: 0 60rpx 0 60rpx;
  box-sizing: border-box;
}


.input-box {
  border-radius: 60rpx;
  background-color: #f0f0f0;
  padding: 20rpx;
  font-size: 30rpx;
  text-align: left;
}

.sex-btn {
  border: none;
  background-color: #f0f0f0;
  border-radius: 500rpx;
  border: 5rpx solid #f0f0f0;
  font-weight: bold;
  text-align: center;
  padding: 20rpx;
  font-size: 40rpx;
}

.sex-btn-active {
  background-color: #FFFFFF;
  border: 5rpx solid #333333;
  box-sizing: border-box;
  color: #fff;
}

.box-2{
  padding: 10rpx 20rpx 20rpx 20rpx;
  box-sizing: border-box;
  font-size: 28rpx;
  color: #666666;
  // 文字间距
  letter-spacing: 2rpx;
}

.text-ellipsis{
  // 文字超出显示省略号
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  // 文字间距
  letter-spacing: 2rpx;
}


.back-info{
  position: absolute;
  top: 0;
  left:0;
  width: 100%;
  height: 525rpx;
  z-index: -1;

  .back-info-img{
    width: 100%;
    height: 100%;
  }
}


</style>
