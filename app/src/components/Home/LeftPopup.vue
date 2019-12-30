/**Created by montage_fz on 2019-12-28**/
<template>
    <div class="LeftPopup">
        <Popup
            v-model="showLeftPopup"
            position="left"
            :style="{ height: '100%'}"
            @close="closeLeftPopup"
        >
            <div class="left-popup">
                <Sidebar v-model="activeKey">
                    <SidebarItem
                        title="添加相册"
                        @click="isAddAlbum=true" />
                </Sidebar>
            </div>
        </Popup>
        <van-dialog
            v-model="isAddAlbum"
            :overlay="false"
            title="添加相册"
            show-cancel-button
            @confirm="confirm">
            <Field v-model="albumName" placeholder="请输入相册名称"></Field>
        </van-dialog>
    </div>
</template>

<script>
    import {
        Popup,
        Sidebar,
        SidebarItem,
        Field,
        Toast,
    } from 'vant'
    import { mapActions } from 'vuex'

    export default {
        name: 'LeftPopup',
        props: {
            showLeftPopup: {
                type: Boolean,
            },
        },
        components: {
            Popup,
            Sidebar,
            SidebarItem,
            Field,
        },
        data() {
            return {
                activeKey: 0,
                isAddAlbum: false,
                albumName: '',
            }
        },
        created() {
        },
        methods: {
            ...mapActions([
                'album/getAlbums',
            ]),
            // 关闭左侧侧滑
            closeLeftPopup() {
                this.$emit('changeShowLeftPopup', false)
                this.isAddAlbum = false
                this.albumName = ''
            },
            async confirm() {
                const { msgCode, message } = await this.$http.post('/album/add', {
                    name: this.albumName,
                })
                if (msgCode === 200) {
                    Toast.success(message)
                    this.closeLeftPopup()
                    this['album/getAlbums']({ page: 1 })
                } else {
                    Toast.fail(message)
                }
            },
        },
    }
</script>

<style scoped lang="less">
    .LeftPopup {
        .van-dialog {
            left: 61%;
            width: 265px;
        }
    }
</style>
