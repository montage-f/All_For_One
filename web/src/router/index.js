import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: 'meter-graph',
        name: 'home',
        component: Home,
        children: [
            {
                path: 'meter-graph',
                name: 'meter-graph',
                component: () => import('../views/MeterGraph'),
            },
            {
                path: 'system-manage',
                name: 'system-manage',
                component: () => import('../views/SystemManage'),
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login'),
    },
]

const router = new VueRouter({
    routes,
})

export default router
