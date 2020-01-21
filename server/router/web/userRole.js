/**
 * Created by MonTage_fz on 2020/1/9
 */
const { userRole } = require('../../controller')
module.exports = {
    async add(ctx) {
        const { request, response } = ctx
        const { body: { userId, roleIds } } = request
        if (userId && roleIds.length) {
            const result = await userRole.add(userId, roleIds)
            response.body = {
                msgCode: 200,
                message: '角色关联成功',
                data: result,
            }
        } else {
            response.body = {
                msgCode: 400,
                message: '参数传入有误, 请检查',
            }
        }
    },
}
