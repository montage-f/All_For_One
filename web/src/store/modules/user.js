/**
 * Created by MonTage_fz on 2020/1/14
 */
import * as userApi from '@api/user'
import { storage } from '@plugin'

const state = {
    userInfo: {},
    userListInfo: {},
}
const mutations = {
    setUserInfo(state, params) {
        state.userInfo = params
        storage.set('userInfo', params)
    },
    setList(state, params) {
        state.userListInfo = params
    },
    setAddUser() {
    
    },
}
const actions = {
    async login({ commit }, params) {
        const { msgCode, message, data } = await userApi.login(params)
        if (msgCode === 200) {
            commit('setUserInfo', data)
        }
        return {
            msgCode,
            message,
        }
    },
    async getList({ commit }, params) {
        const { msgCode, message, data } = await userApi.getList(params)
        if (msgCode === 200) {
            commit('setList', data)
        }
        return {
            msgCode,
            message,
        }
    },
    async addUser({ commit }, params) {
        commit('setAddUser')
        return await userApi.addUser(params)
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
