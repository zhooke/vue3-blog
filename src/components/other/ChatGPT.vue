<template>
  <div class="chat-container">
    <div class="chat-messages">
      <div v-for="(message, index) in messages" :key="index"
           :class="{'user-message': message.is_user, 'bot-message': !message.is_user}">
        <div>{{ message.text }}</div>
      </div>
    </div>
    <div class="chat-input">
      <el-input v-model="inputText" placeholder="Type your message here" @keyup.enter.native="sendMessage"/>
      <el-button type="primary" @click="sendMessage">Send</el-button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';

const apiEndpoint = 'http://chatgpt.zhooke.shop/v1/completions';
const apiKey = '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';


let inputText = ''
let messages = []

function sendMessage() {
  if (inputText) {
    messages.push({ text: inputText, is_user: true });
    axios.post(apiEndpoint, {
      // messages: [{ role: 'user', content: inputText }],
      model: 'text-davinci-003',
      prompt: inputText,
      max_tokens: 7,
      temperature: 0,
      top_p: 1,
      n: 1,
      stream: false
    }, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      messages.push({ text: res.data.choices[0].text, is_user: false });
      inputText = '';
      console.log(messages)
    });
  }
}
</script>

<style scoped>

</style>
