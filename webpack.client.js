/**
 * 可户端代码打包，编译后放在静态资源目录public下
 */
const Path = require('path')
module.exports = {
    target: 'node',
    // 设置编译环境
    mode: 'development',
    entry: './src/client/index.js',
    output: {
        filename: 'index.js',
        // __dirname为服务器根路径
        path: Path.resolve(__dirname,'public')
    },
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