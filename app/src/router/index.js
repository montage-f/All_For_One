import Vue from 'vue'
import Router from 'vue-router'
import { storage } from '../config'
import { Toast } from 'vant'

import Login from '../views/Login'

Vue.use(Router)
const beforeEnter = (to, from, next) => {
    const { path: toPath } = to
    const token = storage.get('userInfo')
    if (toPath !== '/login' && token) {
        next()
    } else {
        next('/login')
    }
}
const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/',
            name: 'home',
            beforeEnter,
            component: () => import('../views/Home.vue'),
        },
        {
            path: '/photos',
            name: 'photos',
            beforeEnter,
            component: () => import('../views/Photos.vue'),
        },
        {
            path: '/about',
            name: 'about',
            beforeEnter,
            component: () => import('../views/About.vue'),
        },
    ],
})


export default router
