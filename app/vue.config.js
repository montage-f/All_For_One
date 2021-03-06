/**
 * Created by MonTage_fz on 2019/12/26
 */
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
    outputDir: 'album_app',
    publicPath: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
            },
        },
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*'],
                    }),
                ],
            },
        },
    },
};
