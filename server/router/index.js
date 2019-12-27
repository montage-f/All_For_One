/**
 * Created by MonTage_fz on 2019/12/27
 */
const Router = require('koa-router')
const router = new Router()
const user = require('./user')
const upload = require('./upload')
const { uploads, verifyToken } = require('../config')

router.post('/user/register', user.register)
router.post('/user/login', user.login)
router.get('/user/info', user.info)

// 上传图片
const uploadImg = uploads('img')
router.post('/upload/img', verifyToken, uploadImg.single('file'), upload.img)

module.exports = (app) => {
    app.use(router.routes())
    app.use(router.allowedMethods())
}




