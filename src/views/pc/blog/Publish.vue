<template>
  <div class="main">
    <el-scrollbar>
      <el-row class="top-row">
        <el-col :span="2">
          <!--          <el-breadcrumb separator-icon="ArrowRight"  size="large">-->
          <!--          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
          <!--          <el-breadcrumb-item>发布</el-breadcrumb-item>-->
          <!--        </el-breadcrumb>-->
          <el-button icon="ArrowLeftBold" size="large" @click="goBack">返回首页</el-button>
        </el-col>
        <el-col :span="18">
          <el-input v-model="blog.title" clearable placeholder="请输入标题" size="large"/>
        </el-col>
        <el-col :span="2">
          <el-button size="large" type="primary" @click="saveDraft">保存草稿</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="large" type="danger" @click="dialogVisible = true">发布文章</el-button>
        </el-col>
      </el-row>
      <MarkDown :showEditor="true" :value="blog.content" style="width: 100%;z-index: 100;height: calc(100vh - 100px);"
                @content="getContext">
      </MarkDown>
      <el-dialog
        v-model="dialogVisible"
        :before-close="handleCloseDialog"
        title="发布文章"
      >
        <el-form :model="blog" label-position="left" label-width="auto">
          <el-form-item label="文章标题">
            <el-input v-model="blog.title"/>
          </el-form-item>
          <el-form-item label="封面摘要：">
            <el-radio-group v-model="blog.resource">
              <el-radio label="默认"/>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文章标签：">
            <div class="tag-card">
              <el-row>
                <el-col span="24" style="min-height: 40px">
                  <el-tag
                    v-for="tag in dynamicTags"
                    :key="tag"
                    :disable-transitions="false"
                    closable
                    size="large"
                    style="margin-right: 10px;"
                    @close="handleCloseTag(tag)"
                  >
                    {{ tag.name }}
                  </el-tag>
                </el-col>
              </el-row>
              <el-row>
                <el-card>
                  <el-col span="24">
                    <span>标签</span>
                    <el-input v-model="tagInput.name" placeholder="请输入文字搜索，Enter键入可添加自定义标签"
                              @keydown.enter="createTag"/>
                  </el-col>

                  <p>已添加标签：</p>
                  <el-col span="24">
                    <el-checkbox-group v-model="tagCheckedList" :max="5" :min="0">
                      <el-checkbox v-for="item in blogTagList" :key="item" :label="item"
                                   name="type"
                                   @change="checkboxChange($event,item)">{{
                          item.name
                        }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                  <el-col :offset="16" :span="24" style="font-size: 14px;color: #a2b0b7;">
                    剩余可添加标签：{{ blogTagList.length }}/10
                  </el-col>
                </el-card>
              </el-row>
            </div>

          </el-form-item>

          <el-form-item label="文章类型：">
            <el-radio-group v-model="blog.isOriginal">
              <el-radio :label="1" border>原创</el-radio>
              <el-radio :label="2" border>转摘</el-radio>
              <el-radio :label="3" border>翻译</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发布形式：">
            <el-radio-group v-model="blog.isPrivate">
              <el-radio :label="0">公开</el-radio>
              <el-radio :label="1">私密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否置顶：">
            <el-radio-group v-model="blog.isTop">
              <el-radio :label="0">默认</el-radio>
              <el-radio :label="1">置顶</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
          <el-button type="danger" @click="onSubmit">发布文章</el-button>
          <el-button @click="dialogVisible = false">返回</el-button>
      </span>
        </template>
      </el-dialog>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, unref } from 'vue'
import { ElInput, ElMessage, ElMessageBox } from 'element-plus'
import { createTagApi, getTagApi, publishBlogApi } from '@/utils/api.js'
import MarkDown from '../plugins/MarkDown.vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router'
import router from '@/router/index.js'

const route = useRoute()

