/**
 * Created by montage_fz on 2020-02-01
 */
const idToString = require('./idToString')
module.exports = (id, pId, list = []) => {
    list.forEach(item => {
        // 这里用字符串0, 是因为外面传入进来的id是个字符串,
        // 存入数据库也是字符串, 所以就不适用数字类型了
        if (item[pId] !== '0') {
            list.forEach(k => {
                if (idToString(k[id]) === item[pId]) {
                    if (!k.children) {
                        k.children = []
                    }
                    k.children.push(item)
                }
            })
        }
    })
    return list.filter(item => item.pId === '0')
}
