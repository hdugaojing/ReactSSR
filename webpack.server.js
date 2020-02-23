const Path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
// 为了在node代码中引入node_modules里面的包
const nodeExternals = require('webpack-node-externals')

const serverConfig = {
    // 使用webpack打包服务器端的代码，服务器端和浏览器端的打包机制不同
    /**
     * 比如require('path')，浏览器端会把path全部打进去，而服务端则不会
     */
    target: 'node',
    // 设置编译环境
    mode: 'development',
    entry: './src/server/index.js',
    output: {
        filename: 'bundle.js',
        // __dirname为服务器根路径
        path: Path.resolve(__dirname,'build')
    },
    externals:[nodeExternals()],
    // 配置编译过程中的规则
    module: {
        rules: [{
            test: /\.css?$/,
            // 服务端渲染不能用style-loader
            use: ['isomorphic-style-loader', {
                loader:'css-loader',
                options: {
                    importLoaders: 1,
                    modules: {
                        localIdentName: "[name]-[local]-[hash:5]"
                    }
                }
            }]
        }]
    }
}
module.exports = merge(baseConfig, serverConfig)