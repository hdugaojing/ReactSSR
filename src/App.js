import React from 'react';
import Header from './components/Header/'
import {renderRoutes} from 'react-router-config'
import {actions} from './components/Header/store'

const App = (props) => {
    return (
        <div>
            <Header/>
            {renderRoutes(props.route.routes)}
        </div>
    )
}
// 服务端渲染加载用户登录信息
// 这里的数据不需要客户端再准备一次了:
// Header只加载一次，不会出现之前先加载login后加载home需要home进行客户端渲染的情况
App.loadData = (store) => {
    return store.dispatch(actions.getHeaderInfo());
}

export default App