/**
 * Created by MonTage_fz on 2019/12/27
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    token: String,
})

module.exports = mongoose.model('User', userSchema)
