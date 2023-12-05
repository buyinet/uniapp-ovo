import App from './App'
import Vue from 'vue'

// 前往 https://gitee.com/bygo/uniapp-kantboot 下载，并阅读文档
import kt from '@/uni_modules/uniapp-kantboot/index.js';
import uView from '@/uni_modules/uview-ui';


Vue.use(uView)
// 如此配置即可
uni.$u.config.unit = 'rpx'

Vue.prototype.$kt = kt;
Vue.prototype.$request = kt.request.request;

Vue.config.productionTip = false





App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount();
