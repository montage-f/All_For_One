/**
 * Created by MonTage_fz on 2020/1/9
 */
const { User } = require('../db')
module.exports = {
    async update(userId, params) {
        return await User.updateOne({ _id: userId }, params)
    },
    async list(pageIndex, pageSize) {
        if (pageIndex && pageSize) {
            return await User.find().skip((pageIndex - 1) * pageSize).limit(+pageSize)
        } else {
            return await User.find()
        }
    },
    async count() {
        return await User.countDocuments()
    },
    async remove(userId) {
        return await User.deleteOne({ _id: userId })
    },
    async add(params) {
        return await User.create(params)
    },
    async findOne(username) {
        return await User.findOne({ username })
    },
    async webUpdate(params) {
        const { userId, ...rest } = params
        return User.updateOne({ _id: userId }, { ...rest })
    },
    async webDelete(userId) {
        return User.deleteOne({ _id: userId })
    },
}
