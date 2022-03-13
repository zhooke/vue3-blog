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
                    <el-icon style="color: #1B86F9"><eleme-filled /></el-icon>
                    <span>博客园</span>
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
                    <span>博客园</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
            </el-row>
          </el-scrollbar>
        </el-aside>
        <el-container>
          <el-header>Header</el-header>
          <el-main noresize="true" style="background-color: #f5f6f7">
            <el-scrollbar height="100%" style="width: 100%;">
<!--              个人资料展示-->
              <el-card class="header-card" :body-style="{padding:'0'}">
                <el-card class="header-card-background" :body-style="{padding:'0'}">
                </el-card>
                <el-image class="header-image" :src="header_image_url"/>
                <div class="user-info-card">
                  <el-row>
                    <p style="color: inherit;cursor: pointer;font-size: 22px;margin: 0!important;">
                      zhooke
                      <el-button type="primary" size="small">关注</el-button>
                    </p>
                  </el-row>
                  <el-row>
                    <p style="font-size: 14px">
                      <span style="margin-right: 16px;">园龄：5个月</span>
                      <a style="margin-right: 16px;">粉丝：0</a>
                      <a>粉丝：0</a>
                    </p>
                  </el-row>
                </div>
              </el-card>
<!--              正文部分-->
              <el-card v-for="item in 10" :key="item" class="article-card" :body-style="{padding:'0'}">
                <el-row style="height: 200px;width: 100%;" type="flex">
                  <el-col :span="6" style="height: 200px">
                    <el-image fit="cover" style="width: 100%; height: 100%" :src="header_url"/>
                  </el-col>
                  <el-col :span="18">
                    <el-card class="card-main">
                      <el-row>
                        <el-col class="card-title">
                          [置顶]博客园主题——atum2.0升级发布啦[置顶]
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col class="card-context">
                            摘要：atum主题部署文档 介绍 这是一款由VUE打造的简约型博客主题，兼容各大主流浏览器，响应式设计，PC、平板、手机等均可正常浏览。 特性 响应式设计，兼容手机端浏览器。 提供多种配置信息，方便各类用户进行个人定制化。 部署文档十分详细且部署快捷。 主题整体偏向简约、无太多不必要的特效画面、偏向于简洁
                        </el-col>
                      </el-row>
                      <el-divider/>
                      <el-row class="card-info" justify="start">
                        <el-col >
                          <span><el-icon><avatar/></el-icon></span>
                          <span>zhooke</span>
                        </el-col>
                        <el-col >
                          <span><el-icon><clock /></el-icon></span>
                          <span>2021-03-16 12:52</span>
                        </el-col>
                        <el-col>
                          <span><el-icon><search /></el-icon></span>
                          <span>3328 次浏览</span>
                        </el-col>
                        <el-col>
                          <span><el-icon><edit-pen /></el-icon></span>
                        <span>128 条评论</span>
                        </el-col>
                      </el-row>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
              <div class="demo-pagination-block">
                <div class="demonstration">All combined</div>
                <el-pagination
                  :currentPage="currentPage4"
                  :page-size="pageSize4"
                  :page-sizes="[100, 200, 300, 400]"
                  :small="small"
                  :disabled="disabled"
                  :background="background"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="400"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                >
                </el-pagination>
              </div>
            </el-scrollbar>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
        <el-aside>
<!--          右侧边栏-->
          <el-scrollbar class="card-right">
            <p>BLOG INFO</p>
            <el-row justify="start">
              <el-col :span="3"><a href="/"><el-icon><chat-dot-round /></el-icon></a>
              </el-col >
              <el-col :span="3">
                <a href="/"><el-icon><Bell /></el-icon></a>
              </el-col>
              <el-col :span="3">
                <a href="/"><el-icon> <setting /></el-icon></a>
              </el-col>
              <el-col :span="5"  style="margin-left: auto">
                <a href="/"> <el-icon><star /></el-icon></a>
              </el-col>
            </el-row>

            <el-tabs v-model="activeName" class="card-right-tabs" @tab-click="handleClick">
              <el-tab-pane name="first">
                <template #label>
                  <el-icon><tickets /></el-icon>
                </template>
                <p>热门文章</p>
                <el-row v-for="item in 5" :key="item" gutter="5" style="margin-bottom: 20px;height: 75px">
                  <el-col :span="6">
                    <el-image :src="text_url" fit="cover"></el-image>
                  </el-col>
                  <el-col :span="16">
                    <span style="margin-bottom: 3px">{{item}}. awk - 提取包含某个关键字的段落</span>
                    <span style="color: #98a6ad"><el-icon size="16px" style="color: #98a6ad"><video-camera-filled /></el-icon>123</span>
                </el-col>
                </el-row>
                <p>博主信息</p>
                <el-card style="font-size: 14px;color: #6e6e6e;margin-bottom: 10px">
                  <el-row >
                    <el-col :span="12">博主昵称</el-col>
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
      activeName: ref('first')
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
    }
  }
}
</script>

<style lang='less' scoped>
.main {
  height: 100vh;
  width: 100vw;
  font-family: "Microsoft YaHei","微软雅黑","MicrosoftJhengHei","华文细黑","STHeiti","MingLiu",serif!important;
}

.el-main {
  --el-main-padding: 10px;
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

.header-card {
  height: 300px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 1;
  margin-bottom: 10px;

  .header-card-background {
    padding: 0 !important;
    background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.haote.com%2Fupload%2Fnews%2F20180719%2F153200415280055.jpg&refer=http%3A%2F%2Fimg.haote.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636632616&t=1f405008387f5c124673a92f70d509cd);
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

.el-main {
  height: 90vh;
  width: 100%;
  //border: #000 0.1em solid;
  overflow: hidden
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  margin: 5px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.article-card {
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 1;

  //align-items: center;
  //justify-content: center;
  height: 200px;
  width: 100%;
  margin-bottom: 30px;
  border-radius: 10px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.el-aside {
  height: 100vh;
  width: 250px;
  .left-aside {
    background-color: #fff
  }
}

.el-header {
  height: 5vh;
  width: 100%;
}

.el-footer {
  height: 5vh;
  width: 100%;
}

.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-top: 10px;
  margin-bottom: 16px;
}

.card-main{
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

  .card-context{
    height: 70%;
    flex-wrap:wrap;
    min-height: 100px;
    line-height: 25px;
    font-size: 14px;
    color: #a2b0b7;
    word-break: break-word;
    // 文字自动换行
    white-space:normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 3;
  }
  .el-divider{
    margin: 5px 0;
  }
  .card-info{
    font-size: 10px;
    color: #a2b0b7;
    display: inline-block;
    .el-col{
      display: inline-flex;
      margin-right: 10px;
    }
    .el-icon{
      margin-right: 5px;
      font-size: 14px;
    }
  }
}

.card-left{
  vertical-align: baseline;
  line-height: 1.5;
  flex-direction: column;
  padding-left: 10px;
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
    flex-direction:column
  }
  .el-icon{
    margin-right: 10px;
    font-size: 20px;
    color: #6e6e6e;
  }
  .card-right-tabs{
    text-align: start;

    .el-divider{
      margin: 10px 0 15px 0;
    }
    .el-col{
      color: #6e6e6e;
    }
  }
}

</style>
