/**
 * Created by montage_fz on 2020-01-28
 */
const { RoleAccess } = require('../db')
module.exports = {
    // 角色Id 与 权限Id 关联
    async add(roleId, accessIds) {
        const createTime = Date.now()
        accessIds.map((accessId) => RoleAccess.create({ roleId, accessId, createTime }))
    },
}
