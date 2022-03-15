import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: () => import('../components/Index'),
    redirect: '/list',
    children: [
      {
        path: '/list',
        component: () => import('../components/index/ContextList')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login/Login')
  },
  {
    path: '/mavon',
    name: 'Mavon',
    component: () => import(/* webpackChunkName: "mavon" */ '../components/markdown/Mavon.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/home/Home.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 挂载路由守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
//  from 代表从哪个路径跳转而来
//  next是下一个函数，表示放行
//  next()放行，next('/login')强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('Bearer ')
  if (!tokenStr) return next('/login')
  // if (tokenStr !== token) return next('/login')
  next()
})
export default router
