/**
 * Created by MonTage_fz on 2019/12/27
 */
const jwt = require('./jwt')
module.exports = async (ctx, next) => {
    const { request, response } = ctx
    const { headers: { token } } = request
    try {
        if (token) {
            // 如果验证没有通过, 则会报错
            jwt.verify(token)
            await next()
        } else {
            response.body = {
                msgCode: 404,
                message: '还未登录, 请登录',
            }
        }
    } catch (e) {
        response.body = {
            msgCode: 404,
            message: '验证不通过, 请重新登录',
        }
    }
}
