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
        <div class="chat-body" ref="chatBody">
          <div v-for="message in messages" :key="message.id" class="chat-message">
            <div class="user-chat" v-if="message.type===1">
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
            <div class="gpt-chat" v-if="message.type===2">
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
        <el-input v-model="message" placeholder="输入要发送的消息" clearable></el-input>
        <el-button type="primary" style="margin-left: 5px" @click="sendMessage">发送</el-button>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { chatApi } from '@/utils/api';
import 'element-plus/dist/index.css'
import { ElButton, ElInput, ElScrollbar } from 'element-plus';
import { getCurrentInstance, onMounted, ref, watchEffect } from 'vue';

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
  let msg = window.sessionStorage.getItem('messages')
  if (msg !== undefined && msg !== null && msg !== '') {
    messages.value = JSON.parse(msg);
    setTimeout(() => {
      scrollChatBottom()
    }, 0)
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
//border: 1px solid #dcdfe6; border-radius: 4px;
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
//border-top: 1px solid #dcdfe6; margin-top: 5px;
}

.el-input-group__append {
  margin-left: 10px;
}

.el-button {
  padding: 10px;
  border-radius: 4px;
}

.gpt-chat {
  margin-left: auto;
  display: flex;
}

.user-chat {
  display: flex;
  margin-right: auto;
}
</style>
