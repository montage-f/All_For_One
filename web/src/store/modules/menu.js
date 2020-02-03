import * as userApi from '@api/user'
import router, { allRouter } from '@router'

/**
 * Created by montage_fz on 2020-01-30
 */

/**
 *@method recursionRouter
 *@param {Array} asyncRouter 后端返回的菜单
 *@param {Array} allRouter 前端已经定义好的菜单
 *@return {Array} 返回与后端返回匹配的菜单列表
 */
const recursionRouter = (asyncRouter = [], allRouter = []) => {
    const routes = []
    allRouter.forEach((j) => {
        asyncRouter.forEach((k) => {
            if (j.meta.title === k.title) {
                if (k.children && k.children.length) {
                    j.children = recursionRouter(k.children, j.children)
                }
                routes.push(j)
            }
        })
    })
    return routes
}
const state = {
    list: null,
}
const mutations = {
    setList(state, params) {
        const { menu, list } = params
        const mainRouter = allRouter.find((item) => item.meta.title === '首页')
        const children = mainRouter.children
        // 将已有的路由和返回的路由进行过滤, 然后只把返回的路由插入到当前的路由上面
        allRouter[0].children = recursionRouter(menu, children)
        router.addRoutes(allRouter)
        state.list = list
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
