<template>
  <div class="main">
    <el-container>
      <el-container>
        <el-aside class="left-aside">
          <el-scrollbar>
            <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
          </el-scrollbar>
        </el-aside>
        <el-container>
          <el-header>Header</el-header>
          <el-main noresize="true" style="background-color: #f5f6f7">
            <el-scrollbar height="100%" style="width: 100%;">
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
          <el-scrollbar>
            <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
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
      currentPage4: ref(4),
      pageSize4: ref(4),
      small: ref(false),
      background: ref(false),
      disable: ref(false)
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`${val} items per page`)
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`)
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
  //text-align: center;
  border-radius: 10px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.el-aside {
  height: 100vh;
  width: 200px;

  .left-aside {
    background-color: #fff
  }
}

.el-header {
  height: 5vh;
  width: 100%;
  //border: #000 1px solid
}

.el-footer {
  height: 5vh;
  width: 100%;
  //border: #000 1px solid
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
    height: 100px;
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

</style>
