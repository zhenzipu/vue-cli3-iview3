<template>
    <div id="nav">
        <!-- <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> -->
        <sidebar-menu :menu-theme="theme" :menu-list="menuList" :open-names="openNames" @on-change="handleChange"></sidebar-menu>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import sidebarMenu from './main-components/sidebarMenu.vue';
export default {
    components: {
        sidebarMenu
    },
    data() {
        return {
            theme: 'primary',
            menuList: [
                {
                    title: '111',
                    path: '/home',
                    name: 'home',
                    icon: 'md-add',
                    children: [
                        {
                            title: '222',
                            path: '/home2',
                            name: 'about',
                            icon: 'md-add'
                        },
                        {
                            title: '555',
                            path: '/home5',
                            name: 'main',
                            icon: 'md-add'
                        }
                    ]
                }
            ],
            openNames: ['home']
        };
    },
    methods: {
        handleChange(name) {
            this.$router.push({
                name: name
            });
        }
    }
};
</script>