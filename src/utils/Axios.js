import axios from 'axios'

const token = localStorage.getItem('token')

const Axios = axios.create({
    baseURL: 'http://192.168.10.176:4000',
    timeout: 5000
})

// request interceptor
Axios.interceptors.request.use(
    config => {
        config.url = config.baseURL + config.url
        if (token) config.headers['authorization'] = token
        if (config.data) {
            // config.data = qs.stringify(config.data)
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default Axios
