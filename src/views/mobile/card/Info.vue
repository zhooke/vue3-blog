<template>
  <van-nav-bar title="关于" left-text="返回" left-arrow @click-left="onClickLeft"/>
  <van-cell-group title="设置">
    <van-cell title="通知设置" to="/mobile/blog/user/setting" is-link/>
    <van-cell title="通用设置" to="/mobile/blog/user/notices/setting" is-link/>
    <van-cell title="隐私设置" to="/mobile/blog/user/privacy/setting" is-link/>
  </van-cell-group>

  <van-cell-group title="协议">
    <van-cell title="用户协议" to="/mobile/blog/user/agreement" is-link/>
    <van-cell title="隐私政策" to="/mobile/blog/user/privacy/policy" is-link/>
  </van-cell-group>

  <van-cell-group title="关于">
    <van-cell title="反馈建议" to="/mobile/blog/user/suggestion" is-link/>
    <van-cell title="关于我们" to="/mobile/blog/user/about/me" is-link/>
  </van-cell-group>
</template>

<script setup>
import router from "@/router/index.js";

function onClickLeft() {
  router.back();
}
</script>

<style scoped lang="less">

</style>
