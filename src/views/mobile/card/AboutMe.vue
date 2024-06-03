<template>
  <van-nav-bar left-arrow left-text="返回" title="关于我们" @click-left="onClickLeft"/>

  <van-cell-group inset>
    <van-field label="免责说明" model-value="" readonly/>

    <van-field label="联系邮箱" model-value="zhooke@foxmail.com" readonly/>
  </van-cell-group>
</template>
<script setup>
import router from "@/router/index.js";

function onClickLeft() {
  router.back();
}
</script>
<style lang="less" scoped>

</style>
