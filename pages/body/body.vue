<template>
	<view>
    <view style="height: 100vh;background-color: #000;">
      
    </view>
    <Tabbar ref="tabbar" id="tabbar" class="tabbar"></Tabbar>
	</view>
</template>

<script>
  import Tabbar from "@/pages/body/components/Tabbar.vue";
	export default {
    components: {
      Tabbar
    },
		data() {
			return {
        tabbarHeight: 0,
			}
		},
    mounted() {
      uni.createSelectorQuery().select('#tabbar').boundingClientRect((rect) => {
        this.tabbarHeight = rect.height;
      }).exec();
    },
		methods: {
			
		}
	}
</script>

<style scoped>
.tabbar{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>
