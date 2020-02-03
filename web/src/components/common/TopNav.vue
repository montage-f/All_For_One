/**Created by MonTage_fz on 2020/1/13**/
<template>
    <div class="TopNav">
        <div class="logo"></div>
        <div class="content">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <el-menu-item
                    v-for="item of menuList"
                    :index="item.path"
                    :key="item.path">
                    <router-link
                        :to="{path:item.path}"
                        tag="div"
                    >
                        {{ item.title }}
                    </router-link>
                </el-menu-item>
            </el-menu>
            <div class="user">
                <div class="user-img">
                    <img :src="userImg" alt="">
                </div>
                <div class="username">
                    {{ username }}
                </div>
                <div class="logOut" @click="logOut">
                    登出
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'TopNav',
        components: {},
        data() {
            return {}
        },
        created() {
        },
        computed: {
            ...mapState({
                menuList: (state) => state.menu.list,
            }),
            ...mapGetters({
                username: 'user/username',
                userImg: 'user/userImg',
            }),
            activeIndex() {
                const { fullPath } = this.$route
                if (fullPath.match(/\/.+\//)) {
                    return fullPath.match(/\/.+\//)[0].slice(0, -1)
                }
                return fullPath
            },
        },
        methods: {
            async logOut() {
                if (await this.$confirm('请确认是否登出?')) {
                    this.$storage.remove('userInfo')
                    this.$router.push('/login')
                }

            },
        },
    }
</script>

<style scoped lang="less">
    .TopNav {
        display: flex;
        height: 50px;
        background: linear-gradient(120deg, #25aff3, #008ad3);

        .logo {
            width: 160px;
            background: url("../../assets/img/logo.gif") no-repeat;
            background-size: 100% 100%;
        }

        .content {
            flex: 1;
            display: flex;
            justify-content: space-between;
            margin-right: 10px;

            .el-menu {
                flex: 1;
                height: 100%;
                background-color: transparent;

                .el-menu-item {
                    height: 100%;
                    line-height: 50px;
                    border-bottom: 0;
                    padding: 0;

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

            .user {
                color: #ffffff;
                line-height: 50px;
                display: flex;

                .user-img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 10px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .username {
                    flex: 1;
                    margin-right: 10px;
                }

                .logOut {
                    cursor: pointer;
                    width: 50px;
                    text-align: center;
                    font-size: 14px;

                    &:hover {
                        background: hsla(0, 0%, 100%, 0.13);
                    }
                }
            }
        }
    }
</style>
