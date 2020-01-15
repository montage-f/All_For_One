/**
 * Created by MonTage_fz on 2019/12/27
 */
const { User } = require('../db')
const { HOST, PORT } = require('../config')
module.exports = {
    async img(ctx, next) {
        const { req, response, userInfo: { userId } } = ctx
        const { file } = req
        try {
            const { filename } = file
            // 更新数据库
            await User.updateOne({ _id: userId }, { img: `http://${ HOST }:${ PORT }/user/${ filename }` })
            response.body = {
                msgCode: 200,
                message: '上传成功',
                data: {
                    img: `http://${ HOST }:${ PORT }/user/${ filename }`,
                },
            }
        } catch (e) {
            response.body = {
                msgCode: 400,
                message: '上传参数不对, 请检查',
            }
        }
    },
    async webImg(ctx) {
        const { req, response } = ctx
        const { file } = req
        try {
            const { filename } = file
            response.body = {
                msgCode: 200,
                message: '上传成功',
                data: {
                    img: `http://${ HOST }:${ PORT }/webUser/${ filename }`,
                },
            }
        } catch (e) {
            response.body = {
                msgCode: 400,
                message: '上传失败',
            }
        }
    },
}
