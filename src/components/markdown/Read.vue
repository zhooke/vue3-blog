<template>
  <div class="markdown">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章</el-breadcrumb-item>
    </el-breadcrumb>
    <mavon-editor v-model="blog.content" :editable="false" :html="false" :subfield="false"
                  :toolbars="markdownOption" codeStyle="foundation" defaultOpen="preview" style="width: 100%">
    </mavon-editor>
  </div>
</template>

<script>
import { getBlogById } from '@/utils/api';

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
    save() {
      console.log('save')
    },
    imgAdd(pos, $file) {

    },
    imgDel() {

    },
    async getBlog(id) {
      const { data: result } = await getBlogById(id)
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