const blog = ref({
  authorId: '',
  authorName: '',
  title: '',
  content: '',
  picture: '',
  isTop: 0,
  isPrivate: 0,
  isOriginal: 1,
  tags: '',
  isDraft: 0
})
let dialogVisible = ref(false)
const dynamicTags = []
const inputVisible = ref(false)
let inputValue = ''
const InputRef = ref < ElInput >(ElInput)
const isSave = ref(false)
let blogTag = {}
let blogTagList = []
const buttonRef = ref()
const popoverRef = ref()
const tagInput = {
  name: ''
}
const tagChecked = ref(false)
const tagCheckedList = []

function getContext(str) {
  blog.value.content = str
}

function save() {
  const user = JSON.parse(window.sessionStorage.getItem('userinfo'))
  blog.value.authorId = user.id
  blog.value.authorName = user.nickname
  blog.value.tags = dynamicTags.map(tag => tag.id).join(',')

  publishBlogApi(blog.value).then(response => {
    if (response.data.code !== 200) {
      isSave.value = true
      return ElMessage.error(response.data.data)
    }
  })
  goBack()
  window.onbeforeunload = null
}

function imgAdd(pos, $file) {

}

function imgDel() {

}

function handleCloseDialog() {
  dialogVisible = ref(false)
}

function handleCloseTag(tag) {
  dynamicTags.splice(dynamicTags.indexOf(tag), 1)
  console.log(tagCheckedList)
  const index = tagCheckedList.indexOf(tag)
  if (index > -1) {
    tagCheckedList.splice(index, 1)
  }
}

function handleInputConfirm() {
  if (inputValue) {
    console.log(inputValue)
    console.log(dynamicTags)
    dynamicTags.push(inputValue)
  }
  inputVisible.value = false
  inputValue = ''
}

function showInput() {
  inputVisible.value = true
  nextTick(() => {
    // this.InputRef.!value.!input.focus()
    ref.InputRef.focus()
  })
}

function onSubmit() {
  dialogVisible = false
  isSave.value = true
  save()
  ElMessage.success('发布成功')
}

function goBack() {
  router.push('/')
}

function createTag() {
  if (blogTagList.length >= 10) {
    return ElMessage.warning('最多可添加10个标签')
  }
  createTagApi(tagInput)
  blogTag = ''
  tagInput.name = ''
  const result = async () => {
    await getTagApi()
  }
  blogTagList.push(result.data[result.data.length - 1])
}

function onClickOutside() {
  unref(popoverRef)
}

function checkboxChange(val, tag) {
  if (val) {
    dynamicTags.push(tag)
  } else {
    const index = dynamicTags.indexOf(tag)
    if (index > -1) {
      dynamicTags.splice(index, 1)
    }
  }
}

function getTag() {
  getTagApi().then(response => {
    blogTagList = response.data
  })
}

function saveDraft() {
  blog.value.isDraft = 1
  isSave.value = true
  save()
  ElMessage.success('保存成功')
}

function uploadImage(v) {
  console.log(v)
}

onMounted(() => {
  window.onbeforeunload = function (e) {
    e = e || window.event
    // 兼容IE8和Firefox 4之前的版本
    if (e) {
      e.returnValue = '关闭提示'
    }
    // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    return '关闭提示'
  }
  getTag()
})

onBeforeRouteUpdate((to, from, next) => {
  // 在当前路由改变，但是该组件被复用时调用
  // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  // 可以访问组件实例 `this`
  // 不支持传递回调(因为this实例已经创建可以获取到，所以没必要)
  next()
})

onBeforeRouteLeave((to, from) => {
  if (isSave.value) {
    return
  }
  return ElMessageBox.confirm('您还没有保存文章呢，确认离开？').then(() => {
    window.onbeforeunload = null
  }).catch(() => {
    return false
  })
})

</script>

<style lang="less" scoped>
.main {
  min-width: 1366px;
  min-height: 768px;
}

.top-row {
  margin: 10px;
  font-size: 16px;
}

.tag-card {
  flex-direction: column;
  justify-content: start;
  display: inline-block;
  text-align: left;
  width: 100%;

  .el-card {
    width: 100%;
  }
}

.el-dialog {
  min-width: 720px;
  min-height: 740px;
}
</style>
