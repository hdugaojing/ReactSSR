import axios from 'axios'
import { CHANGE_LIST } from './constants'

// actionCreator
const changeList = (list) => ({
    type: 'CHANGE_LIST',
    list
})

export const getHomeList = () => {
    // 返回一个promise
    // http://localhost:3000/api.json'
    return (dispatch) => {
        return axios.get('/api/news.json').then(res => {
            const list = res.data.data
            dispatch(changeList(list))
        })
    }
}