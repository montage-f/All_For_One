/**Created by MonTage_fz on 2020/1/16**/
<template>
    <el-menu
        class="LeftMenu"
        default-active="1-1">
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
            </template>
            <el-menu-item index="1-1">
                <router-link :to="{name:'user-list'}" tag="div">用户列表</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
                <router-link :to="{name:'menu-list'}" tag="div">菜单列表</router-link>
            </el-menu-item>
            <el-menu-item index="1-3">
                <router-link :to="{name:'role-list'}" tag="div">角色列表</router-link>
            </el-menu-item>
        </el-submenu>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">系统监控</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: 'LeftMenu',
        components: {},
        props: {
            listInfo: Array,
        },
        data() {
            return {}
        },
        created() {
        },
        computed: {},
        methods: {},
    }
</script>

<style scoped lang="less">
    .LeftMenu {
    }
</style>
