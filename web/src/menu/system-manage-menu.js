/**
 * Created by MonTage_fz on 2020/1/14
 */
export default [
    {
        meta: {
            title: '系统管理',
        },
        children: [
            {
                meta: {
                    title: '权限管理',
                },
                children: [
                    {
                        path: 'user-list',
                        name: 'user-list',
                        meta: {
                            title: '用户列表',
                        },
                        component: '@views/UserList',
                    },
                    {
                        path: 'menu-list',
                        name: 'menu-list',
                        meta: {
                            title: '菜单列表',
                        },
                        component: '@views/UserList',
                    },
                    {
                        path: 'role-list',
                        name: 'role-list',
                        meta: {
                            title: '角色列表',
                        },
                        component: '@views/RoleList',
                    },
                ],
            },
        ],
    },
]
