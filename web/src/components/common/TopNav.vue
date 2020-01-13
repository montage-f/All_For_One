/**Created by MonTage_fz on 2020/1/13**/
<template>
    <div class="TopNav">
        <div class="logo"></div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item
                v-for="item of topMenu"
                :index="item.name"
                :key="item.name">
                <router-link
                    :to="{name:item.name}"
                    tag="div"
                >
                    {{ item.meta.title }}
                </router-link>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: 'TopNav',
        components: {},
        data() {
            return {}
        },
        created() {
        },
        computed: {
            topMenu() {
                const { options: { routes } } = this.$router
                const [firstRoutes] = routes
                return firstRoutes.children
            },
            activeIndex() {
                const { fullPath } = this.$route
                return fullPath.split('/')[1]
            },
        },
        methods: {
        },
    }
</script>

<style scoped lang="less">
    .TopNav {
        display: flex;
        height: 50px;

        .logo {
            width: 160px;
            background: url("../../assets/img/logo.gif") no-repeat;
            background-size: 100% 100%;
        }

        .el-menu {
            flex: 1;
            height: 100%;
            background: linear-gradient(120deg, #25aff3, #008ad3);

            .el-menu-item {
                height: 100%;
                line-height: 50px;
                border-bottom: 0;
                padding: 0;
                background: transparent;

                div {
                    padding: 0 20px;
                    color: #fff;
                }

                &:hover {
                    background-color: transparent;
                }

                &.is-active {
                    background: hsla(0, 0%, 100%, .13);
                    border-bottom: 0;
                }

            }
        }
    }
</style>
