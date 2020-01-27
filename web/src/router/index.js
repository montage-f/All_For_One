import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@comp/common/Layout.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: {
            name: 'meter-graph',
        },
        name: 'layout',
        component: Layout,
        children: [
            {
                path: 'meter-graph',
                name: 'meter-graph',
                meta: {
                    title: '仪表盘',
                },
                component: () => import('@views/MeterGraph'),
            },
            {
                path: 'monitor-alarm',
                name: 'monitor-alarm',
                meta: {
                    title: '监控告警',
                },
                component: () => import('@views/MonitorAlarm'),
            },
            {
                path: 'system-manage',
                redirect: {
                    name: 'user-list',
                },
                name: 'system-manage',
                meta: {
                    title: '系统管理',
                },
                component: () => import('@comp/LeftNav'),
                children: [
                    {
                        path: 'user-list',
                        name: 'user-list',
                        meta: {
                            title: '用户列表',
                        },
                        component: () => import('@views/UserList'),
                    },
                    {
                        path: 'power-list',
                        name: 'power-list',
                        meta: {
                            title: '菜单列表',
                        },
                        component: () => import('@views/PowerList'),
                    },
                    {
                        path: 'role-list',
                        name: 'role-list',
                        meta: {
                            title: '角色列表',
                        },
                        component: () => import('@views/RoleList'),
                    },
                ],
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@views/Login'),
    },
    {
        path: '*',
        component: () => import('@views/404'),
    },
]

const router = new VueRouter({
    routes,
})

export default router
