<template>
  <div class="mavonCreate">
    <el-scrollbar>
      <el-row class="top-row">
        <el-col :span="2">
          <!--          <el-breadcrumb separator-icon="ArrowRight"  size="large">-->
          <!--          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
          <!--          <el-breadcrumb-item>发布</el-breadcrumb-item>-->
          <!--        </el-breadcrumb>-->
          <el-button size="large" icon="ArrowLeftBold" @click="goBack">返回首页</el-button>
        </el-col>
        <el-col :span="20">
          <el-input v-model="blog.title" size="large" clearable placeholder="请输入标题"/>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" size="large" @click="dialogVisible = true">发布文章</el-button>
        </el-col>
      </el-row>
      <mavon-editor @save="save" @imgAdd="imgAdd" @imgDel="imgDel" :toolbars="markdownOption" v-model="blog.content"
                    style="min-height:800px;width: 100%">
      </mavon-editor>
      <el-dialog
        v-model="dialogVisible"
        title="发布文章"
        :before-close="handleCloseDialog"
      >
        <el-form :model="blog" label-width="auto" label-position="left">
          <el-form-item label="文章标题">
            <el-input v-model="blog.title"/>
          </el-form-item>
          <el-form-item label="封面摘要：">
            <el-radio-group v-model="blog.resource">
              <el-radio label="单图"/>
              <el-radio label="三图"/>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文章标签：">
            <el-tag
              style="margin-right: 10px"
              v-for="tag in dynamicTags"
              :key="tag"
              size="large"
              closable
              :disable-transitions="false"
              @close="handleCloseTag(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="InputRef"
              type="text"
              v-model="inputValue"
              style="width: 100px"
              size="default"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button v-else size="default" @click="showInput" style="color: #a2b0b7">
              +添加文章标签
            </el-button>
          </el-form-item>
          <el-form-item label="文章类型：">
            <el-radio-group v-model="blog.isOriginal">
              <el-radio label="0" border>原创</el-radio>
              <el-radio label="1" border>转摘</el-radio>
              <el-radio label="2" border>翻译</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发布形式：">
            <el-radio-group v-model="blog.isPrivate">
              <el-radio label="0">公开</el-radio>
              <el-radio label="1">私密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否置顶：">
            <el-radio-group v-model="blog.isTop">
              <el-radio label="0">默认</el-radio>
              <el-radio label="1">置顶</el-radio>
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
import { nextTick, ref } from 'vue';
import { ElInput } from 'element-plus';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Create',
  data() {
    return {
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        // fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        // htmlcode: true, // 展示html源码
        // help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        // save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true // 单双栏模式
        // preview: true // 预览
      },
      handbook: '#### how to use mavonEditor in nuxt.js',
      blog: {
        authorId: '',
        authorName: '',
        title: '',
        content: '#### how to use mavonEditor in nuxt.js',
        picture: '',
        isTop: ref(0),
        isPrivate: ref(0),
        isOriginal: ref(1)
      },
      dialogVisible: ref(false),
      dynamicTags: ['Tag 1', 'Tag 2', 'Tag 3'],
      inputVisible: ref(false),
      inputValue: '',
      InputRef: ref < ElInput >(ElInput),
      isSave: ref(false)
    };
  },
  methods: {
    async save() {
      const user = JSON.parse(window.sessionStorage.getItem('userinfo'))
      this.blog.authorId = user.id
      this.blog.authorName = user.nickname
      const { data: result } = await this.$http.post('blog/add', this.blog);
      console.log(result)
      if (result.code !== 200) {
        this.isSave = true
        return this.$message.error(result.data)
      }
      this.$message.success('发布成功');
      await this.goBack()
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
    },
    goBack() {
      this.$router.push('/')
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
.top-row {
  margin: 10px;
  font-size: 16px;
}
</style>
