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
            // 获取文件的拓展名
            const extname = path.extname(originalname)
            const name = (min, max) => Math.floor(Math.random() * (max - min) + min)
            const randomName = `${ name(1, 100000) }${ extname }`
            cb(null, randomName)
        },
    })
    // 设置文件上传大小
    const limits = {
        fields: 10, // 非文件字段的数量
        fileSize: 1024 * 1024, // 文件大小, 单位b
        files: 1, // 文件个数
    }
    return multer({ storage, limits })
}
