/**
 * Created by MonTage_fz on 2019/12/26
 */
import axios from 'axios'
import router from '../router'
import { storage } from '../config'

const instance = axios.create()

// 请求拦截
instance.interceptors.request.use(
    (config) => {
        const userInfo = storage.get('userInfo')
        const { token } = userInfo
        if (token) {
            // 将token放入请求头中
            config.headers['token'] = token
        }
        
        return config
    },
    (error) => {
        return error
    },
)

// 响应拦截
instance.interceptors.response.use(
    (config) => {
        const { data } = config
        const { msgCode, message } = data
        switch (msgCode) {
            // 404 代表着token验证验证失败
            case 404:
                router.push('/login')
                break
        }
        return data
    },
    (error) => {
        return error
    },
)
export default instance

