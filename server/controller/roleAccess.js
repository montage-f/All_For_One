/**
 * Created by montage_fz on 2020-01-28
 */
const { RoleAccess, Access } = require('../db')
module.exports = {
    // 角色Id 与 权限Id 关联
    async add(roleId, accessIds) {
        const createTime = Date.now()
        accessIds.map((accessId) => RoleAccess.create({ roleId, accessId, createTime }))
    },
    async update(roleId, accessIds) {
        const createTime = Date.now()
        // 先找到已经存在的集合
        let oldAccessIds = await RoleAccess.find({ roleId })
        oldAccessIds = oldAccessIds.map(item => item.accessId)
        // 如果A里面存在, B里面不存在, 那么就往B里面添加
        accessIds
            .filter(x => !oldAccessIds.includes(x))
            .forEach(accessId => {
                RoleAccess.create({ roleId, accessId, createTime })
            })
        // 如果A里面不存在, B里面存在, 那么就删除B里面存在的项
        oldAccessIds
            .filter(x => !accessIds.includes(x))
            .forEach(async accessId => {
                await RoleAccess.deleteOne({ roleId, accessId })
            })
    },
    async list(roleId) {
        const roleAccess = await RoleAccess.find({ roleId })
        return Promise.all(roleAccess.map(async (item) => {
            const info = await Access.findOne({ _id: item.accessId })
            return {
                powerId: info._id,
                title: info.title,
                url: info.url,
            }
        }))
    },
}
