<template>
  <el-scrollbar>
    <div>
      <!--              个人资料展示-->
      <el-card :body-style="{padding:'0'}" class="header-card" id="top">
        <el-card :body-style="{padding:'0'}" class="header-card-background">
        </el-card>
        <el-image :src="userinfo.headImgUrl" class="header-image"/>
        <div class="user-info-card">
          <el-row>
            <p style="color: inherit;cursor: pointer;font-size: 22px;margin: 0!important;">
              {{ blogUserInfo.nickname }}
              <el-button size="small" type="primary">关注</el-button>
            </p>
          </el-row>
          <el-row>
            <p style="font-size: 14px">
              <span style="margin-right: 16px;">园龄：{{ blogUserInfo.runningDay }}</span>
              <span style="margin-right: 16px;">粉丝：{{ blogUserInfo.followCount }}</span>
              <span>文章：{{ blogUserInfo.blogCount }}</span>
            </p>
          </el-row>
        </div>
      </el-card>
      <!--              正文部分-->
      <div v-loading="loading" class="content-tag">
        <el-card v-for="(blog, index) in blogList" :key="index" :body-style="{padding:'0'}" class="article-card">
          <el-row style="height: 200px;width: 100%;" type="flex">
            <el-col :span="6" style="height: 200px">
              <el-image :src="blog.picture === '' ? header_url : blog.picture" fit="cover"
                        style="width: 100%; height: 100%"/>
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
                <el-divider style="margin-bottom: 5px"/>
                <el-row class="card-info" justify="start">
                  <el-col v-if="blog.isOriginal === 1">
                    <el-tag type="success" size="small" style="height: 16px">原创</el-tag>
                  </el-col>
                  <el-col v-else-if="blog.isOriginal === 2">
                    <el-tag type="danger" size="small" style="height: 16px">转摘</el-tag>
                  </el-col>
                  <el-col v-if="blog.isOriginal === 3">
                    <el-tag type="warning" size="small" style="height: 16px">翻译</el-tag>
                  </el-col>
                  <el-col v-show="blog.isTop === 1">
                    <el-tag size="small" style="height: 16px">置顶</el-tag>
                  </el-col>
                  <el-col>
                    <span><el-icon><avatar/></el-icon></span>
                    <span>{{ blog.authorName }}</span>
                  </el-col>
                  <el-col>
                    <span><el-icon><clock/></el-icon></span>
                    <span>{{ blog.createDate }}</span>
                  </el-col>
                  <el-col>
                    <span><el-icon><View/></el-icon></span>
                    <span>{{ blog.blogBrowse }}</span>
                  </el-col>
                  <el-col>
                    <span><el-icon><edit-pen/></el-icon></span>
                    <span>{{ blog.commentNum === null ? 0 : blog.commentNum }}</span>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
        <div class="demo-pagination-block">
          <el-pagination
            v-model:currentPage="blogRequest.pageIndex"
            v-model:page-size="blogRequest.pageSize"
            :background="background"
            :disabled="disabled"
            :page-sizes="[10, 20, 30, 40]"
            :small="small"
            :total="blogRequest.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>

import { ref } from 'vue';
import { getBlogListApi, getBlogUserApi } from '@/utils/api.js';

export default {
  name: 'ContextList',
  data() {
    return {
      header_url: 'https://img2.baidu.com/it/u=2723317969,2981355550&fm=26&fmt=auto',
      small: ref(false),
      background: ref(false),
      disabled: ref(false),
      activeName: ref('first'),
      search_data: '',
      blogList: [],
      loading: ref(true),
      blogRequest: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      blogUserInfo: {},
      userinfo: {
        address: '',
        createTime: '2021-10-19T03:57:45.000+00:00',
        email: 'zhooke@foxmail.com',
        headImgUrl: 'https://tensua-file.oss-cn-hangzhou.aliyuncs.com/images/52aa879dbcae433c82e803b6723e2f56.jpg',
        id: 100011,
        mobile: '15352058954',
        nickname: 'zhooke',
        sex: 0,
        username: 'dzvhva7rard4krdjlh'
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`${val} items per page`)
      this.blogRequest.pageSize = val
      this.getBlogList()
      this.backTop()
    },
    handleCurrentChange(val) {
      this.blogRequest.pageIndex = val
      this.getBlogList()
      this.backTop()
    },
    backTop() {
      const element = document.getElementById('top');
      element.scrollIntoView()
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // tag点击事件
    tagClick(val) {
      console.log(val)
    },
    // 文章点击事件
    async blogCardClick(val) {
      await this.$router.push({ path: '/blog/read', query: { blogId: val } })
    },
    async getBlogList() {
      const { data: result } = await getBlogListApi(this.blogRequest)
      this.blogList = result.data
      this.blogRequest.total = result.total
      this.loading = false
    },
    async getUser() {
      const { data: result } = await getBlogUserApi()
      this.blogUserInfo = result.data
    }
  },
  mounted() {
    this.blogRequest.userId = this.$route.query.userId
    this.blogRequest.title = this.$route.query.title;
    this.getBlogList()
    this.getUser()
    const user = JSON.parse(window.sessionStorage.getItem('userinfo'))
    if (user) {
      this.userinfo = user
    }
    // todo 需要解决其他页面刷新后title改变问题
    document.title = this.userinfo.nickname + '的博客'
  }
}
</script>

<style lang="less">
.header-card {
  height: 300px;
  width: 99%;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 1;
  margin-bottom: 10px;

  .header-card-background {
    padding: 0 !important;
    background-image: url(https://tensua-file.oss-cn-hangzhou.aliyuncs.com/images/backimage.jpg);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    border-radius: 4px 4px 0 0;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    height: 250px;
    z-index: 1;
  }

  .header-image {
    padding: 0 !important;
    position: absolute;
    align-items: center;
    display: flex;
    z-index: 1;
    bottom: 25px;
    left: 24px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid;
  }
}

.article-card:hover {
  box-shadow: 0 1px 6px rgba(217, 213, 213, 0.93);
  border: 2px solid #ff6b81;
  transition: all 0.2s ease-in-out;
}

.card-main {
  text-align: left;
  cursor: pointer;
  white-space: nowrap;

  .card-title {
    height: 20%;
    text-overflow: ellipsis;
    line-height: 1.5;
    font-size: 18px;
    color: #555;
    margin-bottom: 10px;
  }

  .card-context {
    flex-wrap: wrap;
    height: 100px;
    line-height: 15px;
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
    font-size: 14px;
    color: #a2b0b7;
    display: inline-block;

    .el-col {
      display: inline-flex;
      margin-right: 10px;
    }

    .el-icon {
      margin-right: 5px;
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

  margin: 0 auto;
  //align-items: center;
  // justify-content: center;
  height: 200px;
  width: 99%;
  margin-bottom: 20px;
  border-radius: 10px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block {
  margin-top: 10px;
  margin-bottom: 16px;
  width: 100%;
}
</style>
