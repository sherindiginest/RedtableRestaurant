import axios from 'axios'
import { store } from '../../App'
//import {apiConfig} from '../config/config';
const debug = false
const baseUrl = "http://ruchiappdemo.diginestsolutions.in/public/"
const apiUrl = `${baseUrl}api/`

const Axios = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
    },
    params: { country_code: store?.getState()?.ProfileReducer?.country || "SA" }
})
export default Axios

Axios.interceptors.request.use(
    config => {
        debug && console.log(config)
        config.params["country_code"] = store?.getState()?.ProfileReducer?.country || "SA"
        return config
    }, error => Promise.reject(error))
// Intercept all responses
Axios.interceptors.response.use(
    async response => {
        debug && console.log(response)
        return response.data
    },
    error => {
        //console.log("error inercefr ===>", JSON.stringify(error))
        return Promise.reject(error?.response?.data || error?.message)
    },
)