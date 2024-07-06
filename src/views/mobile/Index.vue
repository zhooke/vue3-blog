<script setup>

</script>

<template>
  <router-view />
  <van-tabbar route>
    <van-tabbar-item replace to="/mobile/blog/list" icon="newspaper">文章</van-tabbar-item>
    <van-tabbar-item replace to="/mobile/blog/hotspot" icon="fire">讨论</van-tabbar-item>
    <van-tabbar-item replace to="/mobile/blog/chat" icon="chat">chat</van-tabbar-item>
    <van-tabbar-item replace to="/mobile/blog/draft" icon="todo-list">草稿箱</van-tabbar-item>
    <van-tabbar-item replace to="/mobile/blog/user" icon="user">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped lang="less"></style>
