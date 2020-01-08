/**Created by MonTage_fz on 2020/1/8**/
<template>
    <div class="SystemManage">
        <div class="left"></div>
        <div class="content"></div>
    </div>
</template>

<script>
    export default {
        name: 'SystemManage',
        components: {},
        data() {
            return {}
        },
        created() {
        },
        computed: {},
        methods: {},
    }
</script>

<style scoped lang="less">
    .SystemManage {
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
        }
    }
</style>
