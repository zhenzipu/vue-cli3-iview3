import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/views/Main.vue';

Vue.use(Router);

const routers = [
    {
        path: '/',
        name: 'home',
        redirect: '/main',
        component: Main,
        children: [
            {
                path: 'home',
                title: { i18n: 'home' },
                name: 'home_index',
                component: () => import('@/views/Home.vue')
            }
        ]
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('@/views/Main.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About.vue')
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
