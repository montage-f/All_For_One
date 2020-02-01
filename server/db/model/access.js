/**
 * Created by MonTage_fz on 2020/1/7
 */
// 权限
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accessSchema = new Schema({
    title: String, // 权限名称
    url: String, // 页面对应的url
    pId: {
        type: String,
        default: 0,
    }, // 父元素的Id
    createTime: Date,
    updateTime: Date,
})


module.exports = mongoose.model('Access', accessSchema)
