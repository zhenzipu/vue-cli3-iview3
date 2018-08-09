const API = {
    // 报表系统
    report: {
        coverage: '/v1.0/util_v3/device/monitor_info',
        util: '/v1.0/util_v3/device/util_distribution',
        util_v2: '/v1.0/util_v3/device/util_distribution_v2'
    },
    // 用户中心
    user: {
        check: '/api/sso/login',
        userLogout: '/api/loginout/',
        list: '/api/user/list',
        add: '/api/user/add',
        edit: '/api/user/edit',
        del: '/api/user/delete',
        opt: '/api/user/useropt',
        userinfo: '/api/user/userinfo'
    }
};

export default API;
