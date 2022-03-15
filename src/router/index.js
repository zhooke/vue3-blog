import { createRouter, createWebHashHistory } from 'vue-router'

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
        path: '/blog/edit',
        component: () => import('../components/markdown/Edit')
      },
      {
        path: '/blog/create',
        component: () => import('../components/markdown/Create')
      },
      {
        path: '/blog/draft',
        component: () => import('../components/blog/DraftList')
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
