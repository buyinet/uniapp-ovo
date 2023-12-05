/**
 * 清理前缀是"requestNumber:"的缓存
 */
let clearRequestNumberCache = () => {
    setTimeout(()=>{
        let keys = uni.getStorageInfoSync().keys;
        for (let i = 0; i < keys.length; i++) {
            if (keys[i].indexOf("requestNumber:") == 0) {
                uni.removeStorageSync(keys[i]);
            }
        }
    },10);
}

export default {
    clearRequestNumberCache
}