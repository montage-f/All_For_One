/**Created by MonTage_fz on 2020/1/9**/
<template>
    <div class="PowerList">
        <div class="table-header">
            <el-button type="primary" @click="onAddPower">新增</el-button>
        </div>
        <div class="table-content">
            <el-table
                :data="list"
                border
                row-key="powerId"
                :tree-props="{children: 'children'}"
            >
                <el-table-column
                    label="序号"
                    type="index"
                    width="50">
                </el-table-column>
                <TableColumn
                    v-for="(item,index) of tableColumnInfo"
                    v-bind="item"
                    :key="index"
                >

                </TableColumn>
                <el-table-column
                    label="操作"
                    width="150"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="onEmitPower(scope.row)">编辑</el-button>
                        <el-button type="text" @click="onDeletePower(scope.row)">删除</el-button>
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
                :total="count">
            </el-pagination>
        </div>

        <el-dialog :title="`${dialogTitle}权限`" :visible.sync="isAddPower" @close="isAddPower=false" width="30%">
            <el-form ref="powerForm" :model="powerForm" :rules="rules" label-position="left" label-width="100px">
                <el-form-item label="节点名称" prop="title">
                    <el-input v-model="powerForm.title" placeholder="请输入节点标题"></el-input>
                </el-form-item>
                <el-form-item label="上级节点" prop="upTitle">
                    <el-popover
                        placement="bottom"
                        width="350"
                        trigger="click"
                        :visible-arrow="false"
                    >
                        <el-input v-model="searchUpTitle"></el-input>
                        <el-tree
                            :data="list"
                            ref="tree"
                            node-key="powerId"
                            :props="defaultProps"
                            :filter-node-method="filterNode"
                            @node-click="handleNodeClick"
                        ></el-tree>
                        <el-input slot="reference"
                                  v-model="powerForm.upTitle"
                                  placeholder="请选择上级节点"
                        ></el-input>
                    </el-popover>
                </el-form-item>
                <el-form-item label="节点路由" prop="url">
                    <el-input v-model="powerForm.url" placeholder="请输入url"></el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button @click="isAddPower=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import TableColumn from '@comp/common/TableColumn'

    export default {
        name: 'MenuList',
        components: {
            TableColumn,
        },
        data() {
            return {
                tableColumnInfo: [
                    {
                        prop: 'title',
                        label: '标题',
                    },
                    {
                        prop: 'url',
                        label: 'url',
                    },
                    {
                        prop: 'createTime',
                        label: '创建时间',
                    },
                    {
                        prop: 'updateTime',
                        label: '更新时间',
                    },
                ],
                pageIndex: 1,
                pageSize: 10,
                powerForm: {
                    title: '',
                    url: '',
                    powerId: '',
                    upTitle: '',
                },
                searchUpTitle: '',
                rules: {
                    title: [
                        { required: true, message: '请输入权限标题', trigger: 'blur' },
                    ],
                },
                isAddPower: false,
                dialogTitle: '新增',
                defaultProps: {
                    children: 'children',
                    label: 'title',
                },
            }
        },
        created() {
            this['power/getList']({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
            })
        },
        watch: {
            isAddPower(isTrue) {
                if (!isTrue) {
                    this.powerForm = {
                        title: '',
                        url: '',
                        pId: '',
                        upTitle: '',
                    }
                    this.searchUpTitle = ''
                }
            },
            searchUpTitle(val) {
                this.$refs.tree.filter(val)
            },
        },
        computed: {
            ...mapGetters({
                list: 'power/list',
                count: 'power/count',
            }),
        },
        methods: {
            ...mapActions([
                'power/getList',
                'power/add',
                'power/update',
                'power/remove',
            ]),
            onAddPower() {
                this.dialogTitle = '新增'
                this.isAddPower = true
            },
            onEmitPower(row) {
                this.dialogTitle = '编辑'
                this.isAddPower = true
                this.powerForm = {
                    ...row,
                    upTitle: '',
                    pId: '',
                }
            },
            async onDeletePower(row) {
                if (await this.$confirm()) {
                    const { powerId } = row
                    const { msgCode, message } = await this['power/remove']({ powerId })
                    if (msgCode === 200) {
                        this.$message.success(message)
                        return
                    }
                    this.$message.error(message)
                }

            },
            async onSubmit() {
                let isTrue = await this.$formValidate('powerForm')
                if (isTrue) {
                    const obj = {
                        '新增': async () => await this['power/add'](this.powerForm),
                        '编辑': async () => await this['power/update'](this.powerForm),
                    }
                    const { msgCode, message } = await obj[this.dialogTitle]()
                    if (msgCode === 200) {
                        this.$message.success(message)
                        this.isAddPower = false
                        return
                    }
                    this.$message.error(message)
                } else {
                    this.$message.error('请完善表单信息')
                }
            },
            filterNode(value, data) {
                if (!value) return true
                return data.title.includes(value)
            },
            handleNodeClick(item) {
                const { powerId, title } = item
                this.powerForm.pId = powerId
                this.powerForm.upTitle = title
            },
            handleSizeChange(val) {
                this.pageSize = val
                this['power/getList']({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                })
            },
            handleCurrentChange(val) {
                this.pageIndex = val
                this['power/getList']({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                })
            },
        },
    }
</script>

<style scoped lang="less">
    @import "~@assets/css/tableCommon.less";

    .PowerList {
        width: 100%;
        height: 100%;
        .tableCommon();

        .el-dialog {
            .el-form-item:last-child {
                .flex();
            }
        }
    }
</style>
