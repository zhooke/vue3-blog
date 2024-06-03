<template>
  <van-nav-bar left-arrow left-text="返回" title="反馈建议" @click-left="onClickLeft"/>
  <van-cell-group inset>
    <van-field
      v-model="message"
      autosize
      label="反馈"
      maxlength="50"
      placeholder="请输入反馈内容"
      rows="2"
      show-word-limit
      type="textarea"
    />

  </van-cell-group>

</template>
<script setup>
import router from "@/router/index.js";
import {ref} from "vue";

const message = ref("");

function onClickLeft() {
  router.back();
}
</script>
<style lang="less" scoped>

</style>
