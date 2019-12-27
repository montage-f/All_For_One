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
        }
    } catch (e) {
        response.body = {
            msgCode: 404,
            message: '请重新登录',
        }
        console.log(e)
    }
}
