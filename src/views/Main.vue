<style>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-footer-center {
    text-align: center;
}
</style>

<template>
    <div class="layout">
        <Layout>
            <Header>
                <menu-header :userName="userName" :menu-theme="theme" :menu-list="menuList" :open-names="openNames" @on-change="handleChange"></menu-header>
            </Header>
            <Content :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '20px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb>
                <router-view></router-view>
            </Content>
            <Footer class="layout-footer-center">2018-2019 &copy; JDCloud</Footer>
        </Layout>
    </div>
</template>
<script>
import menuHeader from './main-components/menuHeader.vue';
export default {
    components: {
        menuHeader
    },
    data() {
        return {
            userName: 'test',
            theme: 'dark',
            menuList: [
                {
                    name: '主菜单',
                    icon: 'ios-paper',
                    children: [
                        {
                            title: '首页',
                            path: '/home',
                            name: 'home',
                            icon: 'ios-people'
                        },
                        {
                            title: '关于',
                            path: '/about',
                            name: 'about',
                            icon: 'ios-stats'
                        }
                    ]
                },
                {
                    name: '报表系统',
                    icon: 'ios-construct',
                    children: [
                        {
                            title: '覆盖率',
                            path: '/coverage',
                            name: 'coverage',
                            icon: 'ios-analytics'
                        },
                        {
                            title: '报表',
                            path: '/report',
                            name: 'report',
                            icon: 'ios-filing'
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