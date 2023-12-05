let store = {
    state: {
        selfInfo: {
            id: null,
            username: null,
            nickname: null,
            fileIdOfAvatar: null,
            phone: null,
            email: null
        }
    },
    setSelfInfo(selfInfo) {
        store.state.selfInfo = selfInfo
        uni.setStorageSync("selfInfo", selfInfo);
    },
    getSelfInfo() {
        return store.state.selfInfo
    }
}

store.state.selfInfo = uni.getStorageSync("selfInfo") || store.state.selfInfo;

export default store;