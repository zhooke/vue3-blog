<template>
  <div>
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>草稿箱</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="min-height: 550px">
      <el-card v-for="(blog, index) in blogDraftList" :key="index" class="article-card" :body-style="{padding:'0'}">
        <el-row style="height: 200px;width: 100%;" type="flex">
          <el-col :span="6" style="height: 200px">
            <el-image fit="cover" style="width: 100%; height: 100%"
                      :src="blog.picture === '' ? header_url : blog.picture"/>
          </el-col>
          <el-col :span="18">
            <el-card class="card-main" @click="blogCardClick(blog.id)">
              <el-row>
                <el-col class="card-title">
                  {{ blog.title }}
                </el-col>
              </el-row>
              <el-row>
                <el-col class="card-context">
                  <VueShowdown :markdown="blog.content"/>
                </el-col>
              </el-row>
              <el-divider/>
              <el-row class="card-info" justify="start">
                <el-col>
                  <span><el-icon><avatar/></el-icon></span>
                  <span>{{ blog.authorName }}</span>
                </el-col>
                <el-col>
                  <span><el-icon><clock/></el-icon></span>
                  <span>{{ blog.createDate }}</span>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="demo-pagination-block">
      <el-pagination
        v-model:currentPage="page.pageIndex"
        v-model:page-size="page.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="blogDraftList.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>

import { ref } from 'vue';
import { getBlogDraftListApi } from '@/utils/api';

export default {
  name: 'DraftList',
  data() {
    return {
      header_url: 'https://img2.baidu.com/it/u=2723317969,2981355550&fm=26&fmt=auto',
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      small: ref(false),
      background: ref(false),
      disabled: ref(false),
      activeName: ref('first'),
      search_data: '',
      blogDraftList: [],
      userinfo: {}
    }
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getBlogDraftList()
    },
    handleCurrentChange(val) {
      this.page.pageIndex = val
      this.getBlogDraftList()
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // tag点击事件
    tagClick(val) {
      console.log(val)
    },
    async blogCardClick(val) {
      await this.$router.push({ path: '/blog/read/draft', query: { blogId: val } })
    },
    async getBlogDraftList() {
      const { data: result } = await getBlogDraftListApi(this.page);
      this.blogDraftList = result.data
      this.page.total = result.total
    }
  },
  mounted() {
    this.userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
    this.page.userId = this.userinfo.id
    this.getBlogDraftList()
  }
}
</script>

<style lang="less" scoped>

.card-main {
  text-align: left;
  cursor: pointer;
  white-space: nowrap;

  .card-title {
    height: 20%;
    text-overflow: ellipsis;
    line-height: 1.5;
    font-size: 22px;
    color: #555;
    margin-bottom: 10px;
  }

  .card-context {
    height: 70%;
    flex-wrap: wrap;
    min-height: 100px;
    line-height: 25px;
    font-size: 14px;
    color: #a2b0b7;
    word-break: break-word;
    // 文字自动换行
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 3;
  }

  .el-divider {
    margin: 7px 0;
  }

  .card-info {
    font-size: 10px;
    color: #a2b0b7;
    display: inline-block;

    .el-col {
      display: inline-flex;
      margin-right: 10px;
    }

    .el-icon {
      margin-right: 5px;
      font-size: 14px;
    }
  }
}

.user-info-card {
  position: absolute;
  left: 200px;
  bottom: 50px;
  z-index: 1;
  background-color: unset;
  border: 0;
  color: #eeeeee;
}

.article-card {
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 1;
  height: 200px;
  width: 100%;
  margin-bottom: 30px;
  border-radius: 10px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-top: 10px;
  margin-bottom: 16px;
}

</style>
