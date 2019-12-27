<template>
    <div class="Home">
        <div class="header">
            <Uploader
                :max-count="1"
                :before-read="beforeRead"
                :after-read="afterRead"
            >
                <VanImage
                    round
                    width="100px"
                    height="100px"
                    :src="userInfo.img"
                ></VanImage>
            </Uploader>
            <div class="user">
                {{ userInfo.username }}
            </div>
        </div>
        <div class="content">
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import { mapState, mapActions } from 'vuex'
    import { Image, Uploader, Toast } from 'vant'

    export default {
        name: 'Home',
        components: {
            // 这里因为Image无法被编译, 所以重新给命名
            'VanImage': Image,
            Uploader,
        },
        data() {
            return {}
        },
        computed: {
            ...mapState({
                userInfo: (state) => state.userInfo,
            }),
        },
        methods: {
            ...mapActions([
                'getUserInfo',
            ]),
            // 上传文件校验
            beforeRead(file) {
                const { type } = file
                if (!['image/png', 'image/jpeg'].includes(type)) {
                    Toast.fail('只允许上传图片!')
                    return false
                }
                return true
            },
            // 上传文件
            async afterRead(file) {
                const form = new FormData()
                for (const key in file) {
                    form.append(key, file[key])
                }
                let { msgCode, message } = await this.$http.post('/upload/img', form)
                if (msgCode === 200) {
                    Toast.success(message)
                    this.getUserInfo()
                } else {
                    Toast.fail(message)
                }
            },
        },
    }
</script>
<style lang="less" scoped>
    .Home {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .header {
            height: 40%;
            overflow: hidden;
            background: url("../assets/img/home-bg.jpg");
            background-size: cover;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            .van-image {
                margin-bottom: 20px;
            }
        }

        .content {
            flex: 1;
        }

    }
</style>
