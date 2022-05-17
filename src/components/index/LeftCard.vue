<template>
  <div class="left-box">
    <p>BLOG MENU</p>
    <el-row>
      <el-col>
        <h4 style="color: #5c5e6e;text-align: start;margin-left: 20px;">MENU</h4>
        <!--        <el-row justify="space-around">-->
        <!--          <el-col span="8"><h4 style="color: #5c5e6e;text-align: start;margin-left: 20px;">MENU</h4></el-col>-->
        <!--          <el-col span="8" style="margin: auto 0 ">-->
        <!--            <el-button type="info" size="small" icon="Fold" circle @click="collapse=!collapse"/>-->
        <!--          </el-col>-->
        <!--        </el-row>-->
        <!--        todo 添加收起功能-->
        <el-menu class="card-left" router :collapse="collapse">
          <el-menu-item index="1" :route="{path:'/blog/list',query:{userId : userinfo === null ? null : userinfo.id}}">
            <el-icon style="color: rgba(27,134,249,0.71)">
              <eleme-filled/>
            </el-icon>
            <span>博客</span>
          </el-menu-item>
          <el-menu-item index="2" :route="{path:'/blog/list'}">
            <el-icon style="color: #00d1b2">
              <HomeFilled/>
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <el-icon style="color: #ff6b81">
              <edit-pen/>
            </el-icon>
            <span>发布</span>
          </el-menu-item>
          <el-menu-item index="/blog/draft">
            <el-icon style="color: #10ac84">
              <box/>
            </el-icon>
            <span>草稿</span>
          </el-menu-item>
          <el-menu-item index="/">
            <el-icon style="color: #ffd257">
              <promotion/>
            </el-icon>
            <span>联系</span>
          </el-menu-item>
          <el-menu-item index="/">
            <el-icon style="color: #00d1b2">
              <histogram/>
            </el-icon>
            <span>订阅</span>
          </el-menu-item>
          <el-menu-item index="/">
            <el-icon style="color: #48c774">
              <setting/>
            </el-icon>
            <span>管理</span>
          </el-menu-item>
          <h4 style="color: #5c5e6e;text-align: start;margin-left: 20px;">LINKS</h4>
          <el-menu-item index="/other/Info">
            <el-icon style="color: #48c774">
              <info-filled/>
            </el-icon>
            <span>信息</span>
          </el-menu-item>
          <el-menu-item index="/other/donation">
            <el-icon style="color: #48c774">
              <CreditCard/>
            </el-icon>
            <span>捐赠</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { InfoFilled } from '@element-plus/icons-vue';

export default {
  name: 'LeftCard',
  components: { InfoFilled },
  data() {
    return {
      userinfo: {},
      collapse: false
    }
  },
  mounted() {
    this.userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
  }
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
