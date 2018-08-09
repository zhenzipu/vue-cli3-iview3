import Cookies from 'js-cookie';
import API from '@/libs/API';
import axios from '../../axios/index';
import { Message } from 'iview';

const user = {
    state: {
        username: ''
    },
    mutations: {
        toSSO() {
            // 如果浏览器为ie时获得location
            if (!location.origin) {
                location.origin = location.protocol + '//' + location.hostname;
            }
            let returnUrl = location.origin;
            let url =
                `http://ssa.jd.com/sso/login?ReturnUrl=` +
                encodeURIComponent(returnUrl);
            location.href = url;
        },
        getUserInfo(state, data) {
            state.username = data.username;
        }
    },
    actions: {
        // 获取用户信息
        checkLogin(state) {
            axios
                .post(API.user.check, {
                    cookie: Cookies.get('sso.jd.com')
                })
                .then(res => {
                    let objData = res.data;
                    switch (objData.code) {
                        case 1000:
                            switch (objData.tokeninfo.mode) {
                                case 'test':
                                    Cookies.set(
                                        'test' + '.tco.jd.com',
                                        objData.tokeninfo.token
                                    );
                                    break;
                                case 'prod':
                                    Cookies.set(
                                        'prod' + '.tco.jd.com',
                                        objData.tokeninfo.token
                                    );
                                    break;

                                default:
                                    Cookies.set(
                                        'dev' + '.tco.jd.com',
                                        objData.tokeninfo.token
                                    );
                                    break;
                            }
                            state.commit('getUserInfo', objData.data);
                            break;

                        case 1005:
                            Message.error(objData.msg);
                            state.commit('toSSO');
                            break;

                        default:
                            break;
                    }
                });
        },

        // 登出
        userLoginout(state) {
            Cookies.remove('sso.jd.com');
            state.commit('toSSO');
        }
    }
};

export default user;
