/**
 * Created by MonTage_fz on 2019/12/30
 */
const { Album } = require('../db')
module.exports = {
    async add(ctx) {
        const { request, response } = ctx
        const { headers: { token }, body: { name } } = request
        if (!name) {
            response.body = {
                msgCode: 400,
                message: '请填写相册名',
            }
            return
        }
        const album = await Album.findOne({ token, name })
        if (!album) {
            await Album.create({ token, name })
            response.body = {
                msgCode: 200,
                message: '相册创建成功',
            }
        } else {
            response.body = {
                msgCode: 400,
                message: '该相册名重复',
            }
        }
    },
    async getAlbums(ctx) {
        const { request, response } = ctx
        const { headers: { token }, query } = request
        const { page = 1 } = query
        const albums = await Album.find({ token }).skip((page - 1) * 6).limit(6)
        // 获取到Album里面的个数
        const count = await Album.countDocuments({ token })
        response.body = {
            msgCode: 200,
            data: {
                list: albums.map(item => ({
                    // 相册的名字
                    name: item.name,
                    albumId: item._id,
                })),
                // 相册的个数
                count,
            },
        }
    },
    async delete(ctx) {
        const { request, response } = ctx
        const { headers: { token }, body } = request
        const { albumId } = body
        const { deletedCount } = await Album.deleteOne({ token }, { _id: albumId })
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
    async update(ctx) {
        const { request, response } = ctx
        const { headers: { token }, body } = request
        const { albumId, name } = body
        const { nModified } = await Album.updateOne({ token, _id: albumId }, { name })
        if (nModified) {
            response.body = {
                msgCode: 200,
                message: '相册名修改成功',
            }
        } else {
            response.body = {
                msgCode: 400,
                message: '相册名修改失败',
            }
        }
    },
}
