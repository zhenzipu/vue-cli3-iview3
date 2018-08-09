<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    data() {
        return {
            //
        };
    },
    created() {
        // 验证用户信息
        this.$store.dispatch('checkLogin');
    },
    mounted() {},
    beforeDestroy() {},
    methods: {}
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
}
</style>
