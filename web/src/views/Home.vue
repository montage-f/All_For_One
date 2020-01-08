<template>
    <div class="home">
        <div class="header">
            <div class="title"></div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">
                    <router-link :to="{name:'meter-graph'}" tag="div">仪表盘</router-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <router-link :to="{name:'system-manage'}" tag="div">系统管理</router-link>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        components: {},
        data() {
            return {
                activeIndex: '1',
            }
        },
        methods: {
            handleSelect() {
            },
        },
    }
</script>
<style scoped lang="less">
    .home {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .header {
            display: flex;
            height: 50px;

            .title {
                width: 160px;
                background: url("../assets/img/logo.gif") no-repeat;
                background-size: 100% 100%;
            }

            .el-menu {
                flex: 1;
                height: 100%;
                background: linear-gradient(120deg, #25aff3, #008ad3);

                .el-menu-item {
                    height: 100%;
                    line-height: 50px;
                    color: white;
                    border-bottom: 0;
                    background: transparent;
                    padding: 0;

                    div {
                        padding: 0 20px;
                    }

                    &.is-active {
                        background: hsla(0, 0%, 100%, .13);
                        border-bottom: 0;
                    }

                }
            }
        }

        .content {
            flex: 1;
        }
    }
</style>
