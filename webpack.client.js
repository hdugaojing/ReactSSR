/**
 * 可户端代码打包，编译后放在静态资源目录public下
 */
const Path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const clientConfig = {
    target: 'node',
    // 设置编译环境
    mode: 'development',
    entry: './src/client/index.js',
    output: {
        filename: 'index.js',
        // __dirname为服务器根路径
        path: Path.resolve(__dirname,'public')
    }
}
module.exports = merge(baseConfig, clientConfig)