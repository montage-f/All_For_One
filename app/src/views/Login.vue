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
                   placeholder="请输入密码"
            ></Field>
            <Button>L O G I N</Button>
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
                       placeholder="请输入密码"
                ></Field>
                <Button @click="registerUser">R E G I S T E R</Button>
            </div>
        </Overlay>
    </div>
</template>

<script>
    import { Field, Button, Icon, Overlay } from 'vant'

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
            // 注册用户
            async registerUser() {
                let { msgCode, message, data } = this.$http.post('/user/register', {
                    username: this.username,
                    password: this.password,
                })
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
            }
        }
    }
</style>
