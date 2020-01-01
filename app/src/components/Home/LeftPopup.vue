/**Created by montage_fz on 2019-12-28**/
<template>
    <div class="LeftPopup">
        <Popup
            v-model="showLeft"
            position="left"
            :style="{ height: '100%'}"
            @close="closeLeftPopup"
        >
            <div class="left-popup">
                <Sidebar v-model="activeKey">
                    <SidebarItem
                        title="添加相册"
                        @click="isAddAlbum=true"
                    />
                    <SidebarItem
                        title="退出登录"
                        @click="isLogOut=true"
                    />
                </Sidebar>
            </div>
        </Popup>

        <van-dialog
            v-model="isAddAlbum"
            :overlay="false"
            title="添加相册"
            show-cancel-button
            @confirm="confirmAlbum">
            <Field
                v-model="albumName"
                autofocus
                placeholder="请输入相册名称">
            </Field>
        </van-dialog>

        <van-dialog
            v-model="isLogOut"
            :overlay="false"
            title="退出登录"
            show-cancel-button
            @confirm="confirmLogOut">
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
                isLogOut: false,
                showLeft: false,
            }
        },
        watch: {
            showLeftPopup(value) {
                this.showLeft = value
            },
        },
        methods: {
            ...mapActions([
                'album/getAlbums',
            ]),
            // 关闭左侧侧滑
            closeLeftPopup() {
                this.$emit('changeShowLeftPopup', false)
                this.isAddAlbum = false
                this.isLogOut = false
                this.albumName = ''
            },
            async confirmAlbum() {
                const { msgCode, message } = await this.$http.post('/api/album/add', {
                    name: this.albumName,
                })
                if (msgCode === 200) {
                    Toast.success(message)
                    this.closeLeftPopup()
                    this['album/getAlbums']({ pageIndex: 1 })
                } else {
                    Toast.fail(message)
                }
            },
            confirmLogOut() {
                this.$storage.remove('userInfo')
                this.$router.push('/login')
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
