<template>
  <div class="details">
    <Editor
      class="editor"
      :value="defValue"
      :plugins="defPlugins"
      :locale="zhHans"
      @change="handleChange"
      :uploadImages="uploadImage"
      v-if="defShowEditor"
    />
    <Viewer
      :value="defValue"
      :plugins="defPlugins"
      :locale="zhHans"
      v-if="defShowViewer"
    >
    </Viewer>
  </div>
</template>

<script>
// 这里就是引入所有的扩展的插件
import { Editor, Viewer } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import breaks from '@bytemd/plugin-breaks'
import footnotes from '@bytemd/plugin-footnotes'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'
import mathssr from '@bytemd/plugin-math-ssr'
import zhHans from '../../locales/zh_Hans.json'
import gfmLocale from '@bytemd/plugin-gfm/locales/zh_Hans.json';
import mathLocale from '@bytemd/plugin-math/locales/zh_Hans.json';
import mermaidLocale from '@bytemd/plugin-mermaid/locales/zh_Hans.json';
import 'highlight.js/styles/vs.css'
// import 'juejin-markdown-themes/dist/juejin.min.css' // 掘金风格的css文件
import 'juejin-markdown-themes/dist/channing-cyan.min.css' // channing-cyan风格的css文件，这个确实很好看
import 'bytemd/dist/index.css'

const defPlugins = [
  // 将所有的扩展功能放入插件数组中，然后就可以生效了
  gfm({ locale: gfmLocale }),
  // highlightssr(),
  breaks(),
  highlight(),
  mermaid({ locale: mermaidLocale }),
  mathssr({ locale: mathLocale }),
  frontmatter(),
  footnotes(),
  gemoji(),
  mediumZoom()
]
export default {
  name: 'MarkDown',
  components: { Editor, Viewer }, // 组件注册
  props: {
    value: {
      type: String
    },
    showEditor: {
      type: Boolean
    },
    showViewer: {
      type: Boolean
    }
  },
  watch: {
    //todo 监听有问题
    value(val) {
      this.defValue = val
      this.defShowEditor = this.showEditor
      this.defShowViewer = this.showViewer
    }
  },
  data() {
    return {
      defPlugins,
      zhHans,
      defValue: '',
      defShowEditor: false,
      defShowViewer: false
    }
  },
  methods: {
    // 获取书写文档内容
    handleChange(v) {
      console.warn(v)
      this.$emit('input', v)
      this.defValue = v
    },
    // 上传图片 点击触发上传图片事件，大家获取文件把图片上传服务器然后返回url既可
    async uploadImage(files) {
      console.log('files', files)
      return [
        {
          title: files.map((i) => i.name),
          url: 'http'
        }
      ]
    }
  }

}
</script>

<style scoped>
.details {
  width: calc(100% - 10px) !important;
  height: 100%;
  margin: 0 auto;
}

</style>
