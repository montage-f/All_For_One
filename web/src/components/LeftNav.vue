/**Created by MonTage_fz on 2020/1/9**/
<template>
    <div class="LeftNav">
        <div class="left">
            <el-menu
                class="LeftMenu"
                :default-active="activeIndex">
                <LeftMenuItem
                    v-for="(item,index) of leftMenuList"
                    v-bind="item"
                    :key="index"
                >
                </LeftMenuItem>
            </el-menu>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import LeftMenuItem from '@comp/common/LeftMenuItem'

    export default {
        name: 'LeftNav',
        components: {
            LeftMenuItem,
        },
        data() {
            return {}
        },
        created() {
        },
        computed: {
            ...mapState({
                menuList: (state) => state.menu.list,
            }),
            leftMenuList() {
                const { path } = this.$route
                return this.menuList.find((item) => path.includes(item.path)).children

            },
            activeIndex() {
                const { path } = this.$route
                return path
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

            .LeftMenu {
                border-right: 0;
            }
        }

        .content {
            flex: 1;
            padding: 20px;
            overflow: hidden;
        }
    }
</style>
