/**
 * Created by MonTage_fz on 2019/12/31
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const photosSchema = new Schema({
    token: {
        type: String,
        require: true,
    },
    albumId: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        require: true,
    },
    photoName: String,
})

module.exports = mongoose.model('Photos', photosSchema)
