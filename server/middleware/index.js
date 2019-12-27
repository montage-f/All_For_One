/**
 * Created by MonTage_fz on 2019/12/27
 */
const bodyparser = require('koa-bodyparser')
const staticFile = require('koa-static')
const path = require('path')

module.exports = (app) => {
    // 支持文件上传
    app.use(bodyparser({ multipart: true }))
    // 将存放文件的文件夹静态化, 从而避免每一个文件都需要去写一个路由
    // 要访问图片就可以直接进http://localhost:3000/img/...
    app.use(staticFile(
        path.join(__dirname, `../assets`),
    ))
}
