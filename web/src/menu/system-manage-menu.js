/**
 * Created by MonTage_fz on 2020/1/14
 */
export default [
    {
        id: 1,
        parentId: 0,
        icon: 'el-icon-menu',
        title: '权限管理',
        pathName: 'system-manage',
        children: [
            {
                id: 2,
                parentId: 1,
                icon: 'el-icon-menu',
                title: '用户列表',
                pathName: 'user-list',
            },
            {
                id: 3,
                parentId: 1,
                icon: 'el-icon-menu',
                title: '菜单列表',
                pathName: 'menu-list',
            },
            {
                id: 4,
                parentId: 1,
                icon: 'el-icon-menu',
                title: '角色列表',
                pathName: 'role-list',
            },
        ],
    },
    {
        title: '系统监控',
    },
]
