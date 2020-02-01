/**
 * Created by montage_fz on 2020-02-01
 */
const mongoose = require('mongoose')
module.exports = (id) => {
    return mongoose.Types.ObjectId(id).toString()
}
