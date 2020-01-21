/**
 * Created by MonTage_fz on 2020/1/7
 */
// 角色
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roleSchema = new Schema({
    name: String, // 角色名称
    remark: String, // 备注
    updateTime: Date, // 更新时间
    createTime: Date, // 用户创建时间
})

module.exports = mongoose.model('Role', roleSchema)
