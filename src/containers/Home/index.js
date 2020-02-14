// node下需要使用require——commonjs规范
// const Reat = require('react')
import React from 'react';
import Header from '../../components/Header'
import {connect} from 'react-redux'

const Home = (props) => {
    return (
        <div>
            <Header/>
            <div>Home,this is {props.name}</div>
            {/* 
                renderToString只能渲染基础结构，无法渲染事件绑定————引入同构
                若想事件正常执行，Home组件的代码先在服务端执行一次，然后在客户端也要执行一次
             */}
            <button onClick={() => {alert('click')}}>
                Home
            </button>
        </div>
    )
}

// module.exports = {
//     default: Home
// }
const mapStateToProps = state => ({
    name: state.name
})
export default connect(mapStateToProps, null)(Home)