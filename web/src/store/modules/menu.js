import * as userApi from '@api/user'

/**
 * Created by montage_fz on 2020-01-30
 */
const state = {
    list: null,
}
const mutations = {
    setList(state, params) {
        state.list = params
    },
}
const actions = {
    async getList({ commit }) {
        // 拿到后端返回的菜单列表
        const { msgCode, data } = await userApi.menu()
        if (msgCode === 200) {
            commit('setList', data)
        }
    },
}
const getters = {}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
