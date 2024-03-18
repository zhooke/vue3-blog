import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as ELIcons from '@element-plus/icons-vue'

import 'element-plus/dist/index.css'
// import './assets/css/pc.css'
import 'vant/lib/index.css';
import { VueShowdownPlugin } from 'vue-showdown'
import axios from './utils/http'
import echarts from './plugins/echarts'
import currentPlatform from './utils/platform.js';

const app = createApp(App)
app.config.warnHandler = () => null
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$http = axios
app.config.productionTip = false
app.use(store)
app.use(router)
// app.use(ElementPlus)
app.use(VueShowdownPlugin, {
  // set default flavor of showdown
  flavor: 'github',
  ishljs: false,
  // set default options of showdown (will override the flavor options)
  options: {
    emoji: false
  }
})


for (const iconName in ELIcons) {
  app.component(iconName, ELIcons[iconName])
}
// for (const icons in antIcons) {
//   app.component(icons, antIcons[icons])
// }
app.mount('#app')

// window.router = router

if (currentPlatform === 'pc') {
  await import('./assets/css/pc.css');
} else {
  await import('./assets/css/mobile.css');
}

// 全局监听浏览器尺寸变化
// window.addEventListener('resize', function() {
//   console.log('浏览器尺寸发生变化：', window.innerWidth, window.innerHeight);
//   window.location.reload()
//     router.go("/")
// });


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
