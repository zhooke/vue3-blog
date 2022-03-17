<template>
  <div class="mavonCreate">
    <el-row :gutter="20">
      <el-col :span="4">
         <span>文章标题：</span>
      </el-col>
      <el-col :span="18">
        <el-input class="w-50 m-2" v-model="blog.title" placeholder="Please input" clearable />
      </el-col>
    </el-row>
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布</el-breadcrumb-item>
    </el-breadcrumb>
    <mavon-editor @save="save" @imgAdd="imgAdd" @imgDel="imgDel"  :toolbars="markdownOption" v-model="blog.content" style="min-height:800px;width: 100%">
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
        authorId: '1',
        authorName: '123',
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
    async save(){
      console.log('save');
      const { data: result } = await this.$http.post('blog/add', this.blog);
      console.log(result)
      if (result.code !== 200) return this.$message.error(result.data)
      this.$message.info('发布成功');
    },
    imgAdd(pos, $file){

    },
    imgDel(){

    }
  }
}
</script>

<style scoped>

</style>
