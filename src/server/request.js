import axios from 'axios'

const createInstance = (req) => axios.create({
    baseURL: 'http://localhost:3000/ssr',
    header:{
        cookie: req.get('cookie') || ''
    }
})
export default createInstance