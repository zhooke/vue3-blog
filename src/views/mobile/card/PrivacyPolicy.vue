<template>
  <van-nav-bar title="隐私政策"   left-text="返回" left-arrow @click-left="onClickLeft" />

</template>
<script setup>
import router from "@/router/index.js";

function onClickLeft() {
  router.back();
}
</script>
<style scoped lang="less">

</style>
