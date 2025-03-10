import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {ElLoading, ElMessage} from 'element-plus';

import axios from 'axios'

let loading = null

const service = axios.create({
  timeout: 10000,                                   //超时时间
  baseURL: '/api'             // 我们在请求接口的时候就不用写前面 会自动我们补全
  // transformRequest: data => qs.stringify(data)    //post请求参数处理,防止post请求跨域
})

const tokenStr = window.sessionStorage.getItem('AccessToken')
const AccessTokenKey = window.sessionStorage.getItem('AccessTokenKey')
if (tokenStr !== null) {
  service.defaults.headers.Authorization = 'Bearer ' + tokenStr
  service.defaults.headers.AccessTokenKey = AccessTokenKey
}

// 在request拦截器中展示进度条
service.interceptors.request.use(config => {
  NProgress.start()
  loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  if (!config.headers.Authorization && tokenStr !== null) {
    config.headers.Authorization = 'Bearer ' + tokenStr
    config.headers.AccessTokenKey = AccessTokenKey
  }
  return config
})

// 在response拦截器中关闭进度条
service.interceptors.response.use(config => {
  NProgress.done()
  loading.close()
  if (config.data.code !== 200) {
    return ElMessage.error(config.data.message)
  }
  return config
}, error => {
  NProgress.done()
  const res = error.response.data
  let msg = error.response.message
  console.log(error.response.data)
  loading.close()
  if (res.code === 400) {
    return ElMessage.error('客户端错误');
  } else if (res.code === 401) {
    window.sessionStorage.clear()
    location.reload()
    ElMessage.error('请重新登陆')
    return Promise.reject(new Error(msg));
  } else if (res.code === 403) {
    ElMessage.error('客户端错误');
    return Promise.reject(new Error(msg));
  } else if (res.code === 404) {
    ElMessage.error('网络请求不存在');
    return Promise.reject(new Error(msg));
  } else if (res.code === 500) {
    ElMessage.error("服务器正在开小差");
    return Promise.reject(new Error(msg));
  }
  ElMessage.error('服务器正在开小差');
  return Promise.reject(new Error(msg));
})

export default service
