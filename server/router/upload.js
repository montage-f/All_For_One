/**
 * Created by MonTage_fz on 2019/12/27
 */
const { User } = require('../db')
module.exports = {
    async img(ctx, next) {
        const { req, response, userInfo: { userId } } = ctx
        const { file } = req
        try {
            const { filename } = file
            // 更新数据库
            await User.updateOne({ _id: userId }, { img: `http://127.0.0.1:3000/img/${ filename }` })
            response.body = {
                msgCode: 200,
                message: '上传成功',
            }
        } catch (e) {
            response.body = {
                msgCode: 400,
                message: '上传参数不对, 请检查',
            }
        }
    },
}
