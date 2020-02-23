import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {reducer as headerReducer} from '../components/Header/store'
import {reducer as homeReducer} from '../containers/Home/store'
import {reducer as translationReducer} from '../containers/Translation/store'
import clientAxios from '../client/request'
import serverAxios from '../server/request'

const reducer = combineReducers({
    home: homeReducer,
    header: headerReducer,
    translation: translationReducer
})

/**
此处有一个坑：
    由于store是单例，服务端上只有一个store，所有的用户用的store都是同一个，显然不合理
    所以需要返回一个getStore函数，每个用户的store都是独立的
 */
export const getStore = (req) => {
    // 改变服务端的store内容，一定要使用serverAxios
    return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios(req))))
}

export const getClientStore = () => {
    const defaultState = window.context.state
    // 改变客户端的store内容，一定要使用clientAxios
    // 将服务端渲染数据的结果作为客户端渲染数据的默认值——数据脱水
    return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}
