/**
 * Created by MonTage_fz on 2019/9/25
 */
// 在 webStorm 里面配置 webpack
const path = require('path')

module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve('src'),
            '@assets': path.resolve('src/assets'),
            '@views': path.resolve('src/views'),
            '@comp': path.resolve('src/components'),
            '@api': path.resolve('src/api'),
            '@plugin': path.resolve('src/plugin'),
            '@utils': path.resolve('src/utils'),
            '@store': path.resolve('src/store'),
        },
    },
}
