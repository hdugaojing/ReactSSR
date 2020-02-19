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
    const store = getStore()
    /**
        如果在这里，能拿到异步数据，并填充在store之中，可以解决服务端无法执行componentDidMount，导致无法渲染列表的问题
     */
    // 根据路由路径，往store里加载数据
    //const matchedRoutes = matchRoutes(routes, req.path)
    // 让matchRoutes里面所有组件对应的loadData方法执行一次
    // const promises = [];
    // matchedRoutes.forEach(item => {
    //     if(item.route.loadData){
    //         promises.push(item.route.loadData(store))
    //     }
    // })
    //Promise.all(promises).then(() => {
        // 把Home组件渲染成字符串返 回给浏览器
        res.send(render(store, routes, req))
    //})
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))