<template>
    <div>
        <Menu mode="horizontal" theme="primary" active-name="home" @on-select="changeMenu">
            <template v-for="item in menuList">
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
                        <span class="layout-text" :key="'title' + child.name">{{ item.name }}</span>
                        </MenuItem>
                    </template>
                </Submenu>
            </template>
            <!-- <MenuItem name="home">
            <Icon type="ios-paper" /> 内容管理
            </MenuItem>
            <MenuItem name="main">
            <Icon type="ios-people" /> 用户管理
            </MenuItem>
            <Submenu name="about">
                <template slot="title">
                    <Icon type="ios-stats" /> 统计分析
                </template>
                <MenuGroup title="使用">
                    <MenuItem name="home">新增和启动</MenuItem>
                    <MenuItem name="about">活跃分析</MenuItem>
                    <MenuItem name="about">时段分析</MenuItem>
                </MenuGroup>
                <MenuGroup title="留存">
                    <MenuItem name="home">用户留存</MenuItem>
                    <MenuItem name="about">流失用户</MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem name="about">
            <Icon type="ios-construct" /> 综合设置
            </MenuItem> -->
        </Menu>
        <!-- <Menu ref="sideMenu" active-name="home" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu">
            <template v-for="item in menuList">
                <MenuItem v-if="item.children.length<=1" :name="item.children[0].name" :key="'menuitem' + item.name">
                <Icon :type="item.children[0].icon || item.icon" :size="iconSize" :key="'menuicon' + item.name"></Icon>
                <span class="layout-text" :key="'title' + item.name">{{ itemTitle(item.children[0]) }}</span>
                </MenuItem>

                <Submenu v-if="item.children.length > 1" :name="item.name" :key="item.name">
                    <template slot="title">
                        <Icon :type="item.icon" :size="iconSize"></Icon>
                        <span class="layout-text">{{ itemTitle(item) }}</span>
                    </template>
                    <template v-for="child in item.children">
                        <MenuItem :name="child.name" :key="'menuitem' + child.name">
                        <Icon :type="child.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
                        <span class="layout-text" :key="'title' + child.name">{{ itemTitle(child) }}</span>
                        </MenuItem>
                    </template>
                </Submenu>
            </template>
        </Menu> -->
    </div>
</template>

<script>
export default {
    name: 'sidebarMenu',
    props: {
        menuList: Array,
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'primary'
        },
        openNames: {
            type: Array
        }
    },
    methods: {
        changeMenu(active) {
            this.$emit('on-change', active);
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
