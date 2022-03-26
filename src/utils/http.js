import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElLoading, ElMessage } from 'element-plus';

import axios from 'axios'

let loading = null

const service = axios.create({
  timeout: 5000,                                   //超时时间
  baseURL: '/api'             // 我们在请求接口的时候就不用写前面 会自动我们补全
  // transformRequest: data => qs.stringify(data)    //post请求参数处理,防止post请求跨域
})

const tokenStr = window.sessionStorage.getItem('Bearer ')
if (tokenStr !== null) {
  service.defaults.headers.Authorization = 'Bearer ' + tokenStr
}

// 在request拦截器中展示进度条
service.interceptors.request.use(config => {
  NProgress.start()
  loading = ElLoading.service({
    lock: true,
    text: 'Loading'
    // background: 'rgba(0, 0, 0, 0.7)'
  })
  if (!config.headers.Authorization && tokenStr !== null) {
    console.log('添加了token')
    config.headers.Authorization = 'Bearer ' + tokenStr
  }
  return config
})

// 在response拦截器中关闭进度条
service.interceptors.response.use(config => {
  NProgress.done()
  if (config.data.code != 200) {
    ElMessage.error(config.data.msg)
  }
  loading.close()
  return config
}, error => {
  const res = error.response.data
  console.log(error.response.data)
  if (res.code === 400) {
    return ElMessage.error('客户端错误');
  } else if (res.code === 403) {
    return ElMessage.error('客户端错误');
  } else if (res.code === 404) {
    return ElMessage.error('网络请求不存在');
  } else if (res.code === 500) {
    return ElMessage.error(res.msg);
  }
  return ElMessage.error('服务器正在开小差');
})

export default service
