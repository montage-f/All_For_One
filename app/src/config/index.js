/**
 * Created by MonTage_fz on 2019/12/26
 */


import http from './http'
import storage from './storage'

export { http, storage }

export default (Vue) => {
    
    Vue.prototype.$http = http
    Vue.prototype.$storage = storage
}
