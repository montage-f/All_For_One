/**
 * Created by MonTage_fz on 2020/1/7
 */
// user_role 用户与角色的关系
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userRoleSchema = new Schema({
    userId: {
        type: String,
        require: true,
    }, // 用户id
    roleId: {
        type: String,
        require: true,
    }, // 角色id
    createTime: Date,
})

module.exports = mongoose.model('UserRole', userRoleSchema)




