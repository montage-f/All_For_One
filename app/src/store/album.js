/**
 * Created by MonTage_fz on 2019/12/30
 */
import { http } from '../config'

const state = {
    albumsInfo: {},
}
const mutations = {
    setAlbums(state, params) {
        state.albumsInfo = params
    },
}
const actions = {
    async getAlbums({ commit }, { page }) {
        const { msgCode, data } = await http.get('/album/getAlbums', { params: { page } })
        if (msgCode === 200) {
            commit('setAlbums', data)
        }
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
