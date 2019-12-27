/**
 * Created by MonTage_fz on 2019/12/27
 */
const { User } = require('../db')
const { jwt } = require('../config')
module.exports = {
    async login(ctx, next) {
        const { request, response } = ctx
        const { body } = request
        const { username, password } = body
        if (username && password) {
            const user = await User.findOne({ username, password })
            if (!user) {
                response.body = {
                    msgCode: 400,
                    message: '该用户还未注册!',
                }
            } else {
                const token = jwt.sign({ username, password })
                await User.updateOne({ username, password }, { token })
                response.body = {
                    msgCode: 200,
                    message: '登录成功',
                    data: {
                        token,
                        username,
                    },
                }
            }
        }
    },
    async register(ctx, next) {
        const { request, response } = ctx
        const { body } = request
        const { username, password } = body
        if (username && password) {
            const user = await User.findOne({ username })
            if (!user) {
                const token = jwt.sign({ username, password })
                await User.create({ username, password, token })
                response.body = {
                    msgCode: 200,
                    message: '注册成功!',
                    data: {
                        username,
                        token,
                    },
                }
            } else {
                response.body = {
                    msgCode: 400,
                    message: '该用户名以注册!',
                }
            }
        } else {
            response.body = {
                msgCode: 400,
                message: '请填写用户名和密码',
            }
        }
    },
}
