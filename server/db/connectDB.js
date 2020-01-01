/**
 * Created by MonTage_fz on 2019/12/27
 */
const mongoose = require('mongoose')

module.exports = () => {
    // 定义数据库地址和数据库名称 mongodb://数据库ip地址:端口号/数据库名
    // mongodb://用户名:密码@127.0.0.1:27017/数据库名称
    mongoose.connect('mongodb://193.112.46.67:27017/album', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    
    // 数据库链接成功事件之后回调
    mongoose.connection.on('open', () => {
        console.log('数据库链接成功')
    })
    
    // 数据库链接失败事件之后回调
    mongoose.connection.on('error', () => {
        console.log('数据库链接失败')
    })
    
    //数据库断开事件之后回调
    mongoose.connection.on('close', () => {
        console.log('数据库断开连接')
    });
    
    
}
