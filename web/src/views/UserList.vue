/**Created by MonTage_fz on 2020/1/9**/
<template>
    <div class="UserList">
        <div class="table-header">
            <el-button type="primary" @click="onAddUser">新增</el-button>
        </div>
        <div class="table-content">
            <el-table
                :data="userList"
                height="100%"
                border
            >
                <TableColumn
                    v-for="(item,index) of tableColumnInfo"
                    v-bind="item"
                    :key="index"
                >
                    <template v-slot:img="{row}" v-if="item.slotName">
                        <div>
                            <img :src="row.img" alt="" width="50px" height="50px" style="border-radius:50%;"
                                 v-if="row.img">
                        </div>
                    </template>

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
                    label="操作"
                    width="150"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="onEmitUser(scope.row)">编辑</el-button>
                        <el-button type="text" @click="onDeleteUser(scope.row)">删除</el-button>
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
                :total="userCount">
            </el-pagination>
        </div>

        <el-dialog title="新增用户" :visible.sync="isAddUser" width="30%">
            <el-form ref="userForm" :model="userForm" :rules="rules" label-position="left" label-width="100px">
                <el-form-item label="用户头像" prop="img">
                    <el-upload
                        ref="upload"
                        class="avatar-uploader"
                        action="/api/web/user/addImg"
                        :headers="{token}"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="userForm.img" :src="userForm.img" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password" type="password" placeholder="请输入用户密码"></el-input>
                </el-form-item>
                <el-form-item label="所属角色" prop="roleIds">
                    <el-select v-model="userForm.roleIds" multiple placeholder="请选择角色">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="管理员" prop="isAdmin">
                    <el-select v-model="userForm.isAdmin" placeholder="是否拥有管理员权限">
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button @click="isAddUser=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import { formRules } from '@plugin'
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
                        prop: 'name',
                        label: '姓名',
                    },
                    {
                        prop: 'img',
                        label: '用户头像',
                        slotName: 'img',
                    },
                    {
                        prop: 'isAdmin',
                        label: '管理员',
                        // 给需要自定义的模板添加插槽
                        slotName: 'isAdmin',
                    },
                    {
                        prop: 'userRole',
                        label: '用户角色',
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
                isAddUser: false,
                userForm: {
                    username: '',
                    password: '',
                    roleIds: [],
                    isAdmin: 0,
                    img: '',
                },
                rules: {
                    ...formRules.user,
                    img: [
                        { required: true, message: '请上传图片', trigger: 'blur' },
                    ],
                },
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
            token() {
                const { token } = this.$storage.get('userInfo')
                return token
            },
        },
        methods: {
            ...mapActions([
                'user/getList',
                'user/addUser',
            ]),
            async onSubmit() {
                let isValidate = await this.$formValidate('userForm')
                if (!isValidate) return
                const { msgCode, message } = await this['user/addUser'](this.userForm)
                if (msgCode === 200) {
                    this.isAddUser = false
                    this.$message.success(message)
                    return
                }
                this.$message.error(message)
            },
            onEmitUser(row) {
                console.log(row)
            },
            onDeleteUser(row) {
                console.log(row)
            },
            onAddUser() {
                this.isAddUser = true
                this.$formReset('userForm')
            },

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
            handleAvatarSuccess(response) {
                const { msgCode, message, data } = response
                if (msgCode === 200) {
                    const { img } = data
                    this.userForm.img = img
                    this.$message.success(message)
                } else if (msgCode === 404) {
                    this.$router.push('/login')
                }
            },
            // 图像上传之前校验
            beforeAvatarUpload(file) {
                const isJPG = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(file.type);
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 .png, .jpeg, .jpg, .gif 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },

        },
    }
</script>

<style scoped lang="less">
    .flex {
        display: flex;
        justify-content: flex-end;
    }

    .UserList {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .table-header {
            .flex();
            height: 32px;
            margin-bottom: 10px;
        }

        .table-content {
            flex: 1;
        }

        .table-footer {
            .flex();
            height: 32px;
            margin-top: 10px;
        }

        .el-dialog {
            .el-form-item {
                &:last-child {
                    .flex();
                }
            }

            .avatar-uploader {
                /deep/ .el-upload {
                    border: 1px dashed #d9d9d9;
                    border-radius: 6px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;

                    &:hover {
                        border-color: #409EFF;
                    }
                }

                .avatar-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 100px;
                    height: 100px;
                    line-height: 100px;
                    text-align: center;
                }

                .avatar {
                    width: 100px;
                    height: 100px;
                    display: block;
                }
            }
        }
    }
</style>
