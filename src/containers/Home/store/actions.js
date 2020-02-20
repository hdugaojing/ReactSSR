import axios from 'axios'
import { CHANGE_LIST } from './constants'
import clientAxios from '../../../client/request'
import serverAxios from '../../../server/request'

// actionCreator
const changeList = (list) => ({
    type: 'CHANGE_LIST',
    list
})

export const getHomeList = (server) => {
    // 返回一个promise
    // 浏览器运行：/api/news.json = http://localhost:3000/api/news.json
    // 服务器运行：/api/news.json = 服务器根目录/api/news.json-----访问不到!
    const request = server ? serverAxios : clientAxios
    return (dispatch) => {
        return request.get('/api/news.json').then(res => {
            const list = res.data.data
            dispatch(changeList(list))
        })
    }
}