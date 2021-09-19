import axios from "axios";
import router from "@/router";

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://110.42.141.74:7866',
        timeout: 2000
    })
    instance.interceptors.request.use(res => {
        let url = res.url;
        //判断是否为manager页面
        if(router.currentRoute.path.split('/').pop() === 'manager') {
            let token = localStorage.getItem('token')
            console.log(token)
            if(token) {
                res.headers['Access-Token'] = token
                console.log(res)
            }
        }
        return res
    }, err => {
        console.log(err)
        return err
    })
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err)
    })
    return instance(config)
}