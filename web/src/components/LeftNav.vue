/**Created by MonTage_fz on 2020/1/9**/
<template>
    <div class="LeftNav">
        <div class="left">
            <LeftMenu
                :listInfo="SystemManageMenu"
            >

            </LeftMenu>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import LeftMenu from '@comp/common/LeftMenu'
    import SystemManageMenu from '@/menu/system-manage-menu'

    export default {
        name: 'LeftNav',
        components: {
            LeftMenu,
        },
        data() {
            return {
                SystemManageMenu,
            }
        },
        created() {
        },
        computed: {
            activeIndex() {
                console.log(this.$route)
                console.log(this.$router)
                return '1-1'
            },
        },
        methods: {},
    }
</script>

<style scoped lang="less">
    .LeftNav {
        width: 100%;
        height: 100%;
        display: flex;

        .left {
            width: 160px;
            border-right: 1px solid #ccc;
            box-sizing: border-box;
        }

        .content {
            flex: 1;
            padding: 20px;
            overflow: hidden;
        }
    }
</style>
