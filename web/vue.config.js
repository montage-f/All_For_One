/**
 * Created by MonTage_fz on 2020/1/7
 */
const path = require('path')
const resolve = (dir) => {
    return path.join(__dirname, dir)
}

module.exports = {
    outputDir: 'album_web',
    publicPath: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
            },
        },
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@views', resolve('src/views'))
            .set('@comp', resolve('src/components'))
            .set('@plugin', resolve('src/plugin'))
            .set('@api', resolve('src/api'))
            .set('@store', resolve('src/store'))
            .set('@router', resolve('src/router'))
    },
}
