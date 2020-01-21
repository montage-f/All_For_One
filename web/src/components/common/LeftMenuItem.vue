/**Created by MonTage_fz on 2020/1/16**/
<template>
    <el-submenu index="1" v-if="children&&children.length">
        <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ title }}</span>
        </template>
        <LeftMenuItem
            v-for="(item,index) of children"
            v-bind="item"
            :key="index">
        </LeftMenuItem>
    </el-submenu>
    <el-menu-item
        v-else
        class="Item"
        :index="pathName">
        <router-link :to="{name:pathName}" tag="div" slot="title">
            <i :class="icon"></i>
            {{ title }}
        </router-link>
    </el-menu-item>
</template>

<script>
    export default {
        name: 'LeftMenuItem',
        components: {},
        props: {
            children: Array,
            title: String,
            pathName: String,
            icon: String,
        },
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
    .Item {
        &.el-menu-item {
            min-width: 0;
            padding: 0;
        }
    }
</style>
