const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin-ssr");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CONFIG = require('../config.js');
const moduleCssLoader = 'css-loader?modules&importLoaders=true&localIdentName=[hash:base64:8]';
const StatsPlugin = require('stats-webpack-plugin');


const MiniCssExtractPluginLoader = CONFIG.EXTRACT_RESOURCE_IN_CSS_PUBLIC_PATH ? {
    loader: MiniCssExtractPlugin.loader,
    options: {
        publicPath: CONFIG.EXTRACT_RESOURCE_IN_CSS_PUBLIC_PATH,
    },
} : MiniCssExtractPlugin.loader

module.exports = {
    output: {
        path: CONFIG.DIST_DIR,

        // 如果 publicPath 没有设置，那么index.html 中的js，css等资源路径是一个相对路径,
        // 且相默认对于inde.html(A relative URL is resolved relative to the HTML page)
        // 如果设置，则相当于给了static/xxx.js 一个前缀，对资源生成后的存放路径没影响
        // 默认值区别于devServer的publicPath，devServer不设置，则默认值为‘/’， 这里不设置，相当于
        /// 一个空字符串, 走相对路径
        //
        // 通常如果静态资源（非html 文件）由独立的静态资源服务器提供务，
        // 或者是分配了单独的静态资源访问路径时需要设置此前缀。
        // 通常如果静态资源与html文件保持构建时的目录结构时，走相对路径，无需设置。
        //
        // 由config.js 覆盖
        publicPath: '/', //无其它前缀时，必须为‘/’,否则资源路径错误，出现undefied，待解决
        library: 'SSR',
        libraryTarget: 'commonjs2',
        globalObject: "(typeof window !== 'undefined' ? window : global)"
    },
    mode: 'development',

    //optimization: {
        //minimizer: [
            //// safary10  bug，不然可以不用显示申明uglify
            ////https://hughfenghen.github.io/fe/bug1-safari10.html#%E7%AC%AC%E4%B8%89%E5%9B%9E%E5%90%88
            //new TerserPlugin({
                //cache: true,
                //parallel: true,
                //sourceMap: true, // Must be set to true if using source-maps in production
                //terserOptions: {
                    //// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    //safari10: true,
                //}
            //}),
            //new OptimizeCSSAssetsPlugin()
        //],
    //},
    //
    //
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    // Note the usage of `[\\/]` as a path separator for cross-platform compatibility.
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }
    },

    // source map must be need, because we uglify js, min css etc
    //devtool: 'source-map',

    stats: {
        // CopyWebpackPlugin 时， 日志输出太多，关闭它
        excludeAssets: new RegExp(`^${CONFIG.PUBLIC_FILE_NAME}`),
    },
    plugins:[
        // allowExternal must be true, or absolute path is as an out path of project,can not be removed
        new CleanWebpackPlugin([CONFIG.DIST_DIR], {allowExternal: true}),

        // copy PUBLIC_DIR to PUBLIC_DIST_DIR
        new CopyWebpackPlugin([{
                context: path.resolve(CONFIG.PUBLIC_DIR),
                from: '**/*',
                to: CONFIG.PUBLIC_DIST_DIR
            }],
            {copyunmodified: false}
        ),

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: `${CONFIG.CSS_DIR}/[name].[contenthash:8].css`,
            chunkFilename: `${CONFIG.CSS_DIR}/[id].[contenthash:8].css`,
        }),
        new StatsPlugin('stats.json', {
            chunks: true,
            chunkOrigins: true,
            entrypoints: true,

            // 以下为false 为了是json最小
            modules: false,
            chunkGroups: false,
            chunkModules: false,
            source: false,
            chunkRelations: false,
            warnings: false,
            usedExports: false,
            timings: false,
            reasons: false,
            providedExports: false,
            performance: false,
            moduleTrace: false,
            children: false,
            loggingTrace: false,
            depth: false,
            assets: false,
            logging: false,
        })
    ],

    module: {
        rules: [
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: `file?publicPath=${CONFIG.FONTS_PUBLIC_PATH}&name=${CONFIG.FONTS_DIR}/[name].[hash8].[ext]`
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: `url?publicPath=${CONFIG.IMGS_PUBLIC_PATH}&limit=1024&name=${CONFIG.IMGS_DIR}/[name].[hash:8].[ext]`
            },
            {
                test:  /^(?!.*?\.module).*\.css$/,
                use: [MiniCssExtractPluginLoader, 'css-loader']
            },
            {
                test:  /\.module\.css$/,
                use: [MiniCssExtractPluginLoader, moduleCssLoader]
            },

            {
                test: /^(?!.*?\.module).*\.less/,
                use: [MiniCssExtractPluginLoader, 'css-loader', 'less-loader?javascriptEnabled=true']
            },
            {
                test:  /\.module\.less$/,
                use: [MiniCssExtractPluginLoader, moduleCssLoader, 'less-loader?javascriptEnabled=true']
            },

            {
                test: /^(?!.*?\.module).*\.scss/,
                use: [MiniCssExtractPluginLoader, 'css-loader', 'sass-loader']
            },
            {
                test:  /\.module\.scss$/,
                use: [MiniCssExtractPluginLoader, moduleCssLoader, 'sass-loader']
            },
        ]
    },
}
