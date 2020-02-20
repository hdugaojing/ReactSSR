import axios from 'axios'
import { CHANGE_LIST } from './constants'

// actionCreator
const changeList = (list) => ({
    type: 'CHANGE_LIST',
    list
})

export const getHomeList = (server) => {
    // 返回一个promise
    // 浏览器运行：/api/news.json = http://localhost:3000/api/news.json
    // 服务器运行：/api/news.json = 服务器根目录/api/news.json
    let url = ''
    if(server){
        url = 'http://localhost:3000/ssr/api/news.json'
    }else{
        url = '/api/news.json'
    }

    return (dispatch) => {
        return axios.get(url).then(res => {
            const list = res.data.data
            dispatch(changeList(list))
        })
    }
}