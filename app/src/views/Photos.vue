/**Created by MonTage_fz on 2019/12/30**/
<template>
    <div class="Photos">
        <div class="header">
            <span class="back" @click="$router.go(-1)">
                <Icon name="arrow-left"></Icon>
            </span>
            <span class="title"> {{ photoName }}</span>
        </div>
        <div class="content">
            <div class="add-photo">
                <Uploader></Uploader>
            </div>
            <div class="item">

            </div>
        </div>
    </div>
</template>

<script>
    import { Icon, Uploader } from 'vant'

    export default {
        name: 'Photos',
        components: {
            Icon,
            Uploader,
        },
        data() {
            return {}
        },
        created() {
        },
        computed: {
            photoName() {
                return this.$route.query.name
            },
        },
        methods: {},
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

        .content {
            flex: 1;
            display: flex;
            padding: 20px 20px;
            flex-wrap: wrap;
            justify-content: space-between;

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
        }
    }
</style>
