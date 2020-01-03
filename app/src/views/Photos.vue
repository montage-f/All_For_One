/**Created by MonTage_fz on 2019/12/30**/
<template>
    <div class="Photos">
        <div class="header">
            <span class="back" @click="$router.go(-1)">
                <Icon name="arrow-left"></Icon>
            </span>
            <div class="title" @click="isChangeAlbum('focus')">
                <span v-if="changeAlbum">{{ albumName }}</span>
                <Field
                    v-else
                    autofocus
                    @blur="isChangeAlbum('blur')"
                    v-model="albumValue" placeholder="请输入相册名"></Field>
            </div>

        </div>
        <div class="content">
            <div class="add-photo">
                <Uploader :after-read="afterRead" :before-read="beforeRead" :max-size="1024*1024"></Uploader>
            </div>
            <div class="item"
                 v-for="(item,index) of list"
                 :key="item.photoId"
                 @click="showPhotoImgSwipe(index)"
            >
                <div class="content">
                    <van-image
                        width="100%"
                        height="100%"
                        fit="contain"
                        :src="item.img">
                    </van-image>
                </div>
                <div class="footer" @click.stop="changePhotoName(item)">
                    {{ item.photoName }}
                </div>
            </div>
        </div>

        <van-dialog
            v-model="isShow"
            title="修改相片名称"
            show-cancel-button
            @confirm="confirm"
        >
            <Field v-model="photoName" placeholder="请输入相片名"></Field>
        </van-dialog>

        <Overlay :show="isShowPhotoImgSwipe" @click="isShowPhotoImgSwipe=false">
            <Swipe
                :autoplay="3000"
                :duration="1000"
                ref="swipe"
            >
                <SwipeItem
                    v-for="(item, index) in list"
                    :key="index"
                >
                    <van-image
                        @click.stop
                        width="100%"
                        height="100%"
                        fit="contain"
                        :src="item.img">
                    </van-image>
                </SwipeItem>
            </Swipe>
        </Overlay>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import {
        Icon, Uploader, Toast,
        Image, Field, Swipe,
        SwipeItem, Overlay,
    } from 'vant'


    export default {
        name: 'Photos',
        components: {
            Icon,
            Uploader,
            'van-image': Image,
            Field,
            Overlay,
            SwipeItem,
            Swipe,
        },
        data() {
            return {
                list: [],
                albumValue: '',
                changeAlbum: true,
                isShow: false,
                photoName: '',
                photoId: '',
                isShowPhotoImgSwipe: false,
            }
        },
        created() {
            this.initPhotos()
        },
        computed: {
            ...mapState({
                albumName: (state) => state.album.info.name,
                albumId(state) {
                    return state.album.info.albumId || this.$route.query.albumId
                },
            }),
        },
        methods: {
            ...mapMutations(
                [
                    'album/setInfo',
                ],
            ),
            async initPhotos() {
                let { msgCode, data } = await this.$http.get('/api/photos/list', {
                    params: {
                        albumId: this.albumId,
                        pageIndex: 1,
                        pageSize: 10,
                    },
                })
                if (msgCode === 200) {
                    const { list } = data
                    this.list = list
                }
            },
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
            async afterRead(file) {
                const formData = new FormData()
                for (const key in file) {
                    formData.append(key, file[key])
                }
                formData.append('albumId', this.albumId)
                const { msgCode, message } = await this.$http.post('/api/photos/add', formData)
                if (msgCode === 200) {
                    Toast.success(message)
                    this.initPhotos()
                } else {
                    Toast.fail(message)
                }
            },
            async isChangeAlbum(type) {
                switch (type) {
                    case 'focus': {
                        this.changeAlbum = false
                        this.albumValue = this.albumName
                        break
                    }
                    case 'blur': {
                        this.changeAlbum = true
                        if (this.albumValue) {
                            const { msgCode, message } = await this.$http.put('/api/album/update', {
                                albumId: this.albumId,
                                name: this.albumValue,
                            })
                            if (msgCode === 200) {
                                this['album/setInfo']({
                                    albumId: this.albumId,
                                    name: this.albumValue,
                                })
                                Toast.success(message)
                            } else {
                                Toast.fail(message)
                            }
                        }else{
                            Toast.fail('请输入相册名称!')
                        }

                        break
                    }
                }
            },
            changePhotoName(item) {
                const { photoName, photoId } = item
                this.isShow = true
                this.photoName = photoName
                this.photoId = photoId
            },
            async confirm() {
                const { msgCode, message } = await this.$http.put('/api/photos/update', {
                    photoId: this.photoId,
                    photoName: this.photoName,
                })
                if (msgCode === 200) {
                    Toast.success(message)
                    this.initPhotos()
                } else {
                    Toast.fail(message)
                }
            },
            showPhotoImgSwipe(index) {
                this.isShowPhotoImgSwipe = true
                // 因为在遮罩显示的时候, 是没有宽度的, 而轮波图需要计算宽度,
                // 所以需要等所有元素加载完成之后再重新计算一次, 所以使用nextTick
                // 来解决无法获取dom的问题
                this.$nextTick(() => {
                    this.$refs.swipe.resize()
                    this.$refs.swipe.swipeTo(index)
                })
            },
        },
    }
</script>

<style scoped lang="less">
    .Photos {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: url("../assets/img/photo-bg.jpg");
        background-size: cover;

        .header {
            display: flex;
            height: 50px;
            line-height: 50px;
            color: white;
            background: rgba(0, 0, 0, 0.8);

            .back {
                width: 30px;
            }

            .title {
                flex: 1;
                text-align: center;
            }
        }

        & > .content {
            flex: 1;
            display: flex;
            padding: 20px 20px;
            flex-wrap: wrap;
            justify-content: space-between;
            align-content: flex-start;
            overflow-y: auto;
            font-size: 12px;

            .add-photo {
                width: 160px;
                height: 180px;
                background: #fff;
                margin-bottom: 15px;
                border-radius: 5px;

                .van-uploader {
                    width: 100%;
                    height: 100%;

                    /deep/ .van-uploader__wrapper {
                        width: 100%;
                        height: 100%;

                        .van-uploader__upload {
                            width: 100%;
                            height: 100%;
                            margin: 0;

                            .van-icon {
                                font-size: 38px;
                            }

                        }
                    }
                }
            }

            @import "../assets/css/item";

            .item {
                .content {
                    overflow: hidden;
                }

                .footer {
                    justify-content: center;
                }
            }
        }

        .van-swipe {
            color: white;
            height: 80%;
            position: relative;
            top: 50%;
            transform: translateY(-50%);

            .van-swipe-item {
                background: #fff;
            }
        }
    }
</style>
