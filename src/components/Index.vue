<template>
  <div class="main">
    <el-container>
      <el-container>
        <el-aside class="left-aside">
<!--          左侧边栏-->
          <el-scrollbar>
            <p>BLOG MENU</p>
            <el-row>
              <h4 style="color: #5c5e6e;margin-left: 20px">MENU</h4>
              <el-col>
                <el-menu  class="card-left">
                  <el-menu-item index="1">
                    <el-icon style="color: rgba(27,134,249,0.71)"><eleme-filled /></el-icon>
                    <span>博客</span>
                  </el-menu-item>
                <el-menu-item index="2">
                  <el-icon style="color: #00d1b2"><HomeFilled /></el-icon>
                  <span>首页</span>
                </el-menu-item>
                <el-menu-item index="3" >
                  <el-icon style="color: #ff6b81"><edit-pen /></el-icon>
                  <span>新随笔</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <el-icon style="color: #10ac84"><box /></el-icon>
                  <span>草稿箱</span>
                </el-menu-item>
                  <el-menu-item index="5">
                    <el-icon style="color: #ffd257"><promotion /></el-icon>
                    <span>联系</span>
                  </el-menu-item>
                  <el-menu-item index="6">
                    <el-icon style="color: #00d1b2" ><histogram /></el-icon>
                    <span>订阅</span>
                  </el-menu-item>
                  <el-menu-item index="7">
                    <el-icon style="color: #48c774" ><setting /></el-icon>
                    <span>管理</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
            </el-row>
            <el-row>
              <h4 style="color: #5c5e6e;margin-left: 20px">LINKS</h4>
              <el-col>
                <el-menu  class="card-left">
                  <el-menu-item index="1">
                    <span>Git</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
            </el-row>
          </el-scrollbar>
        </el-aside>
        <el-container>
          <el-header>
            <el-input
            v-model="search_data"
            class="header-search"
            size="large"
            placeholder="请输入搜索内容"
            prefix-icon="Search"
          ></el-input>
          </el-header>
          <el-main noresize="true" style="background-color: #f5f6f7">
            <el-scrollbar>
<!--              中心内容-->
                <router-view></router-view>
            </el-scrollbar>
          </el-main>
        </el-container>
        <el-aside>
