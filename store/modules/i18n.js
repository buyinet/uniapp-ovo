import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        languageCode: null,
        appFront: null,
    },
    mutations: {
        setLanguageCode(state, languageCode) {
            state.languageCode = languageCode
        },
        setAppFront(state, appFront) {
            state.appFront = appFront
        },
    },
    actions: {
        setLanguageCode({commit}, languageCode) {
            commit('setLanguageCode', languageCode)
        },
        setAppFront({commit}, appFront) {
            commit('setAppFront', appFront)
        },
    },
    getters: {
        getLanguageCode(state) {
            return state.languageCode
        },
        getAppFront(state) {
            return state.appFront
        },
    }
})

export default store
