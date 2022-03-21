<template>
  <div class="mavonCreate">
    <el-scrollbar>
      <el-row class="top-row">
        <el-col :span="2">
          <!--          <el-breadcrumb separator-icon="ArrowRight"  size="large">-->
          <!--          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
          <!--          <el-breadcrumb-item>发布</el-breadcrumb-item>-->
          <!--        </el-breadcrumb>-->
          <el-button icon="ArrowLeftBold" size="large" @click="goBack">返回首页</el-button>
        </el-col>
        <el-col :span="20">
          <el-input v-model="blog.title" clearable placeholder="请输入标题" size="large"/>
        </el-col>
        <el-col :span="2">
          <el-button size="large" type="danger" @click="dialogVisible = true">发布文章</el-button>
        </el-col>
      </el-row>
      <mavon-editor v-model="blog.content" :toolbars="markdownOption" style="min-height:800px;width: 100%"
                    @imgAdd="imgAdd" @imgDel="imgDel"
                    @save="save">
      </mavon-editor>
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
              <el-radio label="单图"/>
              <el-radio label="三图"/>
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
                    <el-input v-model="tagInput.name" placeholder="请输入文字搜索，Enter键入可添加自定义标签" @keydown.enter="createTag"/>
                  </el-col>

                  <p>已添加标签：</p>
                  <el-col span="24">
                    <el-checkbox-group v-model="checkedCities" :min="0" :max="5">
                      <el-checkbox v-for="item in blogTagList" :key="item" :label="item"
                                   @change="checkboxChange($event,item)"
                                   name="type">{{
                          item.name
                        }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                </el-card>
              </el-row>
            </div>

            <!--            <el-input-->
            <!--              v-if="inputVisible"-->
            <!--              ref="InputRef"-->
            <!--              v-model="inputValue"-->
            <!--              size="default"-->
            <!--              style="width: 100px"-->
            <!--              type="text"-->
            <!--              @blur="handleInputConfirm"-->
            <!--              @keyup.enter="handleInputConfirm"-->
            <!--            />-->
          </el-form-item>

          <el-form-item label="文章类型：">
            <el-radio-group v-model="blog.isOriginal">
              <el-radio border label="0">原创</el-radio>
              <el-radio border label="1">转摘</el-radio>
              <el-radio border label="2">翻译</el-radio>
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
import { nextTick, ref, unref } from 'vue';
import { ElInput } from 'element-plus';
import { createTagApi, getTagApi, publishBlogApi } from '@/utils/api';

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
        isOriginal: ref(1),
        tags: ''
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
      checkedCities: ref()
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
    },
    async createTag() {
      await createTagApi(this.tagInput)
      this.blogTag = ''
      const { data: result } = await getTagApi();
      this.blogTagList.push(result.data[result.data.length - 1])
    },
    async getTag() {
      const { data: result } = await getTagApi();
      this.blogTagList = result.data
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
</style>
