/**
 * Created by montage_fz on 2020-01-24
 */
const { Access } = require('../db')

module.exports = {
    async add(params) {
        return await Access.create(params)
    },
    async findOne({ title, url }) {
        // return await Access.findOne({
        //     $or: [
        //         { title },
        //         { url },
        //     ],
        // })
        if (title) {
            const isTrue = await Access.findOne({ title })
            if (isTrue) {
                return title
            }
        }
        if (url) {
            const isTrue = await Access.findOne({ url })
            if (isTrue) {
                return url
            }
        }
        return false
    },
    async getList(pageIndex, pageSize) {
        if (pageIndex && pageSize) {
            return await Access.find().skip((pageIndex - 1) * pageSize).limit(+pageSize)
        } else {
            return await Access.find()
        }
    },
    async count() {
        return await Access.countDocuments()
    },
    async update(params) {
        const { powerId: _id, ...rest } = params
        return await Access.updateOne({ _id }, rest)
    },
    async remove({ powerId: _id }) {
        // 删除
        await Access.deleteMany({ pId: _id })
        return await Access.deleteOne({ _id })
    },
}
