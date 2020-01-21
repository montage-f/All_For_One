/**
 * Created by montage_fz on 2020-01-21
 */
import * as roleApi from '@api/role'
import { formatTime } from '@plugin'

const state = {
    roleListInfo: {},
}
const mutations = {
    setList(state, params) {
        state.roleListInfo = params
    },
}
const actions = {
    async add({ dispatch }, params) {
        const { msgCode, message } = await roleApi.addRole(params)
        if (msgCode === 200) {
            dispatch('getList')
        }
        return { msgCode, message }
    },
    async getList({ commit }, params) {
        const { msgCode, message, data } = await roleApi.list(params)
        if (msgCode === 200) {
            commit('setList', data)
        }
        return { msgCode, message }
    },
    async update({ dispatch }, params) {
        const { msgCode, message } = await roleApi.update(params)
        if (msgCode === 200) {
            dispatch('getList')
        }
        return { msgCode, message }
    },
    async remove({ dispatch }, params) {
        const { msgCode, message } = await roleApi.remove(params)
        if (msgCode === 200) {
            dispatch('getList')
        }
        return { msgCode, message }
    },
}
const getters = {
    list(state) {
        const list = state.roleListInfo.list
        if (list) {
            return list.map(item => ({
                ...item,
                createTime: formatTime(item.createTime),
                updateTime: formatTime(item.updateTime),
            }))
        }
    },
    count(state) {
        return state.roleListInfo.count
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
