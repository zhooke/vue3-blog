<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img alt="" src="@/assets/login.png">
        <span>admin管理平台</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--        侧边栏菜单区域-->
        <el-menu
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activePath"
          :router="true"
          active-text-color="#409EFF"
          background-color="#333744"
          text-color="#fff"
          unique-opened>
          <!--          一级菜单-->
          <el-sub-menu v-for="item in menulist" :key="item.id" :index="item.id+''">
            <!--            一级菜单的模板区-->
            <template v-slot:title>
              <!--              图标-->
              <i :class="iconsObj[item.id]"></i>
              <!--              文本-->
              <span>{{ item.menuName }}</span>
            </template>
            <!--                二级菜单的模板区域-->
            <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="'/'+subItem.menuCode"
                          @click="saveNavState('/'+subItem.menuCode)">
              <template v-slot:title>
                <!--              图标-->
                <i class="el-icon-menu"></i>
                <!--              文本-->
                <span>{{ subItem.menuName }}</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>
          <div>
            <p class="vcenter" style="text-align: center">XXX科技有限公司</p>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        125: 'el-icon-s-opportunity',
        103: 'el-icon-s-check',
        101: 'el-icon-s-cooperation',
        102: 'el-icon-s-fold',
        145: 'el-icon-s-data',
        2000: 'el-icon-mobile-phone'
      },
      echartsObj: {
        menuName: '图表展示',
        children: [
          {
            menuName: '图表列表',
            children: [],
            index: 3000,
            order: null,
            menuCode: 'echarts'
          }
        ],
        id: 2000,
        index: 6,
        menuCode: 'echarts'
      },
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      this.menulist.push(this.echartsObj)
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存连接的激活的状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  //清空左内边距
  padding-left: 0;
  //左右贴边对其
  justify-content: space-between;
  //按钮居中
  align-items: center;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;
  }

  span {
    margin-left: 15px;
  }

  img {
    width: 180px;
    height: 50px;
  }
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-left: 10px;
}

.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  //间距
  letter-spacing: 0.2em;
  //鼠标移上去展示小手
  cursor: pointer;
}
</style>
