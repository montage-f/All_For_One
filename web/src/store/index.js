import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import role from './modules/role'
import power from './modules/power'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        role,
        power,
    },
})
