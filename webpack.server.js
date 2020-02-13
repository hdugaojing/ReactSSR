const Path = require('path')
// 为了在node代码中引入node_modules里面的包
const nodeExternals = require('webpack-node-externals')

module.exports = {
    // 使用webpack打包服务器端的代码，服务器端和浏览器端的打包机制不同
    /**
     * 比如require('path')，浏览器端会把path全部打进去，而服务端则不会
     */
    target: 'node',
    // 设置编译环境
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        // __dirname为服务器根路径
        path: Path.resolve(__dirname,'build')
    },
    externals:[nodeExternals()],
    // 配置编译过程中的规则
    module: {
        rules: [{
            test: /\.js?$/,
            loader:'babel-loader',
            // 排除node_modules下的js文件
            exclude: /node_modules/,
            options: {
                // 配置编译规则，需要配合安装babel-preset-react(支持react语法),babel-preset-stage-0(支持一些新的语法) babel-preset-env
                presets:['react', 'stage-0', ['env', {
                    targets: {
                        // 打包的时候，babel会兼容目前所有主流浏览器的最新两个版本
                        browsers: ['last 2 versions']
                    }
                }]]
            }
        }]
    }
}