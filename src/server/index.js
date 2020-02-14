// const express = require('express')
// const Home = require('./containers/Home/index')
// 用了webpack之后，可以使用es-module的方式引入
import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
// 服务端渲染路由需要使用StaticRouter
import {StaticRouter} from 'react-router-dom'
import Routes from '../Routes'

const app = express()
// 如果访问静态文件，比如<script src='/index.js'></script> 就去根目录的public下面去找
app.use(express.static('public'))

app.get('*', (req, res) => {
        const content = renderToString((
            // 服务端渲染需要获取浏览器的访问路径req.path
            <StaticRouter context={{}} location={req.path}>
                {Routes}
            </StaticRouter>
        ))
        // 把Home组件渲染成字符串返 回给浏览器
        res.send(`
            <html>
                <head>
                    <title>SSR</title>
                </head>
                <body>
                    <div id="root">${content}</div>
                </body>
                <script src='/index.js'></script>
            </html>
        `)
    }
)

app.listen(3000, () => console.log('Example app listening on port 3000!'))