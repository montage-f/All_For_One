/**
 * Created by MonTage_fz on 2019/12/31
 */
const { Photos } = require('../db')
module.exports = {
    async list(ctx) {
        const { request, response } = ctx
        const { headers: { token }, query } = request
        const { albumId, pageIndex, pageSize } = query
        const photos = await Photos.find({ token, albumId }).skip((pageIndex - 1) * pageSize).limit(+pageSize)
        const count = await Photos.countDocuments({ token, albumId })
        response.body = {
            msgCode: 200,
            data: {
                list: photos.map(item => ({
                    img: item.img,
                    photoId: item._id,
                    photoName: item.photoName,
                })),
                count,
            },
        }
    },
    async add(ctx) {
        const { req, request, response } = ctx
        const { headers: { token } } = request
        const { file: { filename }, body: { albumId } } = req
        const result = await Photos.findOne({ token, albumId, img: `http://127.0.0.1:3000/img/${ filename }` })
        if (result) {
            response.body = {
                msgCode: 400,
                message: '该相片已存在, 请勿重复上传',
            }
        } else {
            try {
                await Photos.create({
                    token,
                    albumId,
                    photoName: filename,
                    img: `http://127.0.0.1:3000/img/${ filename }`,
                })
                response.body = {
                    msgCode: 200,
                    message: '上传成功',
                }
            } catch (e) {
                response.body = {
                    msgCode: 400,
                    message: '上传失败',
                }
            }
        }
    },
    async update(ctx) {
        const { request, response } = ctx
        const { headers: { token }, body } = request
        const { photoName, photoId } = body
        const { nModified } = await Photos.updateOne({ token, _id: photoId }, { photoName })
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
