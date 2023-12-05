<template>
  <u-popup :show="show" round="60rpx" mode="bottom" @close="close" @open="open">
    <view>
      <view style="height: 30rpx"></view>
      <view style="text-align: center;font-size: 30rpx;font-weight: bold">Sadomasochism属性</view>
      <view style="height: 30rpx"></view>
      <view class="box">
        <view v-for="(item, index) in sadomasochismList"
            :class="codeOfSelect==item.code?'t-box t-box-sel':'t-box'"
        @click="select(item.code)"
        >
          {{ item.name }}
        </view>
      </view>
      <view style="height: 20rpx"></view>
      <view
          class="btn-box"
      :style="codeOfSelect?'':'opacity: .5'"
      >
        <kt-button
        ref="ktButton"
        @click="submit()"
        v-if="codeOfSelect"
        >选择</kt-button>
        <kt-button
            v-else
        >未选择</kt-button>
      </view>
      <view style="height: 50rpx"></view>
    </view>
  </u-popup>
</template>

<script>
import common from "@/commonJs/common";
export default {
  data() {
    return {
      codeOfSelect: "",
      sadomasochismList: common.sadomasochismList,
      show: false
    };
  },
  methods: {
    open(code) {
      this.codeOfSelect = code;
      this.show = true;
    },
    close() {
      this.show = false;
    },
    select(code) {
      this.codeOfSelect = code;
    },
    submit() {
      this.$emit("change", this.codeOfSelect);
      this.close();
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  padding: 20rpx;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  .t-box{
    display: inline-block;
    margin: 10rpx;
    font-size: 26rpx;
    padding: 20rpx;
    background-color: #f0f0f0;
    border-radius: 30rpx;
    color: #666666;
  }

  .t-box-sel{
    background-color: #333333;
    color: #ffffff;
  }

  .t-box:active{
    transform: scale(0.9);
  }
}

.btn-box{
  padding: 0 80rpx 0 80rpx;
  box-sizing: border-box;
}
</style>
