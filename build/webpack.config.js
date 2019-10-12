const path = require('path');
const webpackMerge = require('webpack-merge');

var config = {
    resolve: {
        alias: {

            // you can import('views/index.js');
            views: path.resolve(__dirname, '../src/views/'),
        }
    }
}

module.exports = function (env={}) {
    if(env.prod) {

        if (env.cdn) {
            // 静态资源路径配置
            const publicPath = '//s2.tystatic.cn/ty-h5/'
            const static = require('rid-webpack-build/lib/config');
            static.OUTPUT_PUBLIC_PATH = publicPath;
        }

        return webpackMerge(require('rid-webpack-build/lib/onePageReactConfig').prodConfig, config)
    }

    if(env.dev) {
        return webpackMerge(require('rid-webpack-build/lib/onePageReactConfig').devConfig, config)
    }
}


