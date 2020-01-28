/**
 * Created by MonTage_fz on 2020/1/8
 */
const { role } = require('../../controller')
module.exports = {
    async add(ctx, next) {
        const { request, response } = ctx
        const { body: { name, remark } } = request
        if (name) {
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
                    remark,
                    createTime: dateNow,
                    updateTime: dateNow,
                })
                response.body = {
                    msgCode: 200,
                    message: '角色添加成功',
                }
            }
        } else {
            response.body = {
                msgCode: 400,
                message: '请输入角色名称',
            }
        }
        
    },
    async list(ctx, next) {
        const { request, response } = ctx
        const { query: { pageIndex, pageSize } } = request
        let result
        if (pageSize && pageIndex) {
            result = await role.getList(pageIndex, pageSize)
        } else {
            result = await role.getList()
        }
        const count = await role.count()
        response.body = {
            msgCode: 200,
            data: {
                list: result.map(item => ({
                    roleId: item.id,
                    name: item.name,
                    remark: item.remark,
                    createTime: item.createTime,
                    updateTime: item.updateTime,
                })),
                count,
            },
        }
    },
    async remove(ctx) {
        const { request, response } = ctx
        const { body: { roleId } } = request
        const { deletedCount } = await role.remove(roleId)
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
    async update(ctx, next) {
        const { request, response } = ctx
        const { body: { roleId, name, remark = '' } } = request
        const { nModified } = await role.update({ roleId, name, remark })
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
