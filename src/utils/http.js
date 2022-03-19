import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage, ElLoading } from 'element-plus';

import axios from 'axios'

let loading = null

const service = axios.create({
  timeout: 5000,                                   //超时时间
  baseURL: '/api'             // 我们在请求接口的时候就不用写前面 会自动我们补全
  // transformRequest: data => qs.stringify(data)    //post请求参数处理,防止post请求跨域
})

const tokenStr = window.sessionStorage.getItem('Bearer ')
service.defaults.headers.Authorization = 'Bearer ' + tokenStr

// 在request拦截器中展示进度条
service.interceptors.request.use(config => {
  NProgress.start()
  loading = ElLoading.service({
    lock: true,
    text: 'Loading'
    // background: 'rgba(0, 0, 0, 0.7)'
  })
  if (!config.headers.Authorization) {
    console.log('添加了token')
    config.headers.Authorization = 'Bearer ' + tokenStr
  }
  return config
})

// 在response拦截器中关闭进度条
service.interceptors.response.use(config => {
  NProgress.done()
  if (config.data.code != 200) {
    ElMessage.error(config.data.message)
  }
  loading.close()
  return config
}, error => {
  loading.close()
  return ElMessage.error(error);
})

export default service
