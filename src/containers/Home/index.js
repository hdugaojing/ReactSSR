// node下需要使用require——commonjs规范
// const Reat = require('react')
import React from 'react';
import Header from '../../components/Header'
import {connect} from 'react-redux'
import {getHomeList} from './store/actions'

class Home extends React.Component {
    // 服务端渲染不会执行componentDidMount
    componentDidMount(){
        this.props.getHomeList()
    }
    // getList(){
    //     const {list} = this.props
    //     return list.map((item) => {
    //         <div key={item.id}>{item.title}</div>
    //     })
    // }
    render(){
        return (
            <div>
                <Header/>
                <div>Home</div>
                {/* 
                    renderToString只能渲染基础结构，无法渲染事件绑定————引入同构
                    若想事件正常执行，Home组件的代码先在服务端执行一次，然后在客户端也要执行一次
                 */}
                <button onClick={() => {alert('click')}}>
                    Home
                </button>
                {
                    this.props.list.map((item) => {
                        return <div key={item.id}>{item.title}</div>
                    })
                }
            </div>
        )
    }
}

Home.loadData = (store) => {
    // 这个函数负责在服务端渲染之前，把这个组件需要的数据提前加载好
    return store.dispatch(getHomeList())
}

// module.exports = {
//     default: Home
// }
const mapStateToProps = state => ({
    list: state.home.list
})

const mapDispatchToProps = dispatch => ({
    getHomeList(){
        dispatch(getHomeList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)