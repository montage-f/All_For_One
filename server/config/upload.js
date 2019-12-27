/**
 * Created by MonTage_fz on 2019/12/27
 */
const multer = require('koa-multer')
const path = require('path')

//  如果是图片就放入img文件夹中, 如果是文件就放入file文件夹中
module.exports = (type) => {
    const storage = multer.diskStorage({
        // 设置路径
        destination(req, file, cb) {
            cb(null, path.join(__dirname, `../assets/${ type }/`))
        },
        // 设置文件名称
        filename(req, file, cb) {
            // 这里使用的是上传时的名称
            const { originalname } = file
            cb(null, originalname)
        },
    })
    return multer({ storage })
}
