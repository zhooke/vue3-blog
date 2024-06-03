<template>
  <van-nav-bar left-arrow left-text="返回" title="通知设置" @click-left="onClickLeft"/>
  <van-field label="消息提醒" name="switch">
    <template #input>
      <van-switch v-model="checked"/>
    </template>
  </van-field>
  <van-field label="系统提醒" name="switch">
    <template #input>
      <van-switch v-model="checked"/>
    </template>
  </van-field>
</template>
<script setup>
import router from "@/router/index.js";
import {ref} from "vue";

const checked = ref(false)

function onClickLeft() {
  router.back();
}
</script>
<style lang="less" scoped>

</style>
