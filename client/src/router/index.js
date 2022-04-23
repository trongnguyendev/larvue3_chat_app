import { createWebHistory, createRouter } from 'vue-router'


import Home from '@/views/HomePage.vue'
import About from '@/views/AboutPage.vue'
import ProductList from '@/views/ProductList'
import ProductItem from '@/views/ProductItem'
import ProductItemPhone from '@/views/ProductItemPhone'
import ProductItemTv from '@/views/ProductItemTv'
import NotFound from '@/pages/error/NotFound'

import Auth from '@/components/layout/Auth'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import ResetPassword from '@/pages/auth/ResetPassword'

import Chat from '@/components/layout/Chat'

const routes = [

    {
        path: '/',
        name: 'auth',
        component: Auth,
        children: [
            {
                path: '/login',
                name: 'login',
                component: Login
            },
            {
                path: '/register',
                name: 'register',
                component: Register
            },
            {
                path: '/forgot-password',
                name: 'forgotPassword',
                component: ForgotPassword
            },
            {
                path: '/reset-password',
                name: 'resetPassword',
                component: ResetPassword
            }
        ]
    },
    {
        path: '/message',
        name: 'chat',
        component: Chat,
        meta: { requiresAuth: true }
    },

    // not found
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    // match url start with /user-
    // { path: '/user-:afterUser(.*)', component: UserGeneric },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: true
})

export default router