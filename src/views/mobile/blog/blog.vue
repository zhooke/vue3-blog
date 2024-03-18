<template>
  <van-nav-bar left-arrow left-text="返回" title="文章" @click-left="onClickLeft" />

  <!-- <MarkDown :showViewer="true" :value="blog.content" style="width: 100%;text-align: justify !important;">
  </MarkDown> -->
  <div class="context" v-html="compiledMarkdown"></div>
</template>

<script setup>
import router from '@/router';
import { onMounted, ref } from 'vue';
import MarkDown from '@/views/pc/plugins/MarkDown.vue';
import { useRoute } from 'vue-router';
import { getBlogByIdApi } from '@/utils/api.js'
import { marked } from "marked";

let route = useRoute();

let blogId;
let blog = ref({ content: '' });
let compiledMarkdown = ref('');
const onClickLeft = () => history.back();

function getBlog(id) {
  getBlogByIdApi(id).then(response => {
    if (response.data.code !== 200) {
      return showNotify({ type: 'danger', message: response.data.data });
    }
    blog.value = response.data.data;
    console.log(blog.value.content);

    compiledMarkdown.value = marked.parse(blog.value.content)

  })
};

onMounted(() => {
  blogId = route.query.blogId
  getBlog(blogId)
});
</script>


<style lang="less" scoped></style>
