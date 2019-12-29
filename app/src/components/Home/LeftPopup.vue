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
            show-cancel-button>
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
    } from 'vant'

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
            // 关闭左侧侧滑
            closeLeftPopup() {
                this.$emit('changeShowLeftPopup', false)
                this.isAddAlbum = false
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
