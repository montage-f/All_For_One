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

router.post('/api/user/register', user.register)
router.post('/api/user/login', user.login)
router.get('/api/user/info', verifyToken, user.info)

// 上传图片, 放到user文件夹下面
const uploadUserImg = uploads('user')
router.post('/api/upload/img', verifyToken, uploadUserImg.single('file'), upload.img)

// 相册
router.post('/api/album/add', verifyToken, album.add)
router.get('/api/album/getAlbums', verifyToken, album.getAlbums)
router.delete('/api/album/delete', verifyToken, album.delete)
router.put('/api/album/update', verifyToken, album.update)

// 相片, 放到photos文件夹下面
const uploadPhotosImg = uploads('photos')
router.get('/api/photos/list', verifyToken, photos.list)
router.post('/api/photos/add', verifyToken, uploadPhotosImg.single('file'), photos.add)
router.put('/api/photos/update', verifyToken, photos.update)
router.delete('/api/photos/delete', verifyToken, photos.delete)

module.exports = (app) => {
    app.use(router.routes())
    app.use(router.allowedMethods())
}




