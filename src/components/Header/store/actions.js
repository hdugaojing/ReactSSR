import {CHANGE_LOGIN} from './constants'

const changeLogin = (value) => ({
    type: CHANGE_LOGIN,
    value
})

export const login = () => {
    return (dispatch, getState, axiosInstance) => {
        // 登录
        return axiosInstance.get('/api/login.json').then(res => {
            dispatch(changeLogin(true))
        })
    }
}
export const logout = () => {
    return (dispatch, getState, axiosInstance) => {
        // 登出
        return axiosInstance.get('/api/logout.json').then(res => {
            dispatch(changeLogin(false))
        })
    }
}
export const getHeaderInfo = () => {
    return (dispatch, getState, axiosInstance) => {
        // 获取登录信息
        return axiosInstance.get('/api/isLogin.json').then(res => {
            dispatch(changeLogin(res.data.data.login))
        })
    }
}