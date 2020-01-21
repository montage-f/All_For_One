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

export const update = async (params) => {
    return await http.put('/api/web/role/update', params)
}

export const remove = async (params) => {
    return await http.delete('/api/web/role/remove', { data: params})
}
