// const express = require('express')
// const Home = require('./containers/Home/index')
// 用了webpack之后，可以使用es-module的方式引入
import express from 'express'
import {render} from './utils'

const app = express()
// 如果访问静态文件，比如<script src='/index.js'></script> 就去根目录的public下面去找
app.use(express.static('public'))

app.get('*', (req, res) => {
        // 把Home组件渲染成字符串返 回给浏览器
        res.send(render(req))
    }
)

app.listen(3000, () => console.log('Example app listening on port 3000!'))