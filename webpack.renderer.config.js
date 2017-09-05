const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

var rendererConfig = {
    entry: path.resolve(__dirname + '/app/index/index.js'),
    // 输出配置
    output: {
        path: path.resolve(__dirname + '/output/static'),
        publicPath: 'static/',
        chunkFilename: '[id].[chunkhash].js',
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {
        loaders: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue-loader' // 不能直接用vue 应该用 vue-loader
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname + '/app/index/index.html'),
            inject: true
        })
    ]
}


module.exports = rendererConfig;