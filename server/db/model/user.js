/**
 * Created by MonTage_fz on 2019/12/27
 */
// 用户
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
    }, // 用户名称
    password: {
        type: String,
        require: true,
    },
    img: String, // 用户头像
    isAdmin: {
        type: Number,
        default: 0,
    }, // 是否是管理员权限 1 是管理员, 0 不是管理员
    updateTime: Date, // 最后一次更新时间
    createTime: Date, // 用户创建时间
})

module.exports = mongoose.model('User', userSchema)
