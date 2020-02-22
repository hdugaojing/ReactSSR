import { CHANGE_LIST } from './constants'

// actionCreator
const changeList = (list) => ({
    type: 'CHANGE_LIST',
    list
})

export const getHomeList = () => {
    // 返回一个promise
    // 浏览器运行：/api/news.json = http://localhost:3000/api/news.json
    // 服务器运行：/api/news.json = 服务器根目录/api/news.json-----访问不到!
    // thunk.withExtraArgument
    return (dispatch, getState, axiosInstance) => {
        return axiosInstance.get('/api/news.json').then(res => {
            const list = res.data.data
            dispatch(changeList(list))
        })
    }
}