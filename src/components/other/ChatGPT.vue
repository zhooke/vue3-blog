<template>
  <el-scrollbar>
    <div>
      <div v-for="message in messages" :key="message.id">
        {{ message.text }}
      </div>
      <form @submit.prevent="sendMessage">
        <input v-model="text" type="text" placeholder="请输入消息..."/>
        <button type="submit">发送</button>
      </form>
    </div>
  </el-scrollbar>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      text: '',
      messages: []
    };
  },
  methods: {
    sendMessage() {
      if (this.text === '') {
        return;
      }

      const payload =
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: this.text }]
        }
      ;

      axios
        .post('https://chatgpt.zhooke.shop/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: this.text }]
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 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'
          }
        })
        .then(response => {
          const message = {
            id: this.messages.length + 1,
            text: response.data.choices[0].message.content
          };
          this.messages.push(message);
          this.text = '';
          console.log(this.messages)
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
