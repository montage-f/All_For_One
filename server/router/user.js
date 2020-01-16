/**
 * Created by MonTage_fz on 2019/12/27
 */
const { User } = require('../db')
const { user, userRole } = require('../controller')
const { jwt, HOST, PORT } = require('../config')

module.exports = {
    async login(ctx) {
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
    async register(ctx) {
        const { request, response } = ctx
        const { body } = request
        const { username, password, img = '', isAdmin = 0, roleIds = [], name = '' } = body
        if (username && password) {
            const user = await User.findOne({ username })
            if (!user) {
                const dateNow = Date.now()
                // 拿到用户id, 并返回给前端
                const { _id: userId } = await User.create({
                    username,
                    name,
                    password,
                    img,
                    isAdmin,
                    createTime: dateNow,
                    updateTime: dateNow,
                })
                // 如果选择了角色, 那么就要存入user_role数据库
                if (roleIds.length) {
                    const result = await userRole.add(userId, roleIds)
                    console.log(result, '存入user_role数据库成功')
                }
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
    async webAdd(ctx) {
        const { request, response } = ctx
        const { body: { username, password, img, roleIds = [], isAdmin = 0, name = '' } } = request
        if (username && password && img) {
            const isUser = await user.findOne(username)
            if (isUser) {
                response.body = {
                    msgCode: 400,
                    message: '该用户名以存在, 请更换用户名',
                }
            } else {
                const dateNow = Date.now()
                const { _id: userId } = await user.add({
                    username,
                    name,
                    password,
                    img,
                    isAdmin,
                    createTime: dateNow,
                    updateTime: dateNow,
                })
                // 如果传入了角色id, 那么就让用户id和角色id关联起来
                if (roleIds.length) {
                    userRole.add(userId, roleIds)
                }
                response.body = {
                    msgCode: 200,
                    message: '用户添加成功',
                }
            }
            return
        }
        response.body = {
            msgCode: 400,
            message: '用户添加失败',
        }
        
    },
    async webUpdate(ctx) {
        const { request, response } = ctx
        const { body } = request
        const { img, username, name } = body
        if (img && username && name) {
            const dateNow = Date.now()
            const { nModified } = await user.webUpdate({
                ...body,
                updateTime: dateNow,
            })
            if (nModified) {
                response.body = {
                    msgCode: 200,
                    message: '更新成功',
                }
            } else {
                response.body = {
                    msgCode: 400,
                    message: '更新失败',
                }
            }
            return
        }
        response.body = {
            msgCode: 400,
            message: '请完善用户信息',
        }
        
    },
    async webDelete(ctx) {
        const { response, request } = ctx
        const { body } = request
        const { userId } = body
        if (userId) {
            const { deletedCount } = await user.webDelete(userId)
            if (deletedCount) {
                response.body = {
                    msgCode: 200,
                    message: '删除成功',
                }
            } else {
                response.body = {
                    msgCode: 400,
                    message: '删除失败',
                }
            }
            
        } else {
            response.body = {
                msgCode: 400,
                message: '请传入正确的参数',
            }
        }
    },
    // 获取用户信息
    async info(ctx) {
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
    // 编辑用户
    async update(ctx) {
        const { response, userInfo: { userId } } = ctx
        const { body } = response
        const { nModified } = await user.update(userId, body)
        if (nModified) {
            response.body = {
                msgCode: 200,
                message: '更新成功',
            }
        } else {
            response.body = {
                msgCode: 400,
                message: '更新失败',
            }
        }
    },
    // 获取用户列表
    async list(ctx) {
        const { request, response } = ctx
        const { query: { pageIndex, pageSize } } = request
        let result;
        if (pageIndex && pageSize) {
            result = await user.list(pageIndex, pageSize)
        } else {
            result = await user.list()
        }
        const count = await user.count()
        const list = result.map((item) => {
            return {
                username: item.username,
                name: item.name,
                img: item.img,
                isAdmin: item.isAdmin,
                updateTime: item.updateTime,
                createTime: item.createTime,
                userId: item._id,
                roleIds: [],
            }
        })
        response.body = {
            msgCode: 200,
            data: {
                count,
                list,
            },
        }
    },
    async remove(ctx) {
        const { request, response } = ctx
        const { body: { userId } } = request
        const { deletedCount } = await user.remove(userId)
        if (deletedCount) {
            response.body = {
                msgCode: 200,
                message: '删除成功',
            }
        } else {
            response.body = {
                msgCode: 400,
                message: '删除失败',
            }
        }
    },
}
