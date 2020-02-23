import axios from 'axios'
import config from '../config'

const createInstance = (req) => axios.create({
    baseURL: 'http://localhost:3000/ssr',
    header:{
        cookie: req.get('cookie') || ''
    },
    params: {
        secret:config.secret
    }
})
export default createInstance