import axios from 'axios'


axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.interceptors.request.use(

    config => {
        if(!localStorage.getItem('coffee-cafe-store')){
            return config
        }
        const {state:{token}} = JSON.parse(localStorage.getItem('coffee-cafe-store'))
  
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    error => {
        console.log(error,"AXIOS Error")
        return Promise.reject(error)
    }
)
// headers: { Authorization: Bearer ${getToken()} }


export default axios;