import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import axios from './axios/index';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;

Vue.use(iView);
new Vue({
    router,
    store,
    axios,
    render: h => h(App),
    mounted() {},
    created() {
        //
    }
}).$mount('#app');
