/**
 * Created by MonTage_fz on 2020/1/8
 */
const { Role } = require('../db')

module.exports = {
    async getOne(name) {
        return await Role.findOne({ name })
    },
    async get(pageIndex, pageSize) {
        if (pageIndex && pageSize) {
            return await Role.find().skip((pageIndex - 1) * pageSize).limit(+pageSize)
        } else {
            return await Role.find()
        }
    },
    async add(params) {
        const { name, createTime, updateTime } = params
        return await Role.create({
            name,
            createTime,
            updateTime,
        })
    },
    async remove() {
    
    },
    async update(params) {
        const { roleId, name } = params
        return await Role.update({ roleId }, { name })
    },
}