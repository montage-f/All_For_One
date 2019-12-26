/**
 * Created by MonTage_fz on 2019/12/26
 */
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
    outputDir: 'docs',
    publicPath: '/',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ["*"],
                    }),
                ],
            },
        },
    },
};
