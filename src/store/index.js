import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {reducer as homeReducer} from '../containers/Home/store'

const reducer = combineReducers({
    home: homeReducer
})

/**
此处有一个坑：
    由于store是单例，服务端上只有一个store，所有的用户用的store都是同一个，显然不合理
    所以需要返回一个getStore函数，每个用户的store都是独立的
 */
const getStore = () => {
    return createStore(reducer, applyMiddleware(thunk))
}

export default getStore
