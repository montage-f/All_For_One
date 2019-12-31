/**
 * Created by MonTage_fz on 2019/12/27
 */
const Router = require('koa-router')
const router = new Router()

const user = require('./user')
const upload = require('./upload')
const album = require('./album')
const photos = require('./photos')

const { uploads, verifyToken } = require('../config')

router.post('/user/register', user.register)
router.post('/user/login', user.login)
router.get('/user/info', verifyToken, user.info)

// 上传图片
const uploadImg = uploads('img')
router.post('/upload/img', verifyToken, uploadImg.single('file'), upload.img)

// 相册
router.post('/album/add', verifyToken, album.add)
router.get('/album/getAlbums', verifyToken, album.getAlbums)
router.delete('/album/delete', verifyToken, album.delete)
router.put('/album/update', verifyToken, album.update)

// 相片
router.get('/photos/list', verifyToken, photos.list)
router.post('/photos/add', verifyToken, uploadImg.single('file'), photos.add)
router.put('/photos/update', verifyToken, photos.update)

module.exports = (app) => {
    app.use(router.routes())
    app.use(router.allowedMethods())
}




