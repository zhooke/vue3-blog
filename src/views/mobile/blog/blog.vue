<template>
  <van-nav-bar left-arrow left-text="返回" title="文章" @click-left="onClickLeft"/>

  <MarkDown :showViewer="true" :value="blog.content" style="width: 100%;text-align: justify !important;">
  </MarkDown>
</template>

<script setup>
import router from '@/router';
import { onMounted } from 'vue';
import MarkDown from '@/views/pc/plugins/MarkDown.vue';

let blog = {
  content: '',
  createUserId: ''
};
const onClickLeft = () => history.back();


onMounted(() => {
  blog = router.params.blog
  console.log(blog);
})
</script>


<style lang="less" scoped></style>
