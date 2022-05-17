<template>
  <div id="Comment">
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
          <el-avatar :size="30" :src="item.headImgUrl === null ? circleUrl :item.headImgUrl" fit="cover"/>
          <div style="flex-direction:column;margin-left: 10px">
            <p>{{ item.createUserName === null ? item.ipAddress : item.createUserName }} | {{ item.browserModel }} |
              {{ item.createDate }}</p>
            <span class="comment-text">{{ item.comment }}</span>
          </div>
        </el-col>
        <el-col span="8" style="flex-direction:row;margin-top: 10px">
          <el-button icon="Edit" size="small" @click="item.commentInput=!item.commentInput">回复</el-button>
          <!--          <el-button icon="Check" size="small"/>-->
        </el-col>
        <el-input
          v-show="item.commentInput"
          v-model="replyCommentData.comment"
          type="text"
          maxlength="500"
          show-word-limit
          :autofocus="true"
          clearable
          autosize
          @blur="item.commentInput=false"
          class="reply-comment"
          @keydown.enter="replyComment(item)"
        >
          <template #prepend>
            @{{ item.createUserName === null ? item.ipAddress : item.createUserName }}:
          </template>
        </el-input>
        <!--        todo 添加回复内容显示-->
      </el-row>
      <el-pagination
        v-model:currentPage="commentRequest.pageIndex"
        :page-size="commentRequest.pageSize"
        small="small"
        background
        layout="total, prev, pager, next"
        :total="commentRequest.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-show="commentRequest.total >10"
      />
    </el-card>
  </div>
</template>

<script>
import { commentBlogApi, commentListApi, commentReplyApi } from '@/utils/api';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Comment',
  props: {
    blog: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      commentContext: {
        blogId: '',
        comment: '',
        browserModel: ''
      },
      commentInputRow: 3,
      commentRequest: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      commentList: [],
      userinfo: {},
      blogInfo: {
        id: '',
        content: '',
        createUserId: ''
      },
      commentInput: false,
      replyCommentData: {
        blogId: '',
        comment: '',
        browserModel: '',
        commentId: 0,
        blogAuthorId: 0
      }
    }
  },
  methods: {
    async getCommentList() {
      const { data: result } = await commentListApi(this.commentRequest)
      this.commentList = result.data
      this.commentRequest.pageSize = result.pageSize
      this.commentRequest.pageIndex = result.pageIndex
      this.commentRequest.total = result.total
    },
    async commentBlog() {
      this.commentContext.blogId = this.blogInfo.id
      this.commentContext.blogAuthorId = this.blogInfo.createUserId
      this.commentContext.browserModel = this.getExplorer()
      await commentBlogApi(this.commentContext)
      await this.getCommentList()
      this.commentContext.comment = ''
    },
    handleSizeChange(val) {
      this.commentRequest.pageSize = val
      this.getCommentList()
    },
    handleCurrentChange(val) {
      this.commentRequest.pageIndex = val
      this.getCommentList()
    },
    getExplorer() {
      const explorer = window.navigator.userAgent;
      //Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36
      let start = 0;
      const compare = function (s) {
        start = explorer.indexOf(s)
        return (start >= 0);
      };
      const ie11 = (function () {
        return ('ActiveXObject' in window)
      })();
      if (compare('MSIE') || ie11) {

      } else if (compare('Firefox') && !ie11) {

      } else if (compare('Chrome') && !ie11) {

      } else if (compare('Opera') && !ie11) {

      } else if (compare('Safari') && !ie11) {

      }
      return explorer.substring(start);
    },
    async replyComment(val) {
      console.log(val)
      this.replyCommentData.blogId = this.blogInfo.id
      this.replyCommentData.blogAuthorId = val.blogAuthorId
      this.replyCommentData.browserModel = this.getExplorer()
      this.replyCommentData.commentId = val.id
      await commentReplyApi(this.replyCommentData);
      await this.getCommentList()
      this.replyCommentData = {}
    }
  },
  mounted() {
    this.userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
    this.blogInfo = this.blog
  },
  watch: {
    blog: {
      handler(newVal, oldVal) {
        this.commentRequest.blogId = newVal.id
        this.commentRequest.blogAuthorId = newVal.createUserId
        this.getCommentList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
      color: #7e888b;
    }
  }

  .reply-comment {
    margin-top: 10px;
    border-style: none;
  }
}
</style>
