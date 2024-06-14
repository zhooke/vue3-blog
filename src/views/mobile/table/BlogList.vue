<template>
  <van-nav-bar left-arro title="最新文章">
    <template #right>
      <van-icon name="calendar-o" size="18" @click="showCalendarFun"/>
    </template>
  </van-nav-bar>

  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="getBlogList">
    <van-cell v-for="blog in blogList" :key="blog">
      <van-text-ellipsis :content="blog.title" @click="blogCardClick(blog.id)"></van-text-ellipsis>
    </van-cell>
    <van-back-top/>
  </van-list>

  <van-calendar v-model:show="showCalendar" :max-date="maxDate" :min-date="minDate" switch-mode="year-month"
                @confirm="calendarConfirmFun"/>
</template>

<script setup>
import {ref} from 'vue';
import {getBlogListApi} from '@/utils/api.js';
import {showNotify} from 'vant';
import router from '@/router/index.js';

let list = ref([]);
let loading = ref(false);
let finished = ref(false);
let showCalendar = ref(false);
let minDate = new Date(2020, 0, 1);
let maxDate = new Date();
let blogList = ref([]);
let blogRequest = {
  pageIndex: 1,
  pageSize: 10
};
let blog = ref({})

function getBlogList() {
  getBlogListApi(blogRequest).then(response => {
    if (response.data.code !== 200) {
      return showNotify({type: 'danger', message: response.data.data});
    }
    blogList.value.push(...response.data.data);
    loading.value = false;

    if (response.data.total < (response.data.pageIndex * response.data.pageSize)) {
      finished.value = true;
    }
    blogRequest.pageIndex = blogRequest.pageIndex + 1;
  })
}

function blogCardClick(value) {
  router.push({path: '/mobile/blog/read', query: {blogId: value}})
}

function showCalendarFun() {
  showCalendar.value = !showCalendar.value;
}

function calendarConfirmFun(value) {
  showCalendarFun()
  console.log(value)
}
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: left;
  // background-color: #39a9ed;
}

.van-text-ellipsis {
  font-weight: bold;
  text-align: left;
}
</style>
