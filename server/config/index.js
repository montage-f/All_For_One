/**
 * Created by MonTage_fz on 2019/12/27
 */
const jwt = require('./jwt')
const uploads = require('./upload')
const verifyToken = require('./verifyToken')
const HOST = `193.112.46.67:27017`
module.exports = {
    jwt,
    uploads,
    verifyToken,
    HOST
}
