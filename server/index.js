/**
 * Created by MonTage_fz on 2019/12/26
 */
const Koa = require('koa')
const app = new Koa()
const router = require('./router')
const middleware = require('./middleware')
const { connectDB } = require('./db')

// 链接数据库
connectDB()
// 注册中间件
middleware(app)
// 注册路由
router(app)

app.listen(3000, () => {
    console.log(`http://localhost:3000`)
})
