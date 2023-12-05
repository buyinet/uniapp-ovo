import $kt from "@/uni_modules/uniapp-kantboot/index.js";
import i18nStore from "@/store/modules/i18n";

/**
 * 添加字典国际化映射语言列表
 */
let addDictI18nMapOfAppFrontLanguageList = (languageCode) => {
    // 获取字典国际化list
    let list = getDictI18nMapOfAppFrontLanguageList();
    // 获取所有时间超过1天的数据
    let list2 = [];
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        if (item.gmtPush + 86400000 < new Date().getTime()) {
            list2.push(item);
        }
    }
    list = list2;
    let json = {
        "languageCode":languageCode,
        "gmtPush":new Date().getTime()
    };
    list.push(json);
    uni.setStorageSync("i18n:appFront:languageList", JSON.stringify(list));
    uni.setStorageSync("i18n:appFront:"+languageCode+":gmtPush", new Date().getTime());
}

/**
 * 获取已经缓存的字典国际化语言列表
 */
let getDictI18nMapOfAppFrontLanguageList = () => {
    let jsonStr = uni.getStorageSync("i18n:appFront:languageList");
    if (jsonStr) {
        return JSON.parse(jsonStr);
    }
    return [];
}

/**
 * 获取字典国际化映射的push时间
 */
let getDictI18nMapOfAppFrontGmtPush = (languageCode) => {
    let gmtPush = uni.getStorageSync("i18n:appFront:"+languageCode+":gmtPush");
    if (gmtPush) {
        return gmtPush;
    }
    return 0;
}

/**
 * 获取前端应用的字典国际化映射
 */
let getDictI18nMapOfAppFront = () => {
    // 如果获取时间没有超过30分钟，则不重新获取
    let gmtPush = getDictI18nMapOfAppFrontGmtPush($kt.request.getLanguageCode());
    if (gmtPush - (-1800000) > new Date().getTime()) {
        i18nStore.commit("setAppFront", JSON.parse(uni.getStorageSync("i18n:appFront:"+$kt.request.getLanguageCode())));
        setTimeout(()=>{
            let appFront=i18nStore.state.appFront
            appFront.account="账号123";
            i18nStore.commit("setAppFront",appFront);
        },3000);
        return;
    }

    // 获取字典国际化映射
    $kt.request.request({
        url: "/system-dict-web/dictI18n/getDictI18nMapSelf",
        method: "POST",
        data:{
            "dictGroupCode":"appFront"
        },
        stateSuccess: (res) => {
            uni.setStorageSync("i18n:appFront:"+$kt.request.getLanguageCode(), JSON.stringify(res));
            addDictI18nMapOfAppFrontLanguageList($kt.request.getLanguageCode());
            i18nStore.commit("setAppFront", JSON.parse(uni.getStorageSync("i18n:appFront:"+$kt.request.getLanguageCode())));

        }
    });

}

export default {
    getDictI18nMapOfAppFront
}