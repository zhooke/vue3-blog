<template>
  <el-scrollbar>
    <div class="markdown">
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card class="card-info">
        <p style="font-size: 20px;color: #000000;font-weight: 600">{{ blog.title }}</p>

        <el-row justify="space-between">
          <el-col span="18" style="margin-right:0">
            <el-tag v-if="blog.isOriginal === 1" effect="dark" size="large" type="success">原创</el-tag>
            <el-tag v-if="blog.isOriginal === 0" effect="dark" size="large" type="danger">转摘</el-tag>
            <el-row style="margin-left: 10px">
              <el-col style="margin-bottom: 10px">
                <el-row>
                  <el-col span="4">
                    <span><el-icon><avatar/></el-icon></span>
                    <span>{{ blog.authorName }}</span>
                  </el-col>
                  <el-col span="12">
                    <span><el-icon><clock/></el-icon></span>
                    <span>{{ blog.createDate }}</span>
                  </el-col>
                  <el-col span="4">
                    <span><el-icon><View/></el-icon></span>
                    <span>{{ blog.blogBrowse }}</span>
                  </el-col>
                  <el-col span="4">
                    <span><el-icon><edit-pen/></el-icon></span>
                    <span>{{ blog.commentNum === null ? 0 : blog.commentNum }}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col>
                <el-row>
                  <el-col style="display: inline-block;">
                    <span style="font-size: 14px;color: #5b676b;">标签：</span>
                    <el-tag v-for="item in blogTagList" :key="item" class="ml-2" style="margin-right: 10px"
                            type="success">{{
                        item.name
                      }}
                    </el-tag>
                  </el-col>
                </el-row>

              </el-col>
            </el-row>
          </el-col>
          <el-col span="6" style="margin-top: 15px">
            <el-button v-show="userinfo !== null && userinfo.id===blog.createUserId" round size="small" type="primary"
                       @click="editBlog">
              编辑
            </el-button>
            <el-button round size="small" type="info">版权</el-button>
            <el-button v-show="userinfo !== null && userinfo.id===blog.createUserId" round size="small" type="danger"
                       @click="deleteBlog">删除
            </el-button>
          </el-col>
        </el-row>
      </el-card>
      <MarkDown :showViewer="true" :value="blog.content"
                style="width: 100%;text-align: justify !important;">
      </MarkDown>
      <!--    评论输入框-->
      <BlogComment :blog="blog"></BlogComment>
    </div>
  </el-scrollbar>
</template>

<script>
import { deleteBlogApi, getBlogByIdApi, getBlogTagApi } from '@/utils/api.js'
import gfm from '@bytemd/plugin-gfm'
import frontmatter from '@bytemd/plugin-frontmatter'

import 'juejin-markdown-themes/dist/channing-cyan.min.css'
import 'bytemd/dist/index.css'
import MarkDown from '../plugins/MarkDown.vue'
import BlogComment from '@/views/pc/plugins/BlogComment.vue' // 导入编辑器样式

const plugins = [
  gfm(),
  frontmatter()
  // Add more plugins here
]

export default {
  name: 'ReadContext',
  components: { MarkDown, BlogComment },
  data() {
    return {
      plugins,
      blog: {
        content: '',
        createUserId: ''
      },
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      blogTagList: [],
      userinfo: {}
    }
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
      const { data: result } = await getBlogByIdApi(id)
      this.blog = result.data
      this.blog.commentType = 1
    },
    async getBlogTag() {
      const { data: result } = await getBlogTagApi(this.blog.id)
      this.blogTagList = result.data
    },
    deleteBlog() {
      this.$confirm('您确定要删除该博客吗？').then(async () => {
        deleteBlogApi(this.blog.id).then(result => {
          if (result.data.code === 200) {
            this.$message.success('删除成功')
            this.$router.push('/blog/list')
          }
        })
      }).catch(() => {
        return false
      })
    },
    editBlog() {
      this.$router.push({ name: 'edit', query: { blogId: this.blog.id } })
    }
  },
  mounted() {
    this.userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
    this.blog.id = this.$route.query.blogId
    this.getBlog(this.blog.id)
    this.getBlogTag()
  }
}
</script>

<style lang="less" scoped>
.markdown {
  width: calc(100% - 10px);
  height: 100%;
  margin: 0 auto;
}

.v-note-wrapper {
  z-index: 1;
}

.card-info {
  font-size: 14px;
  color: #a2b0b7;
  display: inline-block;
  text-align: left;
  width: 100%;
  box-shadow: none !important;

  .el-col {
    display: inline-flex;
    margin-right: 10px;
  }

  .el-icon {
    margin-right: 5px;
  }
}

</style>
