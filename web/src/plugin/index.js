/**
 * Created by MonTage_fz on 2020/1/7
 */

import http from './http'
import storage from './storage'
import formValidate from './formValidate'
import formatTime from './formatTime'

import {
    Menu, Submenu, MenuItem,
    Form, FormItem, Input,
    Table, TableColumn, Button,
    Pagination,
    
    Message,
} from 'element-ui'

const elementUi = [
    // 模板组件
    Menu, Submenu, MenuItem,
    Form, FormItem, Input,
    Table, TableColumn, Button,
    Pagination,
    
    // 信息组件
    Message,
]

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
    Vue.prototype.$formatTime = formatTime
}
