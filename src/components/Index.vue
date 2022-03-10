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
                <el-image style="height: 100%;width: 25%;display: inline-block;vertical-align: top;" :src="header_image_url" />
                <el-card style="height: 100%;width: 75%;"></el-card>
                {{ item }}
              </el-card>
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
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Index',
  data() {
    return {
      header_image_url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4fa94a8d213a0991007a99f37035cc06715b980c558e9-En6TDM_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649476198&t=9cd9bfde665ffde6b4ebd9ee2cd0ed9a'
      // fit: ['fill', 'contain', 'cover', 'none', 'scale-down']
    }
  }
}
</script>

<style lang='less' scoped>
.main {
  height: 100vh;
  width: 100vw;
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
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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
  border: #000 0.1em solid;
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

  align-items: center;
  justify-content: center;
  height: 200px;
  width: 100%;
  margin-bottom: 15px;
  text-align: center;
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
  border: #000 1px solid
}

.el-footer {
  height: 5vh;
  width: 100%;
  border: #000 1px solid
}

</style>
