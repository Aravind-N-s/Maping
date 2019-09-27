import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://13.126.72.217:3000/api/v1'
})

export default axios
