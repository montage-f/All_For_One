/**
 * Created by MonTage_fz on 2020/1/15
 */
// user验证
export const user = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, message: '长度不小于 5 个字符', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, message: '长度不小于 5 个字符', trigger: 'blur' },
    ],
}
