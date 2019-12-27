/**
 * Created by MonTage_fz on 2019/12/27
 */
const bodyparser = require('koa-bodyparser')
module.exports = (app) => {
    app.use(bodyparser())
}
