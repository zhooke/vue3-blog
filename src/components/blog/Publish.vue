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
      <!--      <mavon-editor v-model="blog.content" :toolbars="markdownOption" style="min-height:800px;width: 100%"-->
      <!--                    @imgAdd="imgAdd" @imgDel="imgDel"-->
      <!--                    @save="save">-->
      <!--      </mavon-editor>-->
      <MarkDown :value="blog.content" :plugins="plugins" @change="handleChange" :defShowEditor="true"
                style="width: 100%;z-index: 100;height: calc(100vh - 100px);">

      </MarkDown>
      <!--      <Editor :value="blog.content" :locale="zhHans" :plugins="plugins" @change="handleChange"-->
      <!--              :editorConfig="editorConfig" :uploadImages="uploadImage"-->
      <!--              style="width: 100%;z-index: 100;height: calc(100vh - 100px);">-->
      <!--      </Editor>-->
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
                    <el-checkbox-group v-model="tagCheckedList" :min="0" :max="5">
                      <el-checkbox v-for="item in blogTagList" :key="item" :label="item"
                                   @change="checkboxChange($event,item)"
                                   name="type">{{
                          item.name
                        }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                  <el-col :span="24" :offset="16" style="font-size: 14px;color: #a2b0b7;">
                    剩余可添加标签：{{ blogTagList.length }}/10
                  </el-col>
                </el-card>
              </el-row>
            </div>

          </el-form-item>

          <el-form-item label="文章类型：">
            <el-radio-group v-model="blog.isOriginal">
              <el-radio border :label="1">原创</el-radio>
              <el-radio border :label="2">转摘</el-radio>
              <el-radio border :label="3">翻译</el-radio>
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

<script>
import { nextTick, ref, unref } from 'vue';
import { ElInput } from 'element-plus';
import { createTagApi, getTagApi, publishBlogApi } from '@/utils/api';
import gfm from '@bytemd/plugin-gfm'
import frontmatter from '@bytemd/plugin-frontmatter'
import highlight from '@bytemd/plugin-highlight'
import footnotes from '@bytemd/plugin-footnotes'
import gemoji from '@bytemd/plugin-gemoji'
import zhHans from '../../locales/zh_Hans.json'
import 'juejin-markdown-themes/dist/channing-cyan.min.css'
import 'bytemd/dist/index.css' // 导入编辑器样式
import MarkDown from '@/components/plugs/MarkDown.vue'; // 导入编辑器样式


const plugins = [
  gfm(),
  frontmatter(),
  highlight(),
  footnotes(),
  gemoji()
  // Add more plugins here
]
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Create',
  components: { MarkDown },
  data() {
    return {
      plugins,
      zhHans,
      editorConfig: {},
      blog: {
        authorId: '',
        authorName: '',
        title: '',
        content: '',
        picture: '',
        isTop: ref(0),
        isPrivate: ref(0),
        isOriginal: ref(1),
        tags: '',
        isDraft: ref(0)
      },
      dialogVisible: ref(false),
      dynamicTags: [],
      inputVisible: ref(false),
      inputValue: '',
      InputRef: ref < ElInput >(ElInput),
      isSave: ref(false),
      blogTag: {},
      blogTagList: [],
      buttonRef: ref(),
      popoverRef: ref(),
      tagInput: {
        name: ''
      },
      tagChecked: ref(false),
      tagCheckedList: []
    };
  },
  methods: {
    async save() {
      const user = JSON.parse(window.sessionStorage.getItem('userinfo'))
      this.blog.authorId = user.id
      this.blog.authorName = user.nickname
      this.blog.tags = this.dynamicTags.map(tag => tag.id).join(',')

      const { data: result } = await publishBlogApi(this.blog);

      console.log(result)
      if (result.code !== 200) {
        this.isSave = true
        return this.$message.error(result.data)
      }
      await this.goBack()
      window.onbeforeunload = null
    },
    imgAdd(pos, $file) {

    },
    imgDel() {

    },
    handleCloseDialog() {
      this.dialogVisible = false;
    },
    handleCloseTag(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      console.log(this.tagCheckedList)
      const index = this.tagCheckedList.indexOf(tag);
      if (index > -1) {
        this.tagCheckedList.splice(index, 1);
      }
    },
    handleInputConfirm() {
      if (this.inputValue) {
        console.log(this.inputValue)
        console.log(this.dynamicTags)
        this.dynamicTags.push(this.inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    showInput() {
      this.inputVisible = true
      nextTick(() => {
        // this.InputRef.!value.!input.focus()
        this.$refs.InputRef.focus()
      })
    },
    onSubmit() {
      this.dialogVisible = false
      this.isSave = true
      this.save()
      this.$message.success('发布成功');
    },
    goBack() {
      this.$router.push('/')
    },
    async createTag() {
      if (this.blogTagList.length >= 10) {
        return this.$message.warning('最多可添加10个标签')
      }
      await createTagApi(this.tagInput)
      this.blogTag = ''
      this.tagInput.name = ''
      const { data: result } = await getTagApi();
      this.blogTagList.push(result.data[result.data.length - 1])
    },
    onClickOutside() {
      unref(this.popoverRef)
    },
    checkboxChange(val, tag) {
      if (val) {
        this.dynamicTags.push(tag)
      } else {
        const index = this.dynamicTags.indexOf(tag);
        if (index > -1) {
          this.dynamicTags.splice(index, 1);
        }
      }
    },
    async getTag() {
      const { data: result } = await getTagApi();
      this.blogTagList = result.data
    },
    saveDraft() {
      this.blog.isDraft = 1
      this.isSave = true
      this.save()
      this.$message.success('保存成功');
    },
    handleChange(v) {
      this.blog.content = v
    },
    uploadImage(v) {
      console.log(v)
    }

  },
  mounted() {
    window.onbeforeunload = function (e) {
      e = e || window.event;
      // 兼容IE8和Firefox 4之前的版本
      if (e) {
        e.returnValue = '关闭提示';
      }
      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      return '关闭提示';
    }
    this.getTag()
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // 不支持传递回调(因为this实例已经创建可以获取到，所以没必要)
    next()
  },
  beforeRouteLeave(to, from) {
    if (this.isSave) {
      return;
    }
    return this.$confirm('您还没有保存文章呢，确认离开？').then(() => {
      window.onbeforeunload = null
    }).catch(() => {
      return false;
    })
  }
}
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
