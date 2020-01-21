/**
 * Created by MonTage_fz on 2020/1/16
 */
// 将web端的接口都写入到这个文件里面
const { uploads, verifyToken } = require('../../config')

const upload = require('../upload')
const user = require('../user')
const role = require('./role')
const userRole = require('./userRole')

module.exports = (router) => {
    // 上传图片, 放到webUser文件夹下面
    const uploadWebUserImg = uploads('webUser')
    router.post('/web/user/addImg', verifyToken, uploadWebUserImg.single('file'), upload.webImg)
    router.post('/web/user/add', verifyToken, user.webAdd)
    router.put('/web/user/update', verifyToken, user.webUpdate)
    router.delete('/web/user/delete', verifyToken, user.webDelete)
    
    // 角色
    router.post('/web/role/add', verifyToken, role.add)
    router.get('/web/role/list', verifyToken, role.list)
    router.put('/web/role/update', verifyToken, role.update)
    router.delete('/web/role/remove', verifyToken, role.remove)
    
    // 用户_角色 设定用户与角色之间的关系
    router.post('/userRole/add', userRole.add)
}
