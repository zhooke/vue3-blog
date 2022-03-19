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
    <el-card class="comment-card" justify="space-between">
      <p>发表评论</p>
      <el-input
        v-model="commentText"
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="Please input"
        suffix-icon="Search"
      >
      </el-input>
      <el-row style="margin-top: 10px" justify="end">
        <el-button type="success" icon="Check">发表</el-button>
      </el-row>
    </el-card>
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
      },
      commentInputRow: 2,
      commentText: ''
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
    },
    commentFocus() {
      this.commentInputRow = 3
    }
  },
  mounted() {
    this.blog.id = this.$route.query.blogId
    this.getBlog(this.blog.id)
  }
}
</script>

<style lang="less" scoped>
.markdown {
  width: 100%;
  height: 100%;
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
}
</style>
