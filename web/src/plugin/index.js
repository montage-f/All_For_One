/**
 * Created by MonTage_fz on 2020/1/7
 */

import http from './http'
import storage from './storage'
import { Menu, Submenu, MenuItem } from 'element-ui'

const element = [Menu, Submenu, MenuItem]

export { http, storage }

export default (Vue) => {
    element.forEach((tem) => {
        Vue.use(tem)
    })
    Vue.prototype.$http = http
    Vue.prototype.$storage = storage
}
