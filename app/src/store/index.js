import Vue from 'vue'
import Vuex from 'vuex'
import { storage, http } from '../config'
import { Toast } from 'vant'

import album from './album'

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
    actions: {
        async getUserInfo({ commit }) {
            const { msgCode, data, message } = await http.get('/api/user/info')
            if (msgCode === 200) {
                commit('setUserInfo', data)
                storage.set('userInfo', data)
            } else {
                Toast.fail(message)
            }
            
        },
    },
    modules: {
        album,
    },
})
