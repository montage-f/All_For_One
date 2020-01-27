/**
 * Created by montage_fz on 2020-01-24
 */
const { access } = require('../../controller')
module.exports = {
    // 添加权限
    async add(ctx) {
        const { request: { body }, response } = ctx
        const { title, url } = body
        const createTime = Date.now()
        if (title && url) {
            const hasTitleAndUrl = await access.findOne({ title, url })
            
            if (hasTitleAndUrl) {
                response.body = {
                    msgCode: 400,
                    message: `该 ${ hasTitleAndUrl } 已存在, 请勿重复添加`,
                }
            } else {
                const { _id: accessId } = await access.add({ title, url, createTime, updateTime: createTime })
                response.body = {
                    msgCode: 200,
                    message: '添加成功',
                }
            }
        } else {
            response.body = {
                msgCode: 200,
                message: '请完善权限信息',
            }
        }
    },
    async list(ctx) {
        const { request: { query }, response } = ctx
        const { pageIndex, pageSize } = query
        let list
        if (pageIndex && pageSize) {
            list = await access.getList(pageIndex, pageSize)
        } else {
            list = await access.getList()
        }
        const count = await access.count()
        response.body = {
            msgCode: 200,
            data: {
                list: list.map(item => ({
                    powerId: item._id,
                    title: item.title,
                    url: item.url,
                    createTime: item.createTime,
                    updateTime: item.updateTime,
                })),
                count,
            },
        }
    },
    async update(ctx) {
        const { request: { body }, response } = ctx
        const { powerId, title, url } = body
        
    },
    async remove(ctx) {
    
    },
}
