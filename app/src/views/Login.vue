/**Created by MonTage_fz on 2019/12/26**/
<template>
    <div class="Login">
        <div class="content">
            <Field v-model="username"
                   left-icon="contact"
                   placeholder="请输入用户名"
            ></Field>
            <Field v-model="password"
                   left-icon="goods-collect-o"
                   type="password"
                   placeholder="请输入密码"
            ></Field>
            <Button @click="login">L O G I N</Button>
        </div>
        <div class="footer">
            <Icon name="scan"></Icon>
            <Icon name="user-circle-o" @click="isShow=true"></Icon>
        </div>

        <Overlay :show="isShow" @click="isShow=false">
            <div class="content" @click.stop>
                <Field v-model="username"
                       left-icon="contact"
                       placeholder="请输入用户名"
                ></Field>
                <Field v-model="password"
                       left-icon="goods-collect-o"
                       type="password"
                       placeholder="请输入密码"
                ></Field>
                <Button @click="registerUser">R E G I S T E R</Button>
            </div>
        </Overlay>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import { Field, Button, Icon, Overlay, Toast } from 'vant'

    export default {
        name: 'Login',
        components: {
            Field,
            Button,
            Icon,
            Overlay,
        },
        data() {
            return {
                username: '',
                password: '',
                isShow: false,
            }
        },
        created() {
        },
        computed: {},
        methods: {
            ...mapMutations(
                [
                    'setUserInfo',
                ],
            ),
            // 注册用户
            async registerUser() {
                let { msgCode, message, data } = await this.$http.post('/user/register', {
                    username: this.username,
                    password: this.password,
                })
                if (msgCode === 200) {
                    Toast.success(message)
                    this.$storage.set('userInfo', data)
                    // 也将userInfo的信息, 放到状态管理里面
                    this.setUserInfo(data)
                    this.$router.push('/')
                }
                Toast.fail(message)
            },
            // 登录
            async login() {
                let { msgCode, message, data } = await this.$http.post('/user/login', {
                    username: this.username,
                    password: this.password,
                })
                if (msgCode === 200) {
                    Toast.success(message)
                    this.$storage.set('userInfo', data)
                    this.setUserInfo(data)
                    this.$router.push('/')
                }
                Toast.fail(message)
            },
        },
    }
</script>

<style scoped lang="less">
    .Login {
        width: 100%;
        height: 100%;
        background: url("../assets/img/login_bg.jpg");
        background-size: cover;
        display: flex;
        flex-direction: column;

        .content {
            padding: 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            opacity: 0.9;

            .van-field {
                margin-bottom: 10px;
                border-radius: 5px;
            }

            .van-button {
                width: 100%;
                border-radius: 5px;
            }
        }

        .van-overlay {

            .content {
                position: relative;
                top: 50%;
                transform: translateY(-50%-10px);

                .van-field {
                    margin-bottom: 10px;
                    border-radius: 5px;
                }

                .van-button {
                    width: 100%;
                    border-radius: 5px;
                }
            }


        }

        .footer {
            height: 30px;
            display: flex;
            justify-content: flex-end;
            padding: 0 20px;

            .van-icon {
                margin-left: 10px;
                line-height: 30px;
                font-size: 20px;
            }
        }
    }
</style>
