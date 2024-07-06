<template>
  <div class="chat-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group>
        <van-cell
          v-for="(item, index) in list"
          :key="index"
          :label="item.content"
          :title="item.user"
          :value="item.time"
        >
          <template #default>
            <van-image
              width="40"
              height="40"
              fit="cover"
              round
              :src="item.avatar"
            />
          </template>
        </van-cell>
      </van-cell-group>
    </van-list>

    <van-cell-group>
      <van-field
        v-model="message"
        rows="1"
        autosize
        label="输入内容"
        placeholder="请输入内容"
        @submit="onSubmit"
      >
        <template #button>
          <van-button size="small" type="primary" @click="onSubmit">发送</van-button>
        </template>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import { ref } from 'vue';
import { List, Cell, Field, Image, Button } from 'vant';

export default {
  components: {
    VanList: List,
    VanCell: Cell,
    VanField: Field,
    VanImage: Image,
    VanButton: Button,
  },
  setup() {
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const message = ref('');

    const onLoad = () => {
      // 加载更多数据
      loading.value = true;
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          list.value.push({
            user: '用户' + Math.floor(Math.random() * 100),
            content: '消息内容' + Math.floor(Math.random() * 1000),
            time: '2023-04-01',
            avatar: 'https://example.com/avatar.jpg',
          });
        }
        loading.value = false;
      }, 1000);
    };

    const onSubmit = () => {
      if (message.value) {
        list.value.push({
          user: '我',
          content: message.value,
          time: '2023-04-01',
          avatar: 'https://example.com/avatar.jpg',
        });
        message.value = '';
      }
    };

    return {
      list,
      loading,
      finished,
      message,
      onLoad,
      onSubmit,
    };
  },
};
</script>

<style>
.chat-container {
  padding: 10px;
  height: 100%;
  overflow-y: auto;
}
</style>
