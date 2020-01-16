/**
 * Created by MonTage_fz on 2020/1/14
 */
import { http } from '@plugin'

export const login = async (params) => {
    return await http.post('/api/user/login', params)
}
export const getList = async (params) => {
    return await http.get('/api/user/list', { params })
}

export const addUser = async (params) => {
    return await http.post('/api/web/user/add', params)
}

export const updateUser = async (params) => {
    return await http.put('/api/web/user/update', params)
}

export const deleteUser = async (params) => {
    return await http.delete('/api/web/user/delete', { data: params })
}
