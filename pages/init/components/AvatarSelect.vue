<template>
  <view class="box-box">
    <button
        open-type="chooseAvatar"
        @chooseavatar="onChooseAvatar"
        class="avatar-box"
    >
      <image
          class="avatar"
          mode="aspectFill"
          :src="selectedAvatarPath?selectedAvatarPath:$kt.file.byPath('icon/mine.svg')">
      </image>
    </button>
    <image
        @click="changeDefaultAvatar()"
        class="change-avatar"
        :src="$kt.file.byPath('icon/changeWhite.svg')">
    </image>
  </view>
</template>

<script>
export default {
  props: {
    // 性别编码
    genderCode: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // 选择的头像path
      selectedAvatarPath: null,
      // 获取所有头像
      defaultAvatarList: [],
      // 男性头像
      defaultAvatarListMale: [],
      // 女性头像
      defaultAvatarListFemale: [],
      // 默认头像的index
      defaultAvatarIndex: 0,
      // 女性头像的index
      defaultAvatarIndexFemale: 0,
      // 男性头像的index
      defaultAvatarIndexMale: 0,
    };
  },
  created() {
    this.getDefaultAvatarAll();
  },
  methods:{
    onChooseAvatar(e) {
      this.selectedAvatarPath = e.detail.avatarUrl;
      this.$emit("change", this.selectedAvatarPath);
    },
    getImageInfo(imgSrc){
      return new Promise((resolve, reject) => {
        uni.getImageInfo({
          src: imgSrc,
          success: (image) => {
            resolve(image);
            console.log('获取图片成功',image)
          },
          fail: (err) => {
            reject(err);
            console.log('获取图片失败',err)
          }
        });
      });
    },
    async updateSelectedAvatarPath(imgSrc){
      await this.getImageInfo(this.$kt.request.getRootAddress() + "/system-user-web/defaultAvatar/visit?path=" + imgSrc).then((res)=>{
        this.selectedAvatarPath = res.path;
        this.$emit("change", this.selectedAvatarPath);
      });
    },
    async getDefaultAvatarAll() {
      this.$request({
        url: "/system-user-web/defaultAvatar/getAll",
        method: "post",
        stateSuccess: async (res) => {
          this.defaultAvatarList = res.data;
          // 如果前缀是male，就是男性头像
          // 如果前缀是female，就是女性头像
          for (var i = 0; i < this.defaultAvatarList.length; i++) {
            if (this.defaultAvatarList[i].startsWith("/male")) {
              this.defaultAvatarListMale.push(this.defaultAvatarList[i]);
            }
            if (this.defaultAvatarList[i].startsWith("/female")) {
              this.defaultAvatarListFemale.push(this.defaultAvatarList[i]);
            }
          }
          // 将默认头像随机排序
          this.defaultAvatarList.sort(function () {
            return 0.5 - Math.random()
          });
          this.defaultAvatarListMale.sort(function () {
            return 0.5 - Math.random()
          });
          this.defaultAvatarListFemale.sort(function () {
            return 0.5 - Math.random()
          });
          if (this.defaultAvatarList && this.defaultAvatarList.length > 0) {
            this.updateSelectedAvatarPath(this.defaultAvatarList[0]);
          }
        }
      })
    },
    // 切换默认头像
    changeDefaultAvatar() {
      if (this.genderCode == "male") {
        this.defaultAvatarIndexMale++;
        if (this.defaultAvatarIndexMale >= this.defaultAvatarListMale.length) {
          this.defaultAvatarIndexMale = 0;
        }
        this.updateSelectedAvatarPath(this.defaultAvatarListMale[this.defaultAvatarIndexMale]);
        return;
      }

      if (this.genderCode == "female") {
        this.defaultAvatarIndexFemale++;
        if (this.defaultAvatarIndexFemale >= this.defaultAvatarListFemale.length) {
          this.defaultAvatarIndexFemale = 0;
        }
        this.updateSelectedAvatarPath(this.defaultAvatarListFemale[this.defaultAvatarIndexFemale]);
        return;
      }

      this.defaultAvatarIndex++;
      if (this.defaultAvatarIndex >= this.defaultAvatarList.length) {
        this.defaultAvatarIndex = 0;
      }
      this.updateSelectedAvatarPath(this.defaultAvatarList[this.defaultAvatarIndex]);
    },

  },
  watch: {
    genderCode: {
      handler() {
        if (this.genderCode == "male") {
          if (this.defaultAvatarIndexMale >= this.defaultAvatarListMale.length) {
            this.defaultAvatarIndexMale = 0;
          }
          this.updateSelectedAvatarPath(this.defaultAvatarListMale[this.defaultAvatarIndexMale]);
          return;
        }

        if (this.genderCode == "female") {
          if (this.defaultAvatarIndexFemale >= this.defaultAvatarListFemale.length) {
            this.defaultAvatarIndexFemale = 0;
          }
          this.updateSelectedAvatarPath(this.defaultAvatarListFemale[this.defaultAvatarIndexFemale]);
          return;
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.box-box {
  position: relative;
  padding: 0 60rpx 0 60rpx;

  .change-avatar {
    position: absolute;
    left: 340rpx;
    bottom: 0rpx;
    width: 40rpx;
    height: 40rpx;
    background-color: rgba(0, 0, 0, 0.8);
    opacity: .7;
    padding: 5rpx;
    border-radius: 55%;
  }

  .change-avatar:active {
    transform: scale(0.9);
  }
}
.avatar-box {
  border-radius: 50%;
  background-color: #f0f0f0;
  width: 150rpx;
  height: 150rpx;
  position: relative;
  border: 5rpx solid #FFFFFF;


  .avatar {
    position: absolute;
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
    top: 0;
    left: 0;
  }
}

.avatar-box:active {
  transform: scale(0.9);
}
</style>
