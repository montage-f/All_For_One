/**
 * Created by MonTage_fz on 2019/12/27
 */

const { sign, verify } = require('jsonwebtoken')
const PRIVATE_KEY = 'private_key'
module.exports = {
    // 生成token
    sign(params) {
        return sign(params, PRIVATE_KEY, { expiresIn: 60 * 60 })
    },
    // 验证token
    verify(token) {
        return verify(token, PRIVATE_KEY)
    },
}
