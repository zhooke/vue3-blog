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
            <el-tag v-if="blog.isOriginal === 1" type="success" size="large" effect="dark">原创</el-tag>
            <el-tag v-if="blog.isOriginal === 0" type="danger" size="large" effect="dark">转摘</el-tag>
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
                    <span style="font-size: 14px;color: black">标签：</span>
                    <el-tag class="ml-2" type="success" v-for="item in blogTagList" :key="item"
                            style="margin-right: 10px">{{
                        item.name
                      }}
                    </el-tag>
                  </el-col>
                </el-row>

              </el-col>
            </el-row>
          </el-col>
          <el-col span="6" style="margin-top: 15px">
            <el-button v-show="userinfo !== null && userinfo.id===blog.createUserId" type="primary" round size="small"
                       @click="editBlog">
              编辑
            </el-button>
            <el-button type="info" round size="small">版权</el-button>
            <el-button v-show="userinfo !== null && userinfo.id===blog.createUserId" type="danger" round size="small"
                       @click="deleteBlog">删除
            </el-button>
          </el-col>
        </el-row>
      </el-card>
      <mavon-editor v-model="blog.content" :editable="false" :html="false" :subfield="false"
                    :toolbars="markdownOption" codeStyle="foundation" defaultOpen="preview"
                    style="width: 100%;z-index: 100">
      </mavon-editor>
      <!--    评论输入框-->
      <comment :blog="blog"></comment>
    </div>
  </el-scrollbar>
</template>

<script>
import { deleteBlogApi, getBlogByIdApi, getBlogTagApi } from '@/utils/api';
import Comment from '@/components/plugs/Comment';

export default {
  name: 'ReadContext',
  components: { Comment },
  data() {
    return {
      markdownOption: {
        fullscreen: true, // 全屏编辑
        navigation: true // 导航目录
      },
      blog: {
        content: '',
        createUserId: ''
      },
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      blogTagList: [],
      userinfo: {}
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
        return false;
      })
    },
    editBlog() {
      this.$router.push({ name: 'edit', params: this.blog })
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
  width: 100%;
  height: 100%;
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

  .el-col {
    display: inline-flex;
    margin-right: 10px;
  }

  .el-icon {
    margin-right: 5px;
  }
}


</style>
