/**
 * Created by MonTage_fz on 2020/1/7
 */
// 角色与权限之间的关系
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roleAccessSchema = new Schema({
    roleId: {
        type: String,
        require: true,
    }, // 角色Id
    accessId: {
        type: String,
        require: true,
    }, // 权限Id
    createTime: Date,
})

module.exports = mongoose.model('RoleAccess', roleAccessSchema)
