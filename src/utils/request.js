import axios from 'axios';
import router from '../router'
//实例化请求对象
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
const req = axios.create({
    baseURL:'http://106.13.215.188:8089',
    // baseURL:'http://localhost:8089',
    // baseURL:'http://192.168.1.5:8089',
    // baseURL:'http://192.168.1.5:8089',

    timeout: 7000
})
//请求拦截器
req.interceptors.request.use(
    config => {
        // NProgress.start();
        return config;
    },
    error => {
        console.log('axios请求拦截器错误:' + error);
        pxmu.toast({
            msg: "请求超时,请检查网络", //内容 不能为空
            time: 5000, //停留时间 默认2500毫秒
            bg: 'rgba(0, 0, 0, 0.36)', //背景颜色 默认黑色
            color: '#fff', //文字颜色 默认白色
            location: 'center',//居中center 顶部top 底部bottom默认
            animation: 'slidedown', //显示的动画 默认fade 动画支持详见动画文档
            type: 'wap', //默认wap样式 可选参数：pc 入参pc时
            status: '', //可选参数 success成功 warn警告 error错误 仅在type=pc时候生效，wap时可通过自定义bg、color改变样式
        });
        return Promise.reject(error);
    }
)

//响应拦截器
req.interceptors.response.use(
    response => {
        // NProgress.done();
        return response.data;
    },
    error => {
        console.log('axios响应拦截器错误:' + error);
        pxmu.toast({
            msg: "请求超时,请检查网络", //内容 不能为空
            time: 5000, //停留时间 默认2500毫秒
            bg: 'rgba(0, 0, 0, 0.36)', //背景颜色 默认黑色
            color: '#fff', //文字颜色 默认白色
            location: 'center',//居中center 顶部top 底部bottom默认
            animation: 'slidedown', //显示的动画 默认fade 动画支持详见动画文档
            type: 'wap', //默认wap样式 可选参数：pc 入参pc时
            status: '', //可选参数 success成功 warn警告 error错误 仅在type=pc时候生效，wap时可通过自定义bg、color改变样式
        });
        return Promise.reject(error);
    }
)
export default req;