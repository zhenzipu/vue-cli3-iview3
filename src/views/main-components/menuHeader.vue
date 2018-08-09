<style>
.layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    margin-right: 50px;
}
.layout-logo img {
    width: 100px;
    height: 30px;
}
.layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>

<template>
    <div>
        <Menu mode="horizontal" theme="dark" active-name="home" @on-select="changeMenu">
            <div class="layout-logo">
                <img src="../../assets/jd-logo-white.png" alt="">
            </div>
            <template class="layout-nav" v-for="item in menuList">
                <MenuItem v-if="item.children.length<=1" :name="item.children[0].name" :key="'menuitem' + item.name">
                <Icon :type="item.children[0].icon || item.icon" :size="iconSize" :key="'menuicon' + item.name"></Icon>
                {{ item.children[0].name}}
                </MenuItem>
                <Submenu v-if="item.children.length > 1" :name="item.name" :key="item.name">
                    <template slot="title">
                        <Icon :type="item.icon" :size="iconSize"></Icon>
                        <span class="layout-text">{{item.name}}</span>
                    </template>
                    <template v-for="child in item.children">
                        <MenuItem :name="child.name" :key="'menuitem' + child.name">
                        <Icon :type="child.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
                        <span class="layout-text" :key="'title' + child.name">{{ child.title }}</span>
                        </MenuItem>
                    </template>
                </Submenu>
            </template>
            <div class="user-dropdown-menu-con">
                <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                    <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                        <a href="javascript:void(0)">
                            <span class="main-user-name">{{ this.$store.state.user.username }}</span>
                            <Icon type="ios-arrow-down" />
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="userCenter">个人中心</DropdownItem>
                            <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Avatar style="background-color: #87d068;margin-left: 10px;" icon="ios-person" />
                </Row>
            </div>
        </Menu>
    </div>
</template>

<script>
export default {
    name: 'menuHeader',
    props: {
        menuList: Array,
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'dark'
        },
        openNames: {
            type: Array
        },
        userName: String
    },
    methods: {
        changeMenu(active) {
            this.$emit('on-change', active);
        },
        handleClickUserDropdown(name) {
            if (name === 'userCenter') {
                this.$router.push({
                    name: 'userCenter'
                });
            } else if (name === 'loginout') {
                // 退出登录
                this.$store.dispatch('userLoginout');
            }
        }
    },
    updated() {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateOpened();
            }
        });
    }
};
</script>
