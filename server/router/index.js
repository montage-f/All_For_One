/**
 * Created by MonTage_fz on 2019/12/27
 */
const Router = require('koa-router')
const router = new Router()
const user = require('./user')

router.post('/user/register', user.register)
router.post('/user/login', user.login)

module.exports = (app) => {
    app.use(router.routes())
    app.use(router.allowedMethods())
}




