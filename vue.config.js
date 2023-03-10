// vue.config.js
const production = process.env.NODE_ENV === 'production'
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  chainWebpack: config => {
    // 发布模式
    config.when(production, config => {
      config.entry('app').clear().add('./src/main-prod.js')
      // config.set('externals', {
      //     vue: 'Vue',
      //     'vue-router': 'VueRouter',
      //     vuex: 'Vuex',
      //     axios: 'axios',
      //     lodash: '_',
      //     nprogress: 'NProgress',
      //     'element-plus': 'ElementPlus'
      //   }
      // )

      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })

    // 开发者模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://hub.tensua.com/api-business/api/v1/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: (config) => {
    if (production) { // 为生产环境修改配置...
      config.mode = 'production'
      config.performance = { //打包文件大小配置
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      }
      config.devtool = 'hidden-source-map'
    }
  }
}
