import Vue from 'vue'
import Vuex from 'vuex'
import { storage } from '../config'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: storage.get('userInfo') || {},
    },
    mutations: {
        setUserInfo(state, params) {
            state.userInfo = params
        },
    },
    actions: {},
})
