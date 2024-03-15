<template>
  <el-scrollbar class="box">
    <el-scrollbar ref="scrollbarRef" style="height: 82vh;" @scroll="scroll">
      <div ref="innerRef">
        <div class="chat-header">
          <!--          <el-avatar :size="40" :src="avatar"></el-avatar>-->
          <div class="chat-header-content">
            <h3 class="chat-title">{{ title }}</h3>
            <span class="chat-status">{{ status }}</span>
          </div>
        </div>
        <div ref="chatBody" class="chat-body">
          <div v-for="message in messages" :key="message.id" class="chat-message">
            <div v-if="message.type===1" class="user-chat">
              <div class="message-avatar">
                <el-icon>
                  <Avatar/>
                </el-icon>
              </div>
              <div class="message-content">
                <div class="message-meta">
                  <span class="meta-name">{{ message.name }}</span>
                  <span class="meta-time">{{ message.time }}</span>
                </div>
                <div class="message-text">{{ message.text }}</div>
              </div>
            </div>
            <div v-if="message.type===2" class="gpt-chat">
              <div class="message-avatar">
                <el-icon>
                  <Monitor/>
                </el-icon>
              </div>
              <div class="message-content">
                <div class="message-meta">
                  <span class="meta-name">{{ message.name }}</span>
                  <span class="meta-time">{{ message.time }}</span>
                </div>
                <div class="message-text">{{ message.text }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div class="chat-wrapper" style="height: 5vh">
      <div class="chat-footer">
        <el-input v-model="message" clearable placeholder="输入要发送的消息"></el-input>
        <el-button style="margin-left: 5px" type="primary" @click="sendMessage">发送</el-button>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { chatApi } from '@/utils/api.js';
import 'element-plus/dist/index.css'
import { getCurrentInstance, onMounted, ref, watchEffect } from 'vue';
import { Avatar, Monitor } from '@element-plus/icons-vue';

const instance = getCurrentInstance()
const scrollbarRef = ref()
const innerRef = ref()
const messages = ref([]) // 消息列表数据
const message = ref('') // 输入框绑定数据
// 发送消息
const sendMessage = () => {
  if (!message.value) {
    return
  }
  const newMessage = {
    id: messages.value.length + 1,
    name: '我',
    type: 1,
    time: new Date().toLocaleTimeString(),
    text: message.value
  }
  messages.value.push(newMessage)

  const payload =
    {
      message: message.value,
      chatKey: '',
      model: ''
    }
  ;
  chatApi(payload).then(response => {
    const text = {
      id: messages.value.length + 1,
      name: 'GPT',
      type: 2,
      time: new Date().toLocaleTimeString(),
      text: response.data.data.context
    };
    messages.value.push(text);
    message.value = '';
    setTimeout(() => {
      scrollChatBottom()
    }, 0)
  })
    .catch(error => {
      console.log(error);
    });
  message.value = ''
  setTimeout(() => {
    scrollChatBottom()
  }, 0)
}

const scroll = ({ scrollTop }) => {

}

// 滚动到聊天区域底部
const scrollChatBottom = () => {
  scrollbarRef.value.setScrollTop(innerRef.value.clientHeight)
}

onMounted(() => {
  console.log(1411)

  let msg = window.sessionStorage.getItem('messages')
  if (msg !== undefined && msg !== null && msg !== '') {
    messages.value = JSON.parse(msg);
    setTimeout(() => {
      scrollChatBottom()
    }, 0)
  } else {
    const firstMsg = {
      id: 1,
      name: 'GPT',
      type: 2,
      time: new Date().toLocaleTimeString(),
      text: 'hello，欢迎使用ChatGPT!'
    };
    messages.value.push(firstMsg)
    window.sessionStorage.setItem('messages', JSON.stringify(firstMsg))

  }
})

watchEffect(() => {
  if (messages.value.length > 0) {
    window.sessionStorage.setItem('messages', JSON.stringify(messages.value))
  }
})

</script>
<style>
.box {
  height: 90vh;
  overflow: hidden
}

.chat-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  /*max-width: 400px;*/
  width: 100%;
  margin: 0 auto;
  /*border: 1px solid #dcdfe6; border-radius: 4px;*/
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #dcdfe6;
}

.chat-header-content {
  margin-left: 10px;
}

.chat-title {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.chat-status {
  margin: 0;
  font-size: 12px;
  color: #92959e;
}

.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.chat-message {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.message-avatar {
  margin-right: 10px;
}

.message-content {
  display: flex;
  flex-direction: column;
}

.message-meta {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.meta-name {
  margin-right: 6px;
  font-size: 14px;
  font-weight: bold;
}

.meta-time {
  margin-left: auto;
  font-size: 12px;
  color: #92959e;
}

.message-text {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 16px;
  background-color: #f0f0f0;
  line-height: 1.5;
  word-wrap: break-word;
  word-break: break-all;
}

.chat-footer {
  display: flex;
  align-items: center;
  /*border-top: 1px solid #dcdfe6; margin-top: 5px;*/
}

.el-input-group__append {
  margin-left: 10px;
}

.el-button {
  padding: 10px;
  border-radius: 4px;
}

.gpt-chat {
  display: flex;
  margin-right: auto;
}

.user-chat {
  display: flex;
  margin-left: auto;
}
</style>
