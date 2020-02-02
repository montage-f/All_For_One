/**
 * Created by montage_fz on 2020-01-27
 */

import * as powerApi from '@api/power'
import { formatTime } from '@plugin'

const state = {
    powerListInfo: {},
}
const mutations = {
    setList(state, params) {
        state.powerListInfo = params
    },
}
const actions = {
    async add({ dispatch }, params) {
        const { msgCode, message } = await powerApi.add(params)
        if (msgCode === 200) {
            dispatch('getList')
        }
        return { msgCode, message }
    },
    async getList({ commit }, params) {
        const { msgCode, message, data } = await powerApi.list(params)
        if (msgCode === 200) {
            commit('setList', data)
        }
        return { msgCode, message }
    },
    async update({ dispatch }, params) {
        const { msgCode, message } = await powerApi.update(params)
        if (msgCode === 200) {
            dispatch('getList')
        }
        return { msgCode, message }
    },
    async remove({ dispatch }, params) {
        const { msgCode, message } = await powerApi.remove(params)
        if (msgCode === 200) {
            dispatch('getList')
        }
        return { msgCode, message }
    },
}
// 用于递归循环格式化时间
const formatList = (list = []) => {
    list.forEach((item) => {
        if (item.children) formatList(item.children)
        item.createTime = formatTime(item.createTime)
        item.updateTime = formatTime(item.updateTime)
    })
    return list
}
const getters = {
    list(state) {
        const list = state.powerListInfo.list
        if (list) {
            return formatList(list)
        }
    },
    count(state) {
        return state.powerListInfo.count
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
