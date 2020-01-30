import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@comp/common/Layout.vue'
import { storage } from '@plugin'
import store from '@store'

Vue.use(VueRouter)

const routes = [
    // 初始路由
    {
        path: '/login',
        name: 'login',
        component: () => import('@views/Login'),
    },
]

// 准备动态添加的路由
const asyncRouters = [
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
        path: '*',
        component: () => import('@views/404'),
    },
]
console.log(asyncRouters)
const router = new VueRouter({
    routes,
})

router.beforeEach((to, from, next) => {
    const userInfo = storage.get('userInfo')
    if (userInfo) {
        // 如果没有菜单列表, 那么就去请求
        if (!store.state.menu.list) {
            store.dispatch('menu/getList')
                .then(() => {
                    next({ path: to.path })
                })
        } else {
            if (to.path !== '/login') {
                next()
            } else {
                next(from.fullPath)
            }
        }
    } else {
        // 如果你没有登录, 而且输入的是/login那么这里会进入到死循环,
        // 所以我们需要判断一下, 在没有登陆的时候, 进入非登录页, 我们就需要跳转到登录页
        if (to.path !== '/login') {
            // 如果未登录直接去到登录页
            next({ name: 'login' })
        } else {
            next()
        }
        
    }
})
export default router
