import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import mavonEditor from 'mavon-editor'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import 'mavon-editor/dist/css/index.css'
import 'element-plus/dist/index.css'
import './assets/css/global.css'

import axios from 'axios'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(mavonEditor)
app.mount('#app')

/* 配置请求的根路径 */
axios.defaults.baseURL = '/api'
// 在request拦截器中展示进度条
axios.interceptors.request.use(config => {
  NProgress.start()
  return config
})
// 在response拦截器中关闭进度条
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

app.config.globalProperties.$http = axios
app.config.productionTip = false

// app.filter('dataFormat', function (originVal) {
//   const df = new Date(originVal)
//   const y = df.getFullYear()
//   const m = (df.getMonth() + 1 + '').padStart(2, '0')
//   const d = (df.getDay() + '').padStart(2, '0')
//   const hh = (df.getHours() + '').padStart(2, '0')
//   const mm = (df.getMinutes() + '').padStart(2, '0')
//   const ss = (df.getSeconds() + '').padStart(2, '0')
//   return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
// })
