/**Created by MonTage_fz on 2020/1/14**/
<template>
    <el-table-column
        class="TableColumn"
        :prop="prop"
        :label="label"
        :width="width"
    >
        <template slot-scope="scope">
            <slot :name="slotName" v-bind:row="scope.row">
                {{ scope.row[prop] }}
            </slot>
        </template>
    </el-table-column>
</template>

<script>
    export default {
        name: 'TableColumn',
        props: {
            prop: String,
            label: String,
            width: Number,
            slotName: String,
        },
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
    .TableColumn {
    }
</style>
