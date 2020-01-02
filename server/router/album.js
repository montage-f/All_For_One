/**
 * Created by MonTage_fz on 2019/12/30
 */
const { Album, Photos } = require('../db')
const { HOST } = require('../config')
module.exports = {
    async add(ctx) {
        const { request, response, userInfo: { userId } } = ctx
        const { body: { name } } = request
        if (!name) {
            response.body = {
                msgCode: 400,
                message: '请填写相册名',
            }
            return
        }
        const album = await Album.findOne({ _id: userId, name })
        if (!album) {
            await Album.create({ userId, name })
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
        const { request, response, userInfo: { userId } } = ctx
        const { query } = request
        const { pageIndex, pageSize } = query
        const albums = await Album.find({ userId }).skip((pageIndex - 1) * pageSize).limit(+pageSize)
        // 获取到Album里面的个数
        const count = await Album.countDocuments({ userId })
        // 在map里面使用async的时候, 他返回的每一项其实是一个promise对象,
        // 那么我们需要使用Promise.all来包裹一下, 更方便拿出他的数据
        const list = await Promise.all(albums.map(async item => {
            const photos = await Photos.find({ userId, albumId: item._id })
            let img
            if (photos.length) {
                img = photos[0].img
            }
            return {
                // 相册的名字
                name: item.name,
                albumId: item._id,
                photoCount: await Photos.countDocuments({ userId, albumId: item._id }),
                // 将相册里面的第一章照片默认为相册封面
                img: img || `http://${ HOST }/img/timg.jpg`,
            }
        }))
        response.body = {
            msgCode: 200,
            data: {
                list,
                // 相册的个数
                count,
            },
        }
    },
    async delete(ctx) {
        const { request, response, userInfo: { userId } } = ctx
        const { body } = request
        const { albumId } = body
        const { deletedCount } = await Album.deleteOne({ userId }, { _id: albumId })
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
        const { userInfo: { userId }, body } = request
        const { albumId, name } = body
        const { nModified } = await Album.updateOne({ userId, _id: albumId }, { name })
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
