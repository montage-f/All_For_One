/**Created by MonTage_fz on 2020/1/9**/
<template>
    <div class="RoleList">
        <div class="table-header">
            <el-button type="primary" @click="addRole">新增</el-button>
        </div>
        <div class="table-content">
            <el-table
                :data="list"
                border
            >
                <el-table-column
                    label="序号"
                    type="index"
                    width="50">
                </el-table-column>

                <TableColumn
                    v-for="(item,index) of tableColumnInfo"
                    :key="index"
                    v-bind="item"
                >
                </TableColumn>

                <el-table-column
                    label="操作"
                    width="150"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="onEdit(scope.row)">编辑</el-button>
                        <el-button type="text" @click="onDelete(scope.row)">删除</el-button>
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

        <el-dialog :title="`${dialogTitle}角色`" :visible.sync="dialogFormVisible" @close="dialogFormVisible=false">
            <el-form
                label-width="100px"
                ref="roleForm"
                :model="roleForm"
                :rules="rules"
            >
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model.trim="roleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model.trim="roleForm.remark"></el-input>
                </el-form-item>
                <el-form-item label="功能权限" prop="menuPower">
                    <el-input v-model.trim="searchPower" placeholder="输入关键字进行过滤"></el-input>
                    <div class="power-list">
                        <el-tree
                            :props="props"
                            :data="powerList"
                            ref="tree"
                            show-checkbox
                            :filter-node-method="filterNode"
                            @check-change="handleCheckChange">
                        </el-tree>

                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import TableColumn from '@comp/common/TableColumn'

    export default {
        name: 'RoleList',
        components: {
            TableColumn,
        },
        data() {
            return {
                dialogTitle: '',
                tableColumnInfo: [
                    {
                        label: '角色名称',
                        prop: 'name',
                    },
                    {
                        label: '备注',
                        prop: 'remark',
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
                dialogFormVisible: false,
                roleForm: {
                    name: '',
                    remark: '',
                    powerIds: [],
                },
                rules: {
                    name: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                        { min: 4, message: '长度不小于4个字符', trigger: 'blur' },
                    ],
                },
                pageSize: 10,
                pageIndex: 1,

                searchPower: '',
                props: {
                    label: 'title',
                    children: 'children',
                },
            }
        },
        created() {
            this['role/getList']()
            this['power/getList']()
        },
        computed: {
            ...mapGetters({
                count: 'role/count',
                list: 'role/list',
                powerList: 'power/list',
            }),
        },
        watch: {
            dialogFormVisible(isTrue) {
                if (!isTrue) {
                    this.roleForm = {
                        name: '',
                        remark: '',
                    }
                }
            },
            searchPower(val) {
                this.$refs.tree && this.$refs.tree.filter(val)
            },
        },
        methods: {
            ...mapActions([
                'role/add',
                'role/getList',
                'role/update',
                'role/remove',
                'power/getList',
            ]),
            addRole() {
                this.dialogTitle = '新增'
                this.dialogFormVisible = true
            },
            onEdit(row) {
                this.dialogTitle = '编辑'
                this.dialogFormVisible = true
                this.roleForm = {
                    ...row,
                }
            },
            async onDelete(row) {
                const { roleId } = row
                if (await this.$confirm()) {
                    let { msgCode, message } = await this['role/remove']({ roleId })
                    if (msgCode === 200) {
                        this.$message.success(message)
                        return
                    }
                    this.$message.error(message)
                }
            },
            async onSubmit() {
                if (await this.$formValidate('roleForm')) {
                    const obj = {
                        '新增': async () => await this['role/add'](this.roleForm),
                        '编辑': async () => await this['role/update'](this.roleForm),
                    }

                    const { msgCode, message } = await obj[this.dialogTitle]()
                    if (msgCode === 200) {
                        this.dialogFormVisible = false
                        this.$message.success(message)
                        return
                    }
                    this.$message.error(message)
                }
            },
            handleCheckChange() {
                const treeCheckNode = this.$refs.tree.getCheckedNodes()
                this.roleForm.powerIds = treeCheckNode.map(item => item.powerId)
            },
            filterNode(value, data) {
                if (!value) return true
                return data.title.includes(value)
            },
            handleSizeChange(val) {
                this.pageSize = val
                this['role/getList']({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                })
            },
            handleCurrentChange(val) {
                this.pageIndex = val
                this['role/getList']({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                })
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

        .el-dialog {
            .el-form-item {
                max-width: 400px;

                .power-list {
                    width: 100%;
                    border: 1px solid #DCDFE6;
                    border-radius: 4px;
                    height: 200px;
                    margin-top: 5px;
                    overflow-y: auto;
                }
            }
        }
    }
</style>
