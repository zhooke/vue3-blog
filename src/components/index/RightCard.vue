<template>
  <div class="card-right">
    <el-row justify="start" style="margin: 10px">
      <el-row v-if="blogUserInfo === undefined">
        <el-button size="small" type="primary" plain>登陆</el-button>
        <el-button size="small" type="success" plain>注册</el-button>
      </el-row>
      <el-row v-else>
        <el-dropdown>
          <el-avatar shape="square" :size="30" :src="squareUrl"/>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="userInfoDialogVisible=true">个人资料</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item>Action 4</el-dropdown-item>
              <el-dropdown-item @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-row>
    </el-row>
    <el-tabs v-model="activeName" class="card-right-tabs" @tab-click="handleClick">
      <el-tab-pane name="first">
        <template #label>
          <el-icon>
            <tickets/>
          </el-icon>
        </template>
        <p>热门文章</p>
        <el-row class="hot-blog-card" v-for="(item,index) in blogTop5List" :key="index" gutter="5"
                style="margin-bottom: 20px;height: 55px;" @click="blogCardClick(item.id)">
          <el-col :span="6">
            <el-image :src="text_url" fit="cover" style="height: 55px"></el-image>
          </el-col>
          <el-col :span="16">
            <span style="margin-bottom: 3px">{{ index + 1 }}. {{ item.title }}</span>
            <span style="color: #98a6ad"><el-icon size="16px" style="color: #98a6ad"><video-camera-filled/></el-icon>{{
                item.blogBrowse
              }}</span>
          </el-col>
        </el-row>
        <p>博主信息</p>
        <el-card style="font-size: 12px;color: #6e6e6e;margin-bottom: 10px;">
          <el-row>
            <el-col :span="12">
              <span>博主昵称</span></el-col>
            <el-col :span="12">{{ blogUserInfo.nickname }}</el-col>
            <el-divider></el-divider>
          </el-row>
          <el-row>
            <el-col :span="12">运行天数</el-col>
            <el-col :span="12">{{ blogUserInfo.runningDay }}</el-col>
            <el-divider></el-divider>
          </el-row>
          <el-row>
            <el-col :span="12">文章数量</el-col>
            <el-col :span="12">{{ blogUserInfo.blogCount }}</el-col>
            <el-divider></el-divider>
          </el-row>
          <el-row>
            <el-col :span="12">评论数量</el-col>
            <el-col :span="12">{{ blogUserInfo.commentCount }}</el-col>
            <el-divider></el-divider>
          </el-row>
          <el-row>
            <el-col :span="12">博客粉丝</el-col>
            <el-col :span="12">{{ blogUserInfo.followCount }}</el-col>
            <el-divider></el-divider>
          </el-row>
        </el-card>
        <p>标签</p>
        <el-tag v-for="item in blogTagList" :key="item" style="margin: 0 0 10px 10px" @click="tagClick(item)">{{
            item.name
          }}
        </el-tag>
      </el-tab-pane>
      <el-tab-pane name="second">
        <template #label>
          <el-icon>
            <comment/>
          </el-icon>
        </template>
        <p>最新评论</p>
        <el-row class="hot-blog-card" v-for="(item,index) in blogCommentNewestList" :key="index" gutter="5"
                style="margin-bottom: 20px;height: 55px;" @click="blogCardClick(item.blogId)">
          <el-col :span="6">
            <el-image :src="text_url" fit="cover" style="height: 55px"></el-image>
          </el-col>
          <el-col :span="16">
            <span style="margin-bottom: 3px">{{ index + 1 }}.@ {{ item.createUserName }} 说：</span>
            <span style="color: #98a6ad">{{ item.comment }}</span>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane name="third">
        <template #label>
          <el-icon>
            <fold/>
          </el-icon>
        </template>
        <span>广告招租</span>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      v-model="userInfoDialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
    >
      <span>This is a message</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="userInfoDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="userInfoDialogVisible = false"
        >Confirm</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>


import { ref } from 'vue';
import { blogTop5Api, commentNewestApi, getBlogUserApi, getTagApi } from '@/utils/api';

export default {
  name: 'RightCard',
  data() {
    return {
      header_image_url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4fa94a8d213a0991007a99f37035cc06715b980c558e9-En6TDM_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649476198&t=9cd9bfde665ffde6b4ebd9ee2cd0ed9a',
      header_url: 'https://img2.baidu.com/it/u=2723317969,2981355550&fm=26&fmt=auto',
      text_url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F11020033428%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649771328&t=364f380b566aba545f1acfc37d0b1f85',
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      currentPage4: ref(4),
      pageSize4: ref(4),
      small: ref(false),
      background: ref(false),
      disable: ref(false),
      activeName: ref('first'),
      search_data: '',
      blogTop5List: [],
      blogCommentNewestList: [],
      blogTagList: [],
      blogUserInfo: {},
      userInfoDialogVisible: ref(false)
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    handleSizeChange(val) {
      console.log(`${val} items per page`)
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // tag点击事件
    async tagClick(val) {
      console.log(val)
    },
    async blogCardClick(val) {
      await this.$router.push({ path: '/blog/read', query: { blogId: val } })
    },
    async commentNewest() {
      const { data: result } = await commentNewestApi();
      this.blogCommentNewestList = result.data;
    },
    async blogTop5() {
      const { data: result } = await blogTop5Api();
      this.blogTop5List = result.data;
    },
    async getTag() {
      const { data: result } = await getTagApi();
      this.blogTagList = result.data
    },
    async getUser() {
      const { data: result } = await getBlogUserApi()
      this.blogUserInfo = result.data
    }
  },
  mounted() {
    this.commentNewest()
    this.blogTop5()
    this.getTag()
    this.getUser()
  }
}
</script>

<style lang="less" scoped>
.card-right {
  vertical-align: baseline;
  line-height: 1.5;
  flex-direction: column;
  padding-left: 10px;
  margin-right: 10px;

  .el-col {
    display: inline-flex;
    flex-direction: column;
    font-size: 12px;
  }

  .el-icon {
    margin-right: 10px;
    font-size: 20px;
    color: #6e6e6e;
  }

  .card-right-tabs {
    text-align: start;
    margin-top: 10px;

    .el-divider {
      margin: 10px 0 10px 0;
    }

    .el-col {
      color: #6e6e6e;
    }
  }
}

.hot-blog-card:hover {
  cursor: pointer;
}
</style>
