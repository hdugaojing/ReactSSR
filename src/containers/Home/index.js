// node下需要使用require——commonjs规范
// const Reat = require('react')
import React from 'react';

const Home = () => {
    return (
        <div>
            <div>this is Colin</div>
            {/* 
                renderToString只能渲染基础结构，无法渲染事件绑定————引入同构
                若想事件正常执行，Home组件的代码先在服务端执行一次，然后在客户端也要执行一次
             */}
            <button onClick={() => {alert('click')}}>
                click
            </button>
        </div>
    )
}

// module.exports = {
//     default: Home
// }
export default Home