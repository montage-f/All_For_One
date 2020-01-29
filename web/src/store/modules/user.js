/**
 * Created by MonTage_fz on 2020/1/14
 */
import * as userApi from '@api/user'
import { storage } from '@plugin'

const state = {
    userInfo: {},
    userListInfo: {},
    menu: [],
}
const mutations = {
    setUserInfo(state, params) {
        state.userInfo = params
        storage.set('userInfo', params)
    },
    setList(state, params) {
        state.userListInfo = params
    },
    setMenu(state, params) {
        state.menu = params
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
    async addUser({ dispatch }, params) {
        const { msgCode, message } = await userApi.addUser(params)
        if (msgCode === 200) {
            dispatch('getList', {
                pageIndex: 1,
                pageSize: 10,
            })
        }
        return {
            msgCode,
            message,
        }
    },
    async updateUser({ dispatch }, params) {
        const { msgCode, message } = await userApi.updateUser(params)
        if (msgCode === 200) {
            dispatch('getList', {
                pageIndex: 1,
                pageSize: 10,
            })
        }
        return {
            msgCode,
            message,
        }
    },
    async deleteUser({ dispatch }, params) {
        const { msgCode, message } = await userApi.deleteUser(params)
        if (msgCode === 200) {
            dispatch('getList', {
                pageIndex: 1,
                pageSize: 10,
            })
        }
        return {
            msgCode,
            message,
        }
    },
    async menu({ commit }) {
        const { msgCode, data } = await userApi.menu()
        console.log(data)
        if (msgCode === 200) {
            commit('setMenu', data)
        }
    },
}
const getters = {
    username(state) {
        return state.userInfo.username || storage.get('userInfo').username
    },
    userImg(state) {
        return state.userInfo.img || storage.get('userInfo').img
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
