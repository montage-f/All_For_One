/**
 * Created by MonTage_fz on 2019/12/27
 */
const { User } = require('../db')
const { jwt, HOST, PORT } = require('../config')

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
                const { img = '', _id: userId } = user
                const token = jwt.sign({ username, password, userId })
                response.body = {
                    msgCode: 200,
                    message: '登录成功',
                    data: {
                        token,
                        username,
                        img,
                    },
                }
            }
        } else {
            response.body = {
                msgCode: 400,
                message: '请输入用户名和密码',
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
                const dateNow = Date.now()
                // 拿到用户id, 并返回给前端
                const { _id: userId } = await User.create({
                    username,
                    password,
                    createTime: dateNow,
                    updateTime: dateNow,
                })
                const token = jwt.sign({ username, password, userId })
                response.body = {
                    msgCode: 200,
                    message: '注册成功!',
                    data: {
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
    // 获取用户信息
    async info(ctx, next) {
        const { response, userInfo } = ctx
        const { userId } = userInfo
        const { username, img } = await User.findOne({ _id: userId })
        response.body = {
            msgCode: 200,
            message: '用户信息已更新',
            data: {
                username,
                img: img || `http://${ HOST }:${ PORT }/user/timg.jpg`,
            },
        }
    },
}