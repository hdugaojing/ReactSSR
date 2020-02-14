import React from 'react'
import {renderToString} from 'react-dom/server'
// 服务端渲染路由需要使用StaticRouter
import {StaticRouter} from 'react-router-dom'
import Routes from '../Routes'
import getStore from '../store'
import {Provider} from 'react-redux'

export const render = (req) => {
    const content = renderToString((
        <Provider store={getStore()}>
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