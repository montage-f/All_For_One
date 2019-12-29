/**
 * Created by MonTage_fz on 2019/12/26
 */

import { Dialog } from 'vant'
import http from './http'
import storage from './storage'

export { http, storage }

export default (Vue) => {
    Vue.use(Dialog)
    Vue.prototype.$http = http
    Vue.prototype.$storage = storage
}
