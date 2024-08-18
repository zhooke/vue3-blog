import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver, VantResolver} from 'unplugin-vue-components/resolvers'

import * as path from "path";
// vue.config.js
// https://vitejs.dev/config/
export default defineConfig(config => ({
    base: '/',
    plugins: [
      vue(),
      // 自动引入组件和自动注册 new add
      // AutoImport({
      //   resolvers: [ElementPlusResolver()],
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()],
      // }),
      Components({
        resolvers: [VantResolver(), ElementPlusResolver()],
      }),
    ],
    server: {
      // host: '0.0.0.0',
      port: 9700,
      cors: true, //为开发服务器配置 CORS , 默认启用并允许任何源
      open: false, //服务启动时自动在浏览器中打开应用
      strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
      // 反向代理配置
      proxy: {
        '/api': {
          // target: 'http://localhost:8090/blog-service/api/v1/',
          target: 'https://hub.tensua.com/blog-service/api/v1/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      //配置别名
      alias: {
        '@': path.join(__dirname, "src"),
        "#": path.join(__dirname, "types"),
        '/images': 'src/assets/images'
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs']
    }
    ,
    build: {
      // 指定输出路径
      outDir: 'dist',
      // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
      assetsInlineLimit: 4096, // 默认：4kb
      // chunk 大小警告的限制
      chunkSizeWarningLimit: 1500,
      //启用/禁用 CSS 代码拆分
      cssCodeSplit: true,
      //构建后是否生成 source map 文件
      sourcemap: false,
      //当设置为 true，构建后将会生成 manifest.json 文件
      manifest: false,
      // 设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器
      // boolean | 'terser' | 'esbuild'
      minify: 'terser', //terser 构建后文件体积更小
      //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
      emptyOutDir: true,
      //启用/禁用 brotli 压缩大小报告
      brotliSize: true,
      // 预加载
      modulePreload: {
        polyfill: true
      },
      rollupOptions: {
        external: [
          // 'element-plus',
        ],
        // 打包之前是否先清空文件夹
        output:
          {
            chunkFileNames: 'js/[name]-[hash].js', // 自定义命名代码分割中产生的 chunk
            entryFileNames:
              'js/[name]-[hash].js', // 指定 chunks 的入口文件模式
            assetFileNames:
              ({name}) => {
                // 自定义构建结果中的静态资源名称
                const images = ['jpg', 'gif', 'png', 'webp'];
                // 获取最后一个扩展名
                const ext = [...name.split('.')].pop();
                let floder = ext;
                if (images.includes(ext)) {
                  floder = 'images';
                }
                return `${floder}/[name]-[hash].[ext]`;
              }, // 资源文件像 字体，图片等
            manualChunks(id) {
              // 将node_modules的扩展单独进行打包
              if (id.includes('node_modules')) {
                return id.toString().split('node_modules/')[1].split('/')[0].toString();
              }
            }
          }
      }
    },
    esbuild: {
      // 移除打包环境的console 和 debugger
      drop: config.mode === 'development' ? [] : ['debugger', 'console'],
      logOverride:
        {
          // 忽略未使用变量警告
          'assign-to-constant': 'silent',
          // 忽略return空警告
          'semicolon-after-return': 'silent'
        }
    },
  })
)
