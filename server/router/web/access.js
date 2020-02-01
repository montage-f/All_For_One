/**
 * Created by montage_fz on 2020-01-24
 */

const { access } = require('../../controller')
const { listToTree } = require('../../config')
module.exports = {
    // 添加权限
    async add(ctx) {
        const { request: { body }, response } = ctx
        const { title, url, pId } = body
        const createTime = Date.now()
        if (title && url) {
            const hasTitleAndUrl = await access.findOne({ title, url })
            
            if (hasTitleAndUrl) {
                response.body = {
                    msgCode: 400,
                    message: `该 ${ hasTitleAndUrl } 已存在, 请勿重复添加`,
                }
            } else {
                const { _id: accessId } = await access.add({ title, url, pId, createTime, updateTime: createTime })
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
                list: listToTree('powerId', 'pId',
                    list.map(item => ({
                        powerId: item._id,
                        title: item.title,
                        url: item.url,
                        pId: item.pId,
                        createTime: item.createTime,
                        updateTime: item.updateTime,
                    })),
                ),
                count,
            },
        }
    },
    async update(ctx) {
        const { request: { body }, response } = ctx
        const { powerId, title, url } = body
        const updateTime = Date.now()
        const { nModified } = await access.update({ powerId, title, url, updateTime })
        if (nModified) {
            response.body = {
                msgCode: 200,
                message: '更新成功',
            }
            return
        }
        response.body = {
            msgCode: 400,
            message: '更新失败',
        }
    },
    async remove(ctx) {
        const { request: { body }, response } = ctx
        const { powerId } = body
        if (powerId) {
            const { deletedCount } = await access.remove({ powerId })
            if (deletedCount) {
                response.body = {
                    msgCode: 200,
                    message: '删除成功',
                }
                return
            }
            response.body = {
                msgCode: 400,
                message: '删除失败',
            }
        } else {
            response.body = {
                msgCode: 400,
                message: '请传入powerId',
            }
        }
    },
}
