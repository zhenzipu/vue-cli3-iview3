import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/views/Main.vue';

Vue.use(Router);

const routers = [
    {
        path: '/',
        name: 'index',
        redirect: '/main',
        component: Main,
        children: [
            {
                path: '/main',
                name: 'home',
                component: () => import('@/views/home/Home.vue')
            },
            {
                path: '/about',
                name: 'about',
                component: () => import('@/views/about/About.vue')
            },
            {
                path: '/coverage',
                name: 'coverage',
                component: () => import('@/views/report/coverage.vue')
            },
            {
                path: '/report',
                name: 'report',
                component: () => import('@/views/report/report.vue')
            },
            {
                path: '/userCenter',
                name: 'userCenter',
                component: () => import('@/views/userCenter/userCenter.vue')
            }
        ]
    },
    {
        path: '/403',
        name: 'error-403',
        component: () => import('@/views/error-page/403.vue')
    },
    {
        path: '/404',
        name: 'error-404',
        component: () => import('@/views/error-page/404.vue')
    },
    {
        path: '/500',
        name: 'error-500',
        component: () => import('@/views/error-page/500.vue')
    }
];
const RouterConfig = {
    routes: routers
};
const router = new Router(RouterConfig);
export default router;
// router.beforeEach((to, from, next) => {
//     console.log('to', to);
//     console.log('from', from);
//     console.log('next', next);
// });

// router.afterEach(to => {
//     console.log('to', to);
// });
