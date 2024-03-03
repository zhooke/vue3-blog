import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import * as ELIcons from '@element-plus/icons-vue'

import 'element-plus/dist/index.css'
import './assets/css/global.css'
import { VueShowdownPlugin } from 'vue-showdown'
import axios from './utils/http'

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';


const app = createApp(App)
app.config.warnHandler = () => null
app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(VueShowdownPlugin, {
  // set default flavor of showdown
  flavor: 'github',
  ishljs: false,
  // set default options of showdown (will override the flavor options)
  options: {
    emoji: false
  }
})

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

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
