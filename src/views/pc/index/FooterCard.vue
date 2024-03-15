<template>
  <div class="footer-box">
    <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=62082602000173"><img src="@/assets/备案图标.png"/>甘公网安备
      62082602000173号</a>
    |
    <a href="https://beian.miit.gov.cn/">陇ICP备2021003645号</a>
    | zhooke | © 2021-present
  </div>
</template>

<script>
export default {
  name: 'FooterCard'
}
</script>

<style lang="less" scoped>

.footer-box {
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
