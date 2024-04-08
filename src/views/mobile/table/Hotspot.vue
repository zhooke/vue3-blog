<template>
  <van-nav-bar title="最新热门"/>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">


      <van-cell v-for="item in list" :key="item">
        <div>
          <van-image
            height="3rem"
            round
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            width="3rem"
          />
          <van-text-ellipsis
            :content="item+text"
            :rows="item%2?3:1"
            collapse-text="收起"
            expand-text="展开"/>
        </div>

      </van-cell>
    </van-list>
  </van-pull-refresh>
</template>

<script setup>
import {ref} from "vue";

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const text =
  '那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。';
const onLoad = () => {
  setTimeout(() => {
    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }

    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }
    loading.value = false;

    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
</script>

<style lang="less" scoped></style>
