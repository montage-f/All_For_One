/**
 * Created by MonTage_fz on 2020/1/7
 */
import axios from 'axios'
import router from '../router'
import storage from './storage'
import { Message } from 'element-ui'

const instance = axios.create()

// 请求拦截
instance.interceptors.request.use(
    (config) => {
        const userInfo = storage.get('userInfo')
        if (userInfo) {
            const { token } = userInfo
            if (token) {
                // 将token放入请求头中
                config.headers['token'] = token
            }
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
            // 404 代表着token验证验证失败, 移除旧的token, 然后重新登录
            case 404:
                storage.remove('userInfo')
                router.push('/login').catch((e) => {
                    console.log(e)
                })
                Message.error(message)
                break
        }
        return data
    },
    (error) => {
        return error
    },
)
export default instance

