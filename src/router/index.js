import { createRouter, createWebHashHistory } from 'vue-router'
import currentPlatform from '@/utils/platform.js'

// PC路由
const routesPC = [
  {
    path: '/',
    redirect: '/blog'
  },
  {
    path: '/blog',
    component: () => import('@/views/pc/Index.vue'),
    redirect: '/blog/list',
    children: [
      {
        path: '/blog/list',
        component: () => import('@/views/pc/blog/BlogList.vue')
      },
      {
        path: '/blog/read',
        component: () => import('@/views/pc/blog/Read.vue')
      },
      {
        path: '/blog/draft',
        component: () => import('@/views/pc/blog/DraftList.vue')
      },
      {
        path: '/blog/read/draft',
        component: () => import('@/views/pc/blog/ReadDraft.vue')
      },
      {
        path: '/other/Info',
        component: () => import('@/views/pc/other/Info.vue')
      },
      {
        path: '/other/donation',
        component: () => import('@/views/pc/other/Donation.vue')
      },
      {
        path: '/other/chatGPT',
        component: () => import('@/views/pc/other/ChatGPT.vue')
      },
      {
        path: '/other/statistic',
        component: () => import('@/views/pc/other/Statistic.vue')
      }
    ]
  },
  {
    path: '/publish',
    component: () => import('@/views/pc/blog/Publish.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('@/views/pc/blog/Edit.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pc/login/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/pc/home/Home.vue')
  }

]

// 移动端路由
const routesMobile = [
  {
    path: '/',
    redirect: '/mobile'
  },
  {
    path: '/mobile',
    component: () => import('@/views/mobile/Index.vue'),
    redirect: '/mobile/blog/list',
    children: [
      {
        path: '/mobile/blog/list',
        component: () => import('@/views/mobile/blog/BlogList.vue')
      },
      {
        path: '/mobile/blog/user',
        component: () => import('@/views/mobile/blog/UserInfo.vue')
      },
      {
        path: '/mobile/blog/hotspot',
        component: () => import('@/views/mobile/blog/Hotspot.vue')
      },
      {
        path: '/mobile/blog/draft',
        component: () => import('@/views/mobile/blog/Draft.vue')
      },
      {
        path: '/mobile/blog/read',
        component: () => import('@/views/mobile/blog/Blog.vue'),
      }
    ]
  }

]

let routes = []
if (currentPlatform === 'mobile') {
  routes = routesMobile
} else {
  routes = routesPC
}

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  mode: 'history'
})

const filterRouters = ['/login']
// 挂载路由守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
//  from 代表从哪个路径跳转而来
//  next是下一个函数，表示放行
//  next()放行，next('/login')强制跳转
  if (filterRouters.indexOf(to.path) === -1) return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('AccessToken')
  if (!tokenStr) return next('/login')
  next()
})
export default router
