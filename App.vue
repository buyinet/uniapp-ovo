<script>
import indexJs from '@/jsInAppVue/index.js'
import i18nJs from "@/commonJs/i18n";
import userStore from "@/store/modules/user";

export default {
  onLaunch: function () {
    // 清理前缀是"requestNumber:"的缓存
    indexJs.clearRequestNumberCache();

    // 获取系统字典
    i18nJs.getDictI18nMapOfAppFront();


  },
  onShow: function () {
  },
  onHide: function () {
  }
}
</script>

<style>
/*每个页面公共css */
</style>
