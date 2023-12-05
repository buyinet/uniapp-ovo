import $kt from "@/uni_modules/uniapp-kantboot/index.js";

/**
 * 获取公钥
 */
let getPublicKey = () => {
    return new Promise((resolve,reject)=>{
        $kt.request.request({
            url: "/system-user-web/user/getRsaPublicKey",
            method: "post",
            stateSuccess: (res) => {
                resolve(res.data);
            },
            stateFail: (res) => {
                reject(res);
            }
        });
    });
}

export default {
    getPublicKey
}