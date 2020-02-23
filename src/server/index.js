// const express = require('express')
// const Home = require('./containers/Home/index')
// 用了webpack之后，可以使用es-module的方式引入
import express from 'express'
import proxy from 'express-http-proxy'
import {matchRoutes} from 'react-router-config'
import routes from '../Routes'
import {render} from './utils'
import {getStore} from '../store'

const app = express()
// 如果访问静态文件，比如<script src='/index.js'></script> 就去根目录的public下面去找
app.use(express.static('public'))

// 当服务器请求的是/api开头的请求时，做一层代理，转到java server，这里因为木有，还是用localhost:3000模拟
app.use('/api',proxy('http://localhost:3000', {
    proxyReqPathResolver: function (req) {
      return '/ssr/api' + req.url;
    }
  }));
  // req.url: news.json 

app.get('*', (req, res) => {
    const store = getStore(req)
    /**
        如果在这里，能拿到异步数据，并填充在store之中，可以解决服务端无法执行componentDidMount，导致无法渲染列表的问题
     */
    // 根据路由路径，往store里加载数据
    const matchedRoutes = matchRoutes(routes, req.path)
    // 让matchRoutes里面所有组件对应的loadData方法执行一次
    const promises = [];
    matchedRoutes.forEach(item => {
        if(item.route.loadData){
            const promise = new Promise((resolve, reject) => {
                // 确保Promise.all(promises).then会执行
                item.route.loadData(store).then(resolve).catch(resolve)
            })
            promises.push(promise)
        }
    })
    // 这里的Promise永远会正确执行then，哪怕有数据获取失败，也会加载获取数据成功的组件
    Promise.all(promises).then(() => {
        const context = {};
        const html = render(store, routes, req, context)
        
        // StaticRouter发现组件有Redirect（Translation组件），会在context中注入相关信息
        if(context.action === 'REPLACE'){
            // 服务端重定向
            res.redirect(301,context.url)
        }else if (context.NOT_FOUND){
            res.status(404)
            res.send(html)
        }else{
            // 把Home组件渲染成字符串返 回给浏览器
            res.send(html)
        }
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))