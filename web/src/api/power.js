/**
 * Created by montage_fz on 2020-01-27
 */
import { http } from '@plugin'

export const add = async (params) => {
    return await http.post('/api/web/access/add', params)
}
export const list = async (params) => {
    return await http.get('/api/web/access/list', { params })
}
export const update = async (params) => {
    return await http.put('/api/web/access/update', params)
}
export const remove = async (params) => {
    return await http.delete('/api/web/access/remove', { data: params })
}
