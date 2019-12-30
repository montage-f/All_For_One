/**
 * Created by MonTage_fz on 2019/12/30
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const albumSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    token: {
        type: String,
        require: true,
    },
})


module.exports = mongoose.model('Album', albumSchema)
