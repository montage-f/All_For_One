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
                <Uploader :after-read="afterRead" :max-size="1024*1024"></Uploader>
            </div>
            <div class="item"
                 v-for="item of list"
                 :key="item.photoId"
            >
                <div class="content">
                    <van-image
                        width="100%"
                        height="100%"
                        fit="contain"
                        :src="item.img">
                    </van-image>
                </div>
                <div class="footer" @click="changePhotoName(item)">
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
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import { Icon, Uploader, Toast, Image, Field } from 'vant'

    export default {
        name: 'Photos',
        components: {
            Icon,
            Uploader,
            'van-image': Image,
            Field,
        },
        data() {
            return {
                list: [],
                albumValue: '',
                changeAlbum: true,
                isShow: false,
                photoName: '',
                photoId: '',
            }
        },
        created() {
            this.initPhotos()
        },
        computed: {
            ...mapState({
                albumName: (state) => state.album.info.name,
                albumId: (state) => state.album.info.albumId,
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
                .content{
                    overflow: hidden;
                }
                .footer {
                    justify-content: center;
                }
            }
        }
    }
</style>
