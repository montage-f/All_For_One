/**
 * Created by MonTage_fz on 2020/1/7
 */
// 权限
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accessSchema = new Schema({
    title: String, // 权限名称
    urls: String, // 页面对应的url
    status: {
        type: Number,
        default: 1,
    }, // 权限状态是否有效, 0 表示无效, 1 表示有效
    createTime: Date,
    updateTime: Date,
})


module.exports = mongoose.model('Access', accessSchema)
