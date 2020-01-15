/**
 * Created by MonTage_fz on 2019/12/27
 */
const Router = require('koa-router')
const router = new Router()

// 配置路由前缀
router.prefix('/api')


const user = require('./user')
const upload = require('./upload')
const album = require('./album')
const photos = require('./photos')
const role = require('./role')
const userRole = require('./userRole')

const { uploads, verifyToken } = require('../config')

router.post('/user/register', user.register)
router.post('/user/login', user.login)
router.get('/user/info', verifyToken, user.info)
router.put('/user/update', verifyToken, user.update)
router.get('/user/list', verifyToken, user.list)
router.delete('/user/remove', verifyToken, user.remove)

// 上传图片, 放到user文件夹下面
const uploadWebUserImg = uploads('webUser')
router.post('/web/user/addImg', verifyToken, uploadWebUserImg.single('file'), upload.webImg)
router.post('/web/user/add', verifyToken, user.add)

const uploadUserImg = uploads('user')
router.post('/upload/img', verifyToken, uploadUserImg.single('file'), upload.img)

// 相册
router.post('/album/add', verifyToken, album.add)
router.get('/album/getAlbums', verifyToken, album.getAlbums)
router.delete('/album/delete', verifyToken, album.delete)
router.put('/album/update', verifyToken, album.update)

// 相片, 放到photos文件夹下面
const uploadPhotosImg = uploads('photos')
router.get('/photos/list', verifyToken, photos.list)
router.post('/photos/add', verifyToken, uploadPhotosImg.single('file'), photos.add)
router.put('/photos/update', verifyToken, photos.update)
router.delete('/photos/delete', verifyToken, photos.delete)

// 角色
router.post('/role/add', verifyToken, role.add)
router.get('/role/list', verifyToken, role.list)
router.put('/role/update', verifyToken, role.update)
router.delete('/role/remove', verifyToken, role.remove)

// 用户_角色 设定用户与角色之间的关系
router.post('/userRole/add', userRole.add)

module.exports = (app) => {
    app.use(router.routes())
    app.use(router.allowedMethods())
}




