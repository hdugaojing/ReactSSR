import React from 'react'
import {renderToString} from 'react-dom/server'
// 服务端渲染路由需要使用StaticRouter
import {StaticRouter, Route} from 'react-router-dom'
import {Provider} from 'react-redux'

export const render = (store, routes, req) => {
    const content = renderToString((
        <Provider store={store}>
            {/* 服务端渲染需要获取浏览器的访问路径req.path */}
            <StaticRouter context={{}} location={req.path}>
                {routes.map(route => (
                    <Route {...route}/>
                ))}
            </StaticRouter>
        </Provider>
        
    ))
    return(
        `
            <html>
                <head>
                    <title>SSR</title>
                </head>
                <body>
                    <div id="root">${content}</div>
                </body>
                <script>
                    // 数据注水
                    window.context = {
                        state: ${JSON.stringify(store.getState())}
                    }
                </script>
                <script src='/index.js'></script>
            </html>
        `
    )
}