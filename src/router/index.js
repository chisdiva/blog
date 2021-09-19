import Vue from 'vue'
import VueRouter from 'vue-router'

const Manager = () => import('../components/views/Manager')
const Home = () => import('../components/views/Home')
const ShowArticle = () => import('../components/views/ShowArticle')
const Edit = () => import('../components/Edit')
const Login = () =>import('../components/views/Login')
Vue.use(VueRouter)

const routes = [
    {
        path: '',
        redirect: '/blog'
    },
    {
        path: '/blog',
        name: 'blog',
        component: Home
    },
    {
        path: '/essay',
        name: 'essay',
        component: Home
    },
    {
        path: '/collect',
        name: 'collect',
        component: Home
    },
    {
        path: '/article/:category/:id',
        component: ShowArticle
    },
    {
        path: '/manager',
        component: Manager
    },
    {
        //传入类别和id
        path: '/edit/:category/:id',
        name: 'edit',
        component: Edit
    },
    {
        //登陆界面
        path: '/login',
        component: Login
    }

]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router