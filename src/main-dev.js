import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import mavonEditor from 'mavon-editor'
import * as ELIcons from '@element-plus/icons-vue'

import 'mavon-editor/dist/css/index.css'
import 'element-plus/dist/index.css'
import './assets/css/global.css'
import { VueShowdownPlugin } from 'vue-showdown'

import axios from '@/utils/http'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(mavonEditor)
app.use(VueShowdownPlugin, {
    // set default flavor of showdown
    flavor: 'github',
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
