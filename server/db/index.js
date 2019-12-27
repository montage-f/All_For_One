/**
 * Created by MonTage_fz on 2019/12/27
 */
const connectDB = require('./connectDB')
const model = require('./model')
module.exports = {
    connectDB,
    ...model,
}
