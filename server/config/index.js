/**
 * Created by MonTage_fz on 2019/12/27
 */
const jwt = require('./jwt')
const uploads = require('./upload')
const verifyToken = require('./verifyToken')
const HOST = `127.0.0.1` //193.112.46.67
const PORT = 3000
module.exports = {
    jwt,
    uploads,
    verifyToken,
    HOST,
    PORT
}
