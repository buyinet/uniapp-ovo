let phoneRegList = [
    {
    "code": "+86",
    "reg": "^1[34578]\\d{9}$",
    }
];

/**
 * 校验手机号码
 */
function checkPhone(code,phone) {
    let reg = new RegExp(phoneRegList.find(item => item.code === code).reg);
    return reg.test(phone);
}

/**
 * 检测邮箱
 */
function checkEmail(email) {
    let reg = new RegExp("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
    return reg.test(email);
}

export default {
    phoneRegList,
    checkPhone,
    checkEmail
}