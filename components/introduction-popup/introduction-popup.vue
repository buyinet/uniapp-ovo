<template>
  <u-popup :show="show" round="60rpx" mode="bottom" @close="close" @open="open">
    <view>
      <view style="height: 30rpx"></view>
      <view style="text-align: center;font-size: 30rpx;font-weight: bold">自我介绍</view>
      <view style="height: 10rpx"></view>
      <view class="box">
        <textarea
            v-model="introduction"
            :auto-height="true"
            :adjust-position="false"
            placeholder="请输入自我介绍"
            maxlength="300"
            class="t-box"></textarea>
        <view style="font-size: 26rpx;text-align: right;color:#666666;">{{introduction.length}}/300</view>
      </view>
      <view style="height: 20rpx"></view>
      <view style="height: 20rpx"></view>
      <view
          class="btn-box"
          :style="introduction?'':'opacity: .5'"
      >
        <kt-button
            ref="ktButton"
            v-if="introduction"
            @click="submit()"
        >确定</kt-button>
        <kt-button
            v-else
        >未输入</kt-button>
      </view>
      <view style="height: 50rpx"></view>
      <!-- 键盘占位 -->
      <kt-keyboard-seize></kt-keyboard-seize>
    </view>
  </u-popup>
</template>

<script>
export default {
  data() {
    return {
      introduction: "",
      show: false,
    };
  },
  methods: {
    open(introduction) {
      this.introduction = introduction;
      this.show = true;
    },
    close() {
      this.show = false;
    },
    select(introduction) {
      this.introduction = introduction;
      this.$emit("change", this.introduction);
    },
    submit() {
      this.$emit("change", this.introduction);
      this.close();
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  padding: 20rpx;
  width: 100vw;
  box-sizing: border-box;
  text-align: center;

  .t-box{
    width: 100%;
    color: #666666;
    font-size: 30rpx;
    text-align: left;
  }

  .t-box-sel{
    background-color: #333333;
    color: #ffffff;
  }

}

.btn-box{
  padding: 0 80rpx 0 80rpx;
  box-sizing: border-box;
}
</style>
