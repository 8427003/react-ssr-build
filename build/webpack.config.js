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
            const publicPath = '//s2.tystatic.cn/ssr-test/'
            const static = require('rid-webpack-build/lib/config');
            static.OUTPUT_PUBLIC_PATH = publicPath;
            //static.MODE = 'development';
        }

        const x = webpackMerge(require('rid-webpack-build/lib/onePageReactConfig').prodConfig, config)
        return x;
    }

    if(env.dev) {
        const x = webpackMerge(require('rid-webpack-build/lib/onePageReactConfig').devConfig, config)
        console.log(JSON.stringify(x));
        return x;
    }
}


