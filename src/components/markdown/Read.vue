<template>
  <div class="markdown">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章</el-breadcrumb-item>
    </el-breadcrumb>
    <mavon-editor :toolbars="markdownOption" v-model="blog.content" :html="false" codeStyle="foundation" :editable="false" defaultOpen="preview" :subfield="false" style="width: 100%" >
    </mavon-editor>
  </div>
</template>

<script>
export default {
  name: 'ReadContext',
  data() {
    return {
      markdownOption: {
        fullscreen: true, // 全屏编辑
        navigation: true // 导航目录
      },
      blog: {
        content: ''
      }
    };
  },
  methods: {
    save(){
      console.log('save')
    },
    imgAdd(pos, $file){

    },
    imgDel(){

    },
    async getBlog(id){
      const { data: result } = await this.$http.get('/blog/' + id)
      if (result.code !== 200) return this.$message.error('获取文章失败！')
      this.blog = result.data
    }
  },
  mounted() {
    this.blog.id = this.$route.query.blogId
    this.getBlog(this.blog.id)
  }
}
</script>

<style scoped>
.markdown {
  width: 100%;
  height: 100%;
}
</style>
