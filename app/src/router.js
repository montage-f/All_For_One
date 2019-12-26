import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue'),
        },
    ],
})
