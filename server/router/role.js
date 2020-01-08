/**
 * Created by MonTage_fz on 2020/1/8
 */
const { role } = require('../controller')
module.exports = {
    async add(ctx, next) {
        const { request, response } = ctx
        const { body: { name } } = request
        const result = await role.getOne(name)
        if (result) {
            response.body = {
                msgCode: 400,
                message: '当前角色已存在, 请更换角色名',
            }
        } else {
            const dateNow = Date.now()
            const { _id: roleId } = await role.add({
                name,
                createTime: dateNow,
                updateTime: dateNow,
            })
            response.body = {
                msgCode: 200,
                message: '角色添加成功',
            }
        }
    },
    async get(ctx, next) {
        const { request, response } = ctx
        const { query: { pageIndex, pageSize } } = request
        let result
        if (pageSize && pageIndex) {
            result = await role.get(pageIndex, pageSize)
        } else {
            result = await role.get()
        }
        response.body = {
            msgCode: 200,
            data: result,
        }
    },
    async remove() {
    
    },
    async update(ctx, next) {
        const { request, response } = ctx
        const { body: { roleId, name } } = request
        const { nModified } = await role.update({ roleId, name })
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
}