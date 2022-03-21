<template>
  <div class="markdown">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="card-info">

      <el-row justify="space-between">
        <el-col span="18">
          <el-tag v-if="blog.isOriginal === 0" type="danger" size="large" effect="dark">原创</el-tag>
          <el-tag v-if="blog.isOriginal === 1" type="danger" size="large" effect="dark">转摘</el-tag>
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
                  <span><el-icon><search/></el-icon></span>
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
                <el-col>
                  <span>标签：</span>
                  <el-tag class="ml-2" type="success" v-for="item in 5" :key="item" style="margin-right: 10px">Tag {{
                      item
                    }}
                  </el-tag>
                </el-col>
              </el-row>

            </el-col>
          </el-row>
        </el-col>
        <el-col span="6" style="margin-top: 15px">
          <el-link type="primary" style="margin-right: 10px">编辑</el-link>
          <el-link type="info">版权</el-link>
        </el-col>
      </el-row>
    </el-card>
    <mavon-editor v-model="blog.content" :editable="false" :html="false" :subfield="false"
                  :toolbars="markdownOption" codeStyle="foundation" defaultOpen="preview" style="width: 100%">
    </mavon-editor>
    <!--    评论输入框-->
    <el-card class="comment-card" justify="space-between">
      <p>发表评论</p>
      <el-input
        v-model="commentContext.comment"
        type="textarea"
        maxlength="1000"
        show-word-limit
        :rows="commentInputRow"
        placeholder="请发表有价值的评论， 博客评论不欢迎灌水，良好的社区氛围需大家一起维护。"
        style="border-style: none;"
        @focus="commentFocus"
        @blur="commentBlur"
      >
      </el-input>
      <el-row style="margin-top: 10px;" justify="space-between">
        <!--        todo 添加表情包和图片功能-->
        <el-col span="12">
        </el-col>
        <el-col span="12">
          <el-button type="success" icon="Check" @click="commentBlog">发表</el-button>
        </el-col>
      </el-row>

      <el-divider content-position="left">评论列表</el-divider>
      <el-row justify="space-between" v-for="item in commentList" :key="item" style="margin-bottom: 10px">
        <el-col span="16" class="comment-text-left-col">
          <el-avatar :size="30" :src="item.headImgUrl === null ?circleUrl :item.headImgUrl" fit="cover"/>
          <div style="flex-direction:column;margin-left: 10px">
            <p>{{ item.createUserName }} {{ item.createDate }}</p>
            <span class="comment-text">{{ item.comment }}</span>
          </div>
        </el-col>
        <el-col span="8" style="flex-direction:row;margin-top: 10px">
          <el-button icon="Edit" size="small">回复</el-button>
          <el-button icon="Check" size="small"/>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script>
import { commentBlogApi, commentListApi, getBlogByIdApi } from '@/utils/api';

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
      },
      commentInputRow: 2,
      commentText: '',
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      commentButtonShow: false,
      commentList: [],
      commentRequest: {
        pageIndex: 0,
        pageSize: 10
      },
      commentContext: {
        blogId: '',
        comment: ''
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
      const { data: result } = await getBlogByIdApi(id)
      this.blog = result.data
    },
    commentFocus() {
      this.commentInputRow = 3
    },
    commentBlur() {
      this.commentInputRow = 2
    },
    async getCommentList() {
      this.commentRequest.blogId = this.blog.id
      const { data: result } = await commentListApi(this.commentRequest)
      this.commentList = result.data
      this.commentList.pageSize = result.pageSize
      this.commentList.pageIndex = result.pageIndex
    },
    async commentBlog() {
      this.commentContext.blogId = this.blog.id
      await commentBlogApi(this.commentContext)
      await this.getCommentList()
      this.commentContext.comment = ''
    }
  },
  mounted() {
    this.blog.id = this.$route.query.blogId
    this.getBlog(this.blog.id)
    this.getCommentList()
  }
}
</script>

<style lang="less" scoped>
.markdown {
  width: 100%;
  height: 100%;
  padding-right: 5px;
}

.v-note-wrapper {
  z-index: 1;
}

.card-info {
  font-size: 10px;
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
    font-size: 14px;
  }
}

.comment-card {
  display: inline-block;
  text-align: left;
  width: 100%;
  margin-top: 10px;

  .comment-text {
    line-height: 25px;
    //font-size: 14px;
    //color: #a2b0b7;
    word-break: break-word;
    // 文字自动换行
    white-space: normal;
  }

  .el-avatar {
    margin-top: 10px;
    min-width: 30px;
    min-height: 30px
  }

  .comment-text-left-col {
    display: flex;
    flex-direction: row;
    max-width: 80%;

    p {
      font-size: 14px;
      color: #a2b0b7;
    }
  }
}
</style>
