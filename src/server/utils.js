import React from 'react'
import {renderToString} from 'react-dom/server'
// 服务端渲染路由需要使用StaticRouter
import {StaticRouter} from 'react-router-dom'
import Routes from '../Routes'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

export const render = (req) => {
    const reducer = (state = {name:'colin'}, action) => {
        return state
    }
    const store = createStore(reducer, applyMiddleware(thunk))
    const content = renderToString((
        <Provider store={store}>
            {/* 服务端渲染需要获取浏览器的访问路径req.path */}
            <StaticRouter context={{}} location={req.path}>
                {Routes}
            </StaticRouter>
        </Provider>
        
    ))
    return (
        `
            <html>
                <head>
                    <title>SSR</title>
                </head>
                <body>
                    <div id="root">${content}</div>
                </body>
                <script src='/index.js'></script>
            </html>
        `
    )
}