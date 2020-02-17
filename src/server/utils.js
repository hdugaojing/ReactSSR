import React from 'react'
import {renderToString} from 'react-dom/server'
// 服务端渲染路由需要使用StaticRouter
import {StaticRouter, Route, matchPath} from 'react-router-dom'
import {matchRoutes} from 'react-router-config'
import routes from '../Routes'
import getStore from '../store'
import {Provider} from 'react-redux'

export const render = (req) => {
    const store = getStore()
    /**
        如果在这里，能拿到异步数据，并填充在store之中，可以解决服务端无法执行componentDidMount，导致无法渲染列表的问题
     */
    const matchRoutes = [] 
    // 根据路由路径，往store里加载数据
    routes.some(route => {
        const match = matchPath(req.path, route)
        if(match){
            matchRoutes.push(route)
        }
    })
    // 让matchRoutes里面所有组件对应的loadData方法执行一次
    console.log(matchRoutes)

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