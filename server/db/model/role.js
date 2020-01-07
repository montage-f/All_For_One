/**
 * Created by MonTage_fz on 2020/1/7
 */
// 角色
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roleSchema = new Schema({
    name: String, // 角色名称
    status: Number, // 角色状态, 表示这条状态是否有效, 1 是有效, 0 是无效
    updateTime: Date, // 更新时间
    createTime: Date, // 用户创建时间
})

module.exports = mongoose.model('Role', roleSchema)
