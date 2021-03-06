/**
 * Created by MonTage_fz on 2020/1/7
 */

import http from './http' // ajax请求
import storage from './storage' // 本地存储
import formValidate from './formValidate' // 表单验证
import formatTime from './formatTime' // 格式化时间
import * as formRules from './formRules' // 表单验证
import * as MessageBox from './messageBox' // messageBox 下面的组件


import {
    Menu, Submenu, MenuItem,
    Form, FormItem, Input,
    Table, TableColumn, Button,
    Pagination, Dialog, Select,
    Option, Upload, Tree, Popover,
    // 组件直接调用
    Message,
} from 'element-ui'

const elementUi = [
    // 模板组件
    Menu, Submenu, MenuItem,
    Form, FormItem, Input,
    Table, TableColumn, Button,
    Pagination, Dialog, Select,
    Option, Upload, Tree, Popover,
]

export { http, storage, formRules, formatTime }

export default (Vue) => {
    // 设置所有element的组件的大小为small
    Vue.prototype.$ELEMENT = { size: 'small' }
    elementUi.forEach((tem) => {
        Vue.use(tem)
    })
    Vue.prototype.$http = http
    Vue.prototype.$storage = storage
    Vue.prototype.$formValidate = formValidate
    Vue.prototype.$message = Message
    Vue.prototype.$formatTime = formatTime
    Vue.prototype.$confirm = MessageBox.confirm
}
