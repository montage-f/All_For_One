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
                共{{ albumsCount }}个相册
            </div>
            <div class="album-list">
                <List
                    v-model="loading"
                    :finished="finished"
                    :immediate-check="false"
                    :offset="10"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                    <div class="item"
                         v-for="(item,index) in list"
                         :key="index"
                         @click="showPhotos(item)"
                         @touchstart="deleteAlbum(item.albumId)"
                         @touchend="cancelDeleteAlbum(item.albumId)"
                    >
                        <div class="content">
                            <VanImage
                                :src="item.img"
                                width="100%"
                                height="100%"
                            ></VanImage>
                        </div>
                        <div class="footer">
                            <span class="album-name">
                                {{ item.name }}
                            </span>
                            <span class="photo-count">
                                {{ item.photoCount }}
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
    import { mapState, mapActions, mapMutations } from 'vuex'
    import LeftPopup from '@/components/Home/LeftPopup'
    import {
        Image, Uploader,
        Toast, List,
        Icon, Dialog,
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
                pageIndex: 1,
                timer: null,
            }
        },
        created() {
            this.init()
            this.getUserInfo()
        },
        computed: {
            ...mapState({
                userInfo: (state) => state.userInfo,
                albumsList: (state) => state.album.albumsInfo.list,
                albumsCount: (state) => state.album.albumsInfo.count,
            }),
        },
        watch: {
            albumsCount() {
                this.init()
            },
        },
        methods: {
            ...mapActions([
                'getUserInfo',
                'album/getAlbums',
            ]),
            ...mapMutations([
                'album/setInfo',
            ]),
            async init() {
                // 当有相册的时候, 初始化初始数据
                this.list = []
                this.pageIndex = 1
                this.finished = false
                await this.onLoad()
            },
            // 上传文件校验
            beforeRead(file) {
                const { size, type } = file
                if (!['image/png', 'image/jpeg'].includes(type)) {
                    Toast.fail('只允许上传图片!')
                    return false
                }

                if (size > 500 * 1024) {
                    Toast.fail('上传文件的大小应在1M以内!')
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
                let { msgCode, message } = await this.$http.post('/api/upload/img', form)
                if (msgCode === 200) {
                    Toast.success(message)
                    this.getUserInfo()
                } else {
                    Toast.fail(message)
                }
            },
            async onLoad() {
                this.loading = true
                await this['album/getAlbums']({ pageIndex: this.pageIndex })
                this.list = []
                this.loading = false
                for (let i of this.albumsList) {
                    this.list.push(i)
                }
                this.pageIndex++
                if (this.list.length >= this.albumsCount) {
                    this.finished = true
                }
            },
            changeShowLeftPopup(isShow) {
                this.showLeftPopup = isShow
            },
            deleteAlbum(albumId) {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    Dialog.confirm({
                        title: '是否删除该相册?',
                        // 确认
                    }).then(async () => {
                        const { msgCode, message } = await this.$http.delete('/api/album/delete', { data: { albumId } })
                        if (msgCode === 200) {
                            Toast.success(message)
                            this['album/getAlbums']({ pageIndex: 1, pageSize: 10 })
                        } else {
                            Toast.fail(message)
                        }
                    }).catch(() => {

                    })
                }, 1500)
            },
            cancelDeleteAlbum() {
                clearTimeout(this.timer)
            },
            showPhotos(albumInfo) {
                const { albumId } = albumInfo
                this.$router.push({
                    path: '/photos',
                    query: {
                        albumId,
                    },
                })
                this['album/setInfo'](albumInfo)
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

                    // 在这里引入, 解析之后即是在.van-list下面的item
                    @import "../assets/css/item";

                    /deep/ .van-list__finished-text {
                        background: #fff;
                        width: 100%;
                    }
                }
            }
        }

    }
</style>

