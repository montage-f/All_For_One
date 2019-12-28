<template>
    <div class="Home">
        <div class="header">
            <div class="left-info">
                <Icon name="bars" @click="showLeftPopup=true"></Icon>
            </div>
            <Uploader
                :max-count="1"
                :before-read="beforeRead"
                :after-read="afterRead"
            >
                <VanImage
                    v-if="userInfo.img"
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
            <div class="album-count">
                共10个相册
            </div>
            <div class="album-list">
                <List
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                    <div class="album-item"
                         v-for="item in list"
                         :key="item">
                        <div class="content">

                        </div>
                        <div class="footer">
                            <span class="album-name">
                                生活
                            </span>
                            <span class="photo-count">
                                90
                            </span>
                        </div>
                    </div>
                </List>
            </div>
        </div>
        <LeftPopup
            :showLeftPopup="showLeftPopup"
            @changeShowLeftPopup="changeShowLeftPopup"
        ></LeftPopup>
    </div>
</template>
<script>
    // @ is an alias to /src
    import { mapState, mapActions } from 'vuex'
    import LeftPopup from '@/components/Home/LeftPopup'
    import {
        Image, Uploader,
        Toast, List,
        Icon,
    } from 'vant'

    export default {
        name: 'Home',
        components: {
            // 这里因为Image无法被编译, 所以重新给命名
            'VanImage': Image,
            Uploader,
            List,
            Icon,
            LeftPopup,
        },
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                showLeftPopup: false,
            }
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
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        this.list.push(this.list.length + 1)
                    }
                    // 加载状态结束
                    this.loading = false

                    // 数据全部加载完成
                    if (this.list.length >= 40) {
                        this.finished = true
                    }
                }, 500)
            },
            changeShowLeftPopup(isShow) {
                this.showLeftPopup = isShow
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
        background: url("../assets/img/home-bg.jpg");
        background-size: cover;

        .header {
            height: 40%;
            overflow: hidden;
            background-size: cover;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            position: relative;

            .left-info {
                position: absolute;
                left: 10px;
                top: 10px;
            }

            .van-image {
                margin-bottom: 20px;
            }
        }

        .content {
            flex: 1;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            overflow: auto;

            .album-count {
                padding: 0 20px;
                text-align: right;
                color: white;
            }

            .album-list {
                flex: 1;
                overflow: auto;

                .van-list {
                    display: flex;
                    padding: 0 20px;
                    flex-wrap: wrap;
                    justify-content: space-between;

                    .album-item {
                        width: 160px;
                        height: 180px;
                        background: #fff;
                        margin-bottom: 15px;
                        border-radius: 5px;
                        display: flex;
                        flex-direction: column;

                        .content {
                            flex: 1;
                        }

                        .footer {
                            height: 20px;
                            padding: 0 10px;
                            border-top: 1px solid #ccc;
                            box-sizing: border-box;
                            line-height: 20px;
                            display: flex;
                            justify-content: space-between;
                        }
                    }

                    /deep/ .van-list__finished-text {
                        background: #fff;
                        width: 100%;
                    }


                }
            }
        }

    }
</style>

