const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackBuilder = require('@sukbta/webpack-builder');

var config = {
    resolve: {
        alias: {
            // you can import('views/index.js');
            views: path.resolve(__dirname, '../src/views/'),
        }
    }
}
module.exports = function (env={}) {
    let SPAConfig = null;
    let builderConfig = {
    };

    if (env.cdn) {
        builderConfig.OUTPUT_PUBLIC_PATH = '//s2.tystatic.cn/ssr-test/';
    }

    SPAConfig = webpackBuilder.createWebpackConfig(builderConfig);

    if(env.prod) {
        SPAConfig = SPAConfig.prodConfig;
    }
    else if(env.dev) {
        SPAConfig = SPAConfig.devConfig;
    }


    return webpackMerge(SPAConfig, config)
}


