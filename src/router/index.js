import { createRouter, createWebHashHistory } from 'vue-router'
import axios from 'axios';
import NProgress from 'nprogress';

const routes = [
  {
    path: '/',
    redirect: '/blog'
  },
  {
    path: '/blog',
    component: () => import('../components/Index'),
    redirect: '/blog/list',
    children: [
      {
        path: '/blog/list',
        component: () => import('../components/blog/BlogList')
      },
      {
        path: '/blog/read',
        component: () => import('../components/markdown/Read')
      },
      {
        path: '/blog/draft',
        component: () => import('../components/blog/DraftList')
      }
    ]
  },
  {
    path: '/publish',
    component: () => import('../components/markdown/Publish')
  },
  {
    path: '/edit',
    component: () => import('../components/markdown/Edit')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login/Login')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/home/Home.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  mode: 'history'
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
  console.log('前置路由启用，token：',tokenStr)
  axios.interceptors.request.use(config => {
    NProgress.start()
    config.headers.Authorization = 'Bearer ' + tokenStr
    return config
  })
  next()
})
export default router
