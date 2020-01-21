/**
 * Created by montage_fz on 2020-01-21
 */
import { http } from '@plugin'

export const addRole = async (params) => {
    return await http.post('/api/web/role/add', params)
}

export const list = async (params) => {
    return await http.get('/api/web/role/list', params)
}
