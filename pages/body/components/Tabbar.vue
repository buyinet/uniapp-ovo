<template>
  <view class="box">
    <view style="height: 20rpx"></view>
    <u-grid col="4">
      <u-grid-item
      @click="select('index')"
      >
        <view>
          <view>
            <image
                v-if="tabbarCodeOfSelected != 'index'"
                :src="$kt.file.byPath('icon/index.svg')" class="icon"></image>
            <image
                v-else
                :src="$kt.file.byPath('icon/indexFill.svg')" class="icon"></image>
          </view>
          <view>首页</view>
        </view>
      </u-grid-item>
      <u-grid-item
      @click="select('community')"
      >
        <view>
          <view>
            <image
                v-if="tabbarCodeOfSelected != 'community'"
                :src="$kt.file.byPath('icon/community.svg')" class="icon"></image>
            <image
                v-else
                :src="$kt.file.byPath('icon/communityFill.svg')" class="icon"></image>
          </view>
          <view>社区</view>
        </view>
      </u-grid-item>
      <u-grid-item
      @click="select('message')"
      >
        <view>
          <view>
            <image
                v-if="tabbarCodeOfSelected != 'message'"
                :src="$kt.file.byPath('icon/message.svg')" class="icon"></image>
            <image
                v-else
                :src="$kt.file.byPath('icon/messageFill.svg')" class="icon"></image>
          </view>
          <view>消息</view>
        </view>
      </u-grid-item>
      <u-grid-item
      @click="select('mine')">
        <view>
          <view>
            <image
                v-if="tabbarCodeOfSelected != 'mine'"
                :src="$kt.file.byPath('icon/mine.svg')" class="icon"></image>
            <image
                v-else
                :src="$kt.file.byPath('icon/mineFill.svg')" class="icon"></image>
          </view>
          <view>我的</view>
        </view>
      </u-grid-item>
    </u-grid>
    <view style="height: 20rpx"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabbarCodeOfSelected: 'index',
    }
  },
  methods: {
    select(code){
      this.tabbarCodeOfSelected = code;
    }
  }
}
</script>

<style scoped lang="scss">
.box{
  text-align: center;
  font-size: 30rpx;
  box-sizing: border-box;
  background-color: #FFFFFF;
  color: #666666;
}

.icon{
  width: 50rpx;
  height: 50rpx;
}

</style>