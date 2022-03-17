<template>
  <div class="mavonCreate">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="blog" label-width="120px">
      <el-form-item label="文章标题:">
        <el-input v-model="blog.title"/>
      </el-form-item>
    </el-form>
    <mavon-editor @save="save" @imgAdd="imgAdd" @imgDel="imgDel" :toolbars="markdownOption" v-model="blog.content"
                  style="min-height:800px;width: 100%">
    </mavon-editor>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Create',
  data() {
    return {
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      handbook: '#### how to use mavonEditor in nuxt.js',
      blog: {
        authorId: '',
        authorName: '',
        title: '',
        content: '#### how to use mavonEditor in nuxt.js',
        picture: '',
        isTop: 0,
        isPrivate: 0,
        isOriginal: 0
      }

    };
  },
  methods: {
    async save() {
      const user = JSON.parse(window.sessionStorage.getItem('userinfo'))
      this.blog.authorId = user.id
      this.blog.authorName = user.nickname
      const { data: result } = await this.$http.post('blog/add', this.blog);
      console.log(result)
      if (result.code !== 200) return this.$message.error(result.data)
      this.$message.success('发布成功');
    },
    imgAdd(pos, $file) {

    },
    imgDel() {

    }
  },
  mounted() {
    window.onbeforeunload = function (e) {
      e = e || window.event;
      // 兼容IE8和Firefox 4之前的版本
      if (e) {
        e.returnValue = '关闭提示';
      }
      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      return '关闭提示';
    }
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // 可以通过传一个回调给 next来访问组件实例
    next(vm => {
      // 通过 `vm` 访问组件实例
    })
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // 不支持传递回调(因为this实例已经创建可以获取到，所以没必要)
    console.log('update')
    next()
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // 该导航可以通过 next(false) 来取消。
    this.$confirm('您还没有保存文章呢，确认离开？').then(() => {
      next()
    }).catch(() => {
        next(false)
      })
  },
  destroyed() {
    window.onbeforeunload = null
  }

  }
</script>

<style scoped>

</style>
