/**Created by MonTage_fz on 2020/1/9**/
<template>
    <div class="RoleList">
        <div class="table-header">
            <el-button type="primary">新增</el-button>
        </div>
        <div class="table-content">
            <el-table
                :data="[]"
                border
            >
                <el-table-column
                    label="序号"
                    type="index"
                    width="50">
                </el-table-column>

                <TableColumn
                    v-for="(item,index) of roleListInfo"
                    :key="index"
                    v-bind="item"
                >
                </TableColumn>

                <el-table-column
                    label="操作"
                    width="150"
                >
                    <template>
                        <el-button type="text">编辑</el-button>
                        <el-button type="text">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="table-footer">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10,20,50,100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="roleCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import TableColumn from '@comp/common/TableColumn'

    export default {
        name: 'RoleList',
        components: {
            TableColumn,
        },
        data() {
            return {
                tableColumnInfo: [
                    {
                        label: '角色名称',
                        prop: 'roleName',
                    },
                    {
                        label: '备注',
                        prop: 'comment',
                    },
                    {
                        label: '创建时间',
                        prop: 'createTime',
                    },
                    {
                        label: '更新时间',
                        prop: 'updateTime',
                    },
                ],
            }
        },
        created() {
        },
        computed: {
            roleCount() {
                return 1
            },
        },
        methods: {
            handleSizeChange() {

            },
            handleCurrentChange() {

            },
        },
    }
</script>

<style scoped lang="less">
    @import '~@assets/css/tableCommon.less';

    .RoleList {
        width: 100%;
        height: 100%;
        .tableCommon();
    }
</style>
