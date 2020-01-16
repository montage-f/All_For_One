/**
 * Created by MonTage_fz on 2020/1/16
 */
// 将web端的接口都写入到这个文件里面
const { uploads, verifyToken } = require('../../config')

const upload = require('../upload')
const user = require('../user')

module.exports = (router) => {
    // 上传图片, 放到webUser文件夹下面
    const uploadWebUserImg = uploads('webUser')
    router.post('/web/user/addImg', verifyToken, uploadWebUserImg.single('file'), upload.webImg)
    router.post('/web/user/add', verifyToken, user.webAdd)
    router.put('/web/user/update', verifyToken, user.webUpdate)
    
}
