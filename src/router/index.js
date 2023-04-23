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
        path: '/blog/read',
        component: () => import('../components/blog/Read')
      },
      {
        path: '/blog/draft',
        component: () => import('../components/blog/DraftList')
      },
      {
        path: '/blog/read/draft',
        component: () => import('../components/blog/ReadDraft')
      },
      {
        path: '/other/Info',
        component: () => import('../components/other/Info')
      },
      {
        path: '/other/donation',
        component: () => import('../components/other/Donation')
      },
      {
        path: '/other/chatGPT',
        component: () => import('../components/other/ChatGPT')
      }
    ]
  },
  {
    path: '/publish',
    component: () => import('../components/blog/Publish')
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../components/blog/Edit')
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

const filterRouters = ['/login', '/blog/list', '/blog/read', '/other/Info', '/other/donation', '/other/chatGPT']
// 挂载路由守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
//  from 代表从哪个路径跳转而来
//  next是下一个函数，表示放行
//  next()放行，next('/login')强制跳转
  if (filterRouters.indexOf(to.path) !== -1) return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('AccessToken')
  if (!tokenStr) return next('/login')
  next()
})
export default router
