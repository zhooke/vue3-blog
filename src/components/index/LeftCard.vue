<template>
  <div>
      <p>BLOG MENU</p>
      <el-row>
        <h4 style="color: #5c5e6e;margin-left: 20px">MENU</h4>
        <el-col>
          <el-menu class="card-left" router>
            <el-menu-item index="/blog/list">
              <el-icon style="color: rgba(27,134,249,0.71)">
                <eleme-filled/>
              </el-icon>
              <span>博客</span>
            </el-menu-item>
            <el-menu-item index="/blog/list">
              <el-icon style="color: #00d1b2">
                <HomeFilled/>
              </el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/blog/create">
              <el-icon style="color: #ff6b81">
                <edit-pen/>
              </el-icon>
              <span>新随笔</span>
            </el-menu-item>
            <el-menu-item index="/blog/draft">
              <el-icon style="color: #10ac84">
                <box/>
              </el-icon>
              <span>草稿箱</span>
            </el-menu-item>
            <el-menu-item index="5">
              <el-icon style="color: #ffd257">
                <promotion/>
              </el-icon>
              <span>联系</span>
            </el-menu-item>
            <el-menu-item index="6">
              <el-icon style="color: #00d1b2">
                <histogram/>
              </el-icon>
              <span>订阅</span>
            </el-menu-item>
            <el-menu-item index="7">
              <el-icon style="color: #48c774">
                <setting/>
              </el-icon>
              <span>管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <el-row>
        <h4 style="color: #5c5e6e;margin-left: 20px">LINKS</h4>
        <el-col>
          <el-menu class="card-left">
            <el-menu-item index="1">
              <span>Git</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  name: 'LeftCard'
}
</script>

<style lang="less" scoped>
.card-left {
  vertical-align: baseline;
  line-height: 1.5;
  flex-direction: column;
  padding-left: 10px;
  border-right: 0;

  .el-row {
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 40px;
  }

  .el-col {
    display: inline-flex;
    font-size: 16px;
  }

  .el-icon {
    margin-right: 10px;
    font-size: 16px;
  }

  .el-menu-item {
    color: #6e6e6e;
  }
}
</style>