<!--          右侧边栏-->
          <el-scrollbar class="card-right">
            <p>BLOG INFO</p>
            <el-tabs v-model="activeName" class="card-right-tabs" @tab-click="handleClick">
              <el-tab-pane name="first">
                <template #label>
                  <el-icon><tickets /></el-icon>
                </template>
                <p>热门文章</p>
                <el-row v-for="item in 5" :key="item" gutter="5" style="margin-bottom: 20px;height: 55px" @click="contextCardClick(item)">
                  <el-col :span="6">
                    <el-image :src="text_url" fit="cover" style="height: 55px"></el-image>
                  </el-col>
                  <el-col :span="16">
                    <span style="margin-bottom: 3px">{{item}}. awk - 提取包含某个关键字的段落</span>
                    <span style="color: #98a6ad"><el-icon size="16px" style="color: #98a6ad"><video-camera-filled /></el-icon>123</span>
                </el-col>
                </el-row>
                <p>博主信息</p>
                <el-card style="font-size: 12px;color: #6e6e6e;margin-bottom: 10px;">
                  <el-row >
                    <el-col :span="12">
                      <span>博主昵称</span></el-col>
                    <el-col :span="12">zhooke</el-col>
                    <el-divider ></el-divider>
                  </el-row>
                  <el-row>
                    <el-col :span="12">运行天数</el-col>
                    <el-col :span="12">2年2个月</el-col>
                    <el-divider ></el-divider>
                  </el-row>
                  <el-row>
                    <el-col :span="12">文章数量</el-col>
                    <el-col :span="12">16</el-col>
                    <el-divider ></el-divider>
                  </el-row>
                  <el-row>
                    <el-col :span="12">评论数量</el-col>
                    <el-col :span="12">123</el-col>
                    <el-divider ></el-divider>
                  </el-row>
                  <el-row>
                    <el-col :span="12">博客粉丝</el-col>
                    <el-col :span="12">123</el-col>
                    <el-divider ></el-divider>
                  </el-row>
                </el-card>
                <p>标签</p>
                <el-tag v-for="item in 5" :key="item" style="margin: 0 0 10px 10px" @click="tagClick(item)">Tag {{ item }}</el-tag>
              </el-tab-pane>
              <el-tab-pane name="second">
                <template #label>
                  <el-icon><comment /></el-icon>
                </template>
                <span>2</span>
              </el-tab-pane>
              <el-tab-pane name="third">
                <template #label>
                  <el-icon><fold /></el-icon>
                </template>
                <span>3</span>
              </el-tab-pane>
            </el-tabs>
          </el-scrollbar>
        </el-aside>
      </el-container>
      <el-footer>
        <div class="footer-box">
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=62082602000173"><img src="@/assets/备案图标.png"/>甘公网安备 62082602000173号</a>
          |
          <a href="https://beian.miit.gov.cn/">陇ICP备2021003645号</a>
          | zhooke | © 2021-present
        </div>
      </el-footer>

    </el-container>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Index',
  data() {
    return {
      header_image_url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4fa94a8d213a0991007a99f37035cc06715b980c558e9-En6TDM_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649476198&t=9cd9bfde665ffde6b4ebd9ee2cd0ed9a',
      header_url: 'https://img2.baidu.com/it/u=2723317969,2981355550&fm=26&fmt=auto',
      text_url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F11020033428%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649771328&t=364f380b566aba545f1acfc37d0b1f85',
      currentPage4: ref(4),
      pageSize4: ref(4),
      small: ref(false),
      background: ref(false),
      disable: ref(false),
      activeName: ref('first'),
      search_data: ''
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`${val} items per page`)
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`)
    },
    handleClick(tab, event){
      console.log(tab, event)
    },
    // tag点击事件
    tagClick(val){
      console.log(val)
    },
    // 文章点击事件
    contextCardClick(val){
      console.log(val)
    }
  }
}
</script>

<style lang='less' scoped>
.main {
  height: 100vh;
  width: 100vw;
  font-family: "Microsoft YaHei","微软雅黑","MicrosoftJhengHei","华文细黑","STHeiti","MingLiu",serif!important;
  a:link {
    color:#6e6e6e;
    text-decoration:underline;
  }
  a:visited {
    color:#6e6e6e;
    text-decoration:none;
  }
  a:hover {
    color:#6e6e6e;
    text-decoration:none;
  }
  a:active {
    color:#6e6e6e;
    text-decoration:none;
  }
}

.el-main {
  --el-main-padding: 10px;
  height: 90vh;
  width: 100%;
  overflow: hidden
}

.el-aside {
  height: 95vh;
  width: 250px;
  .left-aside {
    background-color: #fff
  }
}

.el-header {
  height: 5vh;
  width: 100%;
  padding: 0;
}

.el-footer {
  height: 5vh;
  width: 100%;
}

.card-left{
  vertical-align: baseline;
  line-height: 1.5;
  flex-direction: column;
  padding-left: 10px;
  border-right: 0;
  .el-row{
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 40px;
  }
  .el-col{
    display: inline-flex;
    font-size: 16px;
  }
  .el-icon{
    margin-right: 10px;
    font-size: 16px;
  }
  .el-menu-item{
    color: #6e6e6e;
  }
}

.card-right{
  vertical-align: baseline;
  line-height: 1.5;
  flex-direction: column;
  padding-left: 10px;
  margin-right: 10px;
  .el-col{
    display: inline-flex;
    flex-direction:column;
    font-size: 12px;
  }
  .el-icon{
    margin-right: 10px;
    font-size: 20px;
    color: #6e6e6e;
  }
  .card-right-tabs{
    text-align: start;
    margin-top: 10px;
    .el-divider{
      margin: 10px 0 10px 0;
    }
    .el-col{
      color: #6e6e6e;
    }
  }
}

.header-search{
  width: 100%;
  padding: 3px 0;
}

.footer-box{
  /*position: fixed;*/
  width: 100%;
  //height: 30px;
  padding-top: 3px;
  //border-top: 1px solid #2c3e50;
  text-align: center;
  display: block;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
}
</style>
