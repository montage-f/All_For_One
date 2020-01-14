/**
 * Created by MonTage_fz on 2020/1/14
 */
import { http } from '@plugin'

export const login = async (params) => {
    return await http.post('/api/user/login', params)
}
