/**
 * Created by MonTage_fz on 2020/1/8
 */
const { Role } = require('../db')

module.exports = {
    async getOne(name) {
        return await Role.findOne({ name })
    },
    async getList(pageIndex, pageSize) {
        if (pageIndex && pageSize) {
            return await Role.find().skip((pageIndex - 1) * pageSize).limit(+pageSize)
        } else {
            return await Role.find()
        }
    },
    async add(params) {
        const { name, remark, createTime, updateTime } = params
        return await Role.create({
            name,
            remark,
            createTime,
            updateTime,
        })
    },
    async remove(roleId) {
        console.log(roleId)
        return await Role.deleteOne({ _id: roleId })
    },
    async update(params) {
        const { roleId, name, remark } = params
        return await Role.updateOne({ _id: roleId }, { name, remark })
    },
    async count() {
        return await Role.countDocuments()
    },
}
