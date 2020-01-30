<template>
    <div class="layout">
        <TopNav></TopNav>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import TopNav from '@comp/common/TopNav'

    export default {
        name: 'layout',
        components: {
            TopNav,
        },
        data() {
            return {}
        },
        created() {
            this['menu/getList']()
        },
        methods: {
            ...mapActions([
                'menu/getList',
            ]),
        },
    }
</script>
<style scoped lang="less">
    .layout {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .content {
            flex: 1;
            overflow: hidden;
        }
    }
</style>
