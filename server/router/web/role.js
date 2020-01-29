/**
 * Created by MonTage_fz on 2020/1/8
 */
const { role, roleAccess } = require('../../controller')
module.exports = {
    async add(ctx, next) {
        const { request, response } = ctx
        const { body: { name, remark, powerIds = [] } } = request
        if (name) {
            const result = await role.getOne(name)
            if (result) {
                response.body = {
                    msgCode: 400,
                    message: '当前角色已存在, 请更换角色名',
                }
            } else {
                const createTime = Date.now()
                const { _id: roleId } = await role.add({
                    name,
                    remark,
                    createTime,
                    updateTime: createTime,
                })
                
                // 关联角色Id和权限Id
                if (powerIds.length) {
                    roleAccess.add(roleId, powerIds)
                }
                
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
        const list = await Promise.all(result.map(async item => {
            const powerInfo = await roleAccess.list(item.id)
            return {
                roleId: item.id,
                powerInfo,
                name: item.name,
                remark: item.remark,
                createTime: item.createTime,
                updateTime: item.updateTime,
            }
        }))
        response.body = {
            msgCode: 200,
            data: {
                list,
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
        const { body: { roleId, name, remark = '', powerIds = [] } } = request
        const { nModified } = await role.update({ roleId, name, remark })
        // 有两个数组, A 为传入进来的数组, B 为已经存在的数组
        // 如果 A里面存在 B里面不存在, 那么就要往B里面添加这一项
        // 如果 A里面不存在 B里面存在, 那么就要删除B里面这一项
        roleAccess.update(roleId, powerIds)
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
