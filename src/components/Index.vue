<template>
  <div class="main">
    <el-container>
      <el-container>
        <el-aside class="left-aside">
          <!--          左侧边栏-->
          <el-scrollbar>
            <left-card/>
          </el-scrollbar>
        </el-aside>
        <el-container>
          <el-header>
            <header-card/>
          </el-header>
          <el-main noresize="true" class="page-component__scroll">
            <!--            <el-scrollbar>-->
            <!--              中心内容-->
            <!--              添加:key="$route.fullPath
            由于这两个路由的$route.fullPath并不一样, 所以组件被强制不复用, 相关钩子加载顺序为:
            beforeRouteUpdate => created => mounted（通过绑定一个fullPath，可以识别当前页面路由的完整地址，
            当地址发生改变(包括参数改变)则重新渲染页面(例如动态路由参数的变化）
            -->
            <router-view :key="$route.fullPath"></router-view>
            <!--            </el-scrollbar>-->
            <el-backtop
              target=".page-component__scroll .el-scrollbar__wrap"
              :bottom="100"
              :visibility-height="50"
            ></el-backtop>
          </el-main>
        </el-container>
        <el-aside>
          <!--          右侧边栏-->
          <el-scrollbar>
            <right-card/>
          </el-scrollbar>
        </el-aside>
      </el-container>
      <el-footer>
        <!--        底部-->
        <footer-card/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import leftCard from '@/components/index/LeftCard';
import headerCard from '@/components/index/HeaderCard';
import rightCard from '@/components/index/RightCard';
import footerCard from '@/components/index/FooterCard';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Index',
  components: {
    'left-card': leftCard,
    'header-card': headerCard,
    'right-card': rightCard,
    'footer-card': footerCard
  }
}
</script>

<style lang='less' scoped>
.main {
  height: 100vh;
  width: 100vw;
  font-family: "Microsoft YaHei", "微软雅黑", "MicrosoftJhengHei", "华文细黑", "STHeiti", "MingLiu", serif !important;
  min-width: 1366px;
  min-height: 768px;
}

.el-main {
  --el-main-padding: 10px;
  height: 90vh;
  width: 100%;
  overflow: hidden;
  background-color: #f5f6f7;
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
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
