/**
 * Created by MonTage_fz on 2020/1/7
 */

import http from './http'
import storage from './storage'
import formValidate from './formValidate'
import { Menu, Submenu, MenuItem, Form, FormItem, Input, Button, Message } from 'element-ui'

const elementUi = [Menu, Submenu, MenuItem, Form, FormItem, Input, Button, Message]

export { http, storage }

export default (Vue) => {
    // 设置所有element的组件的大小为small
    Vue.prototype.$ELEMENT = { size: 'small' };
    elementUi.forEach((tem) => {
        Vue.use(tem)
    })
    Vue.prototype.$http = http
    Vue.prototype.$storage = storage
    Vue.prototype.$formValidate = formValidate
    Vue.prototype.$message = Message
}
