/**Created by MonTage_fz on 2020/1/8**/
<template>
    <div class="SystemManage">
        <div class="left">
            <el-menu
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
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SystemManage',
        components: {},
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
    .SystemManage {
        width: 100%;
        height: 100%;
        display: flex;

        .left {
            width: 160px;
            border-right: 1px solid #ccc;
            box-sizing: border-box;
        }

        .content {
            flex: 1;
        }
    }
</style>
