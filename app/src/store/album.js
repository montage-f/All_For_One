/**
 * Created by MonTage_fz on 2019/12/30
 */
import { http } from '../config'

const state = {
    albumsInfo: {},
    info: {
        name: '',
        albumId: '',
    },
}
const mutations = {
    setAlbums(state, params) {
        state.albumsInfo = params
    },
    setInfo(state, params) {
        state.info = params
    },
}
const actions = {
    async getAlbums({ commit }, { pageIndex, pageSize }) {
        const { msgCode, data } = await http.get('/album/getAlbums', { params: { pageIndex, pageSize } })
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
