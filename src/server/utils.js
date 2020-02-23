import React from 'react'
import {renderToString} from 'react-dom/server'
// 服务端渲染路由需要使用StaticRouter
import {StaticRouter, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import {renderRoutes} from 'react-router-config'

export const render = (store, routes, req, context) => {
    const content = renderToString((
        <Provider store={store}>
            {/* 服务端渲染需要获取浏览器的访问路径req.path */}
            <StaticRouter context={context} location={req.path}>
                {renderRoutes(routes)}
            </StaticRouter>
        </Provider>
        
    ))
    const cssStr = context.css.length ? context.css.join('\n') : ''
    return(
        `
            <html>
                <head>
                    <title>SSR</title>
                    <style>${cssStr}</style>
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