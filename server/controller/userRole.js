/**
 * Created by MonTage_fz on 2020/1/9
 */
const { UserRole } = require('../db')
module.exports = {
    async add(userId, roleIds) {
        const nowDate = Date.now()
        return await Promise.all(roleIds.map(async (roleId) => UserRole.create({
            userId,
            roleId,
            createTime: nowDate,
        })))
    },
    async list({ userId, roleId }) {
        if (userId) return await UserRole.find({ userId })
        if (roleId) return await UserRole.find({ roleId })
    },
    async updateUserRole({ userId, roleIds }) {
        const createTime = Date.now()
        const userRoleList = await UserRole.find({ userId })
        // 库里面已经存在的
        const hasRoleIds = userRoleList.map((item) => item.roleId)
        hasRoleIds.forEach(async (roleId) => {
            // 如果库里面的roleId不在传进来的roleIds里面, 那么就把它删除掉
            if (!roleIds.includes(roleId)) {
                await UserRole.deleteOne({ userId, roleId })
            }
        })
        
        roleIds.forEach(async (roleId) => {
            // 如果传入进来的roleId不在库的roleIds里面, 那么就把添加这个roleId
            if (!hasRoleIds.includes(roleId)) {
                await UserRole.create({ userId, roleId, createTime })
            }
        })
    },
}
