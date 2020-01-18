/**Created by MonTage_fz on 2020/1/7**/
<template>
    <div class="Login">
        <el-form ref="userInfo" :model="userInfo" :rules="rules">
            <el-form-item prop="username">
                <el-input v-model="userInfo.username" placeholder="请输入用户名">
                    <template slot="prepend">
                        <i class="icon el-icon-s-custom"></i>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="userInfo.password" type="password" placeholder="请输入密码">
                    <template slot="prepend">
                        <i class="icon el-icon-s-cooperation"></i>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="btn" @click="onLogin">L O G I N</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { formRules } from '@plugin'

    export default {
        name: 'Login',
        components: {},
        data() {
            return {
                userInfo: {
                    username: '',
                    password: '',
                },
                rules: {
                    ...formRules.user,
                },
            }
        },
        created() {
        },
        computed: {},
        methods: {
            ...mapActions([
                'user/login',
            ]),
            async onLogin() {
                let isValidate = await this.$formValidate('userInfo')
                if (isValidate) {
                    const { msgCode, message } = await this['user/login'](this.userInfo)
                    if (msgCode === 200) {
                        this.$message.success(message)
                        this.$router.push('/')
                    } else {
                        this.$message.error(message)
                    }
                }
            },
        },
    }
</script>

<style scoped lang="less">
    .Login {
        width: 100%;
        height: 100%;
        /*background: url("../assets/img/login.jpg") no-repeat;*/
        background-size: cover;
        position: relative;

        .el-form {
            width: 400px;
            position: absolute;
            left: 10%;
            bottom: 200px;

            .icon {
                font-size: 16px;
            }

            .btn {
                width: 100%;
            }
        }
    }
</style>
