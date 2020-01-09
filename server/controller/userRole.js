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
}
