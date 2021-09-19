import store from '@/store'
import moment from 'dayjs'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

const Reg = () => import('../views/Reg.vue')
const Index = () => import('../views/channels/index.vue')
const Template1 = () => import('../views/channels/template1.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        name: 'home',
        redirect: { name: 'index' }
      },
      {
        path: '/index',
        name: 'index',
        component: Index
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: Template1
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  if (token !== '' && token !== null) {
    // method 1
    // const payload = jwt.decode(token)
    // method 2
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (moment().isBefore(moment(payload.exp * 1000))) {
      // 取localStorage里面缓存的token信息 + 用户信息
      // 8-24小时， refresh token 1个月
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
      if (!store.state.ws) {
        store.commit('initWebSocket', {})
      }
    } else {
      localStorage.clear()
    }
  }
  // to and from are Route Object,next() must be called to resolve the hook
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isLogin: boolean = store.state.isLogin
    // 需要用户登录的页面进行区别
    if (isLogin) {
      // 已经登录的状态
      // 权限判断，meta元数据
      next()
    } else {
      // 未登录的状态
      next('/login')
    }
  } else {
    // 公共页面，不需要用户登录
    next()
  }
})

export default router
