/**Created by MonTage_fz on 2020/1/9**/
<template>
    <div class="UserList">
        <el-table
            :data="userList"
            border
        >
            <TableColumn
                v-for="(item,index) of tableColumnInfo"
                v-bind="item"
                :key="index"
            >
                <template v-slot:isAdmin="{row}" v-if="item.slotName">
                    {{ row.isAdmin?'是':'否' }}
                </template>

                <template v-slot:createTime="{row}" v-if="item.slotName">
                    {{ $formatTime(row.createTime) }}
                </template>

                <template v-slot:updateTime="{row}" v-if="item.slotName">
                    {{ $formatTime(row.updateTime) }}
                </template>
            </TableColumn>
            <el-table-column
                label="操作">
            </el-table-column>
        </el-table>
        <div class="table-footer">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10,20,50,100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="userCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import TableColumn from '@comp/common/TableColumn'

    export default {
        name: 'UserList',
        components: {
            TableColumn,
        },
        data() {
            return {
                tableData: [],
                tableColumnInfo: [
                    {
                        prop: 'username',
                        label: '用户名',
                    },
                    {
                        prop: 'img',
                        label: '用户头像',
                    },
                    {
                        prop: 'isAdmin',
                        label: '管理员',
                        // 给需要自定义的模板添加插槽
                        slotName: 'isAdmin',
                    },
                    {
                        prop: 'createTime',
                        label: '创建时间',
                        slotName: 'createTime',
                    },
                    {
                        prop: 'updateTime',
                        label: '更新时间',
                        slotName: 'updateTime',
                    },
                ],
                pageIndex: 1,
                pageSize: 10,
            }
        },
        created() {
            this['user/getList']({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
            })
        },
        computed: {
            ...mapState({
                userListInfo: (state) => state.user.userListInfo,
            }),
            userList() {
                return this.userListInfo.list
            },
            userCount() {
                return this.userListInfo.count
            },
        },
        methods: {
            ...mapActions([
                'user/getList',
            ]),
            handleSizeChange(val) {
                this.pageSize = val
                this['user/getList']({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                })
            },
            handleCurrentChange(val) {
                this.pageIndex = val
                this['user/getList']({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                })
            },
        },
    }
</script>

<style scoped lang="less">
    .UserList {
        .table-footer {
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;
        }
    }
</style>
