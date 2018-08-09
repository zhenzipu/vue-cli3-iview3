import axios from 'axios';
import Vue from 'vue';
Vue.prototype.$axios = axios;
import { Message } from 'iview';
// 请求时拦截
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// 请求完成后拦截
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // 统一捕获错误
        if (error.response.status == 500) {
            Message.error('500啦，可能是后端的锅');
        } else if (error.response.status == 401) {
            Message.error('401啦，没权限，可能没登录');
        } else if (error.response.status == 404) {
            Message.error('404啦，没找到，可能是接口地址写错了');
        } else if (error.response.status == 400) {
            Message.error({
                content: error.response.data.message,
                duration: 3
            });
        }
        return Promise.resolve(error.response);
    }
);
export default axios;
