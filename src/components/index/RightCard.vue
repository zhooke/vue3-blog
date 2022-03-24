<template>
  <div class="card-right">
    <el-row justify="space-between" style="margin: 10px">
      <el-row v-if="blogUserInfo === undefined">
        <el-button size="small" type="primary" plain>登陆</el-button>
        <el-button size="small" type="success" plain>注册</el-button>
      </el-row>
      <el-row v-else>
        <el-dropdown>
          <el-image style="max-width: 30px;max-height: 30px;border-radius: 20%" fit="cover" :src="userinfo.headImgUrl">
            <template #error>
              <div class="image-slot">
                <el-icon>
                  <icon-picture/>
                </el-icon>
              </div>
            </template>
          </el-image>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="userInfoDialogVisible=true">个人资料</el-dropdown-item>
              <el-dropdown-item @click="settingDialogVisible=true">参数配置</el-dropdown-item>
              <el-dropdown-item @click="tagSettingDialogVisible=true">标签管理</el-dropdown-item>
              <el-dropdown-item @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-row>
    </el-row>
    <el-tabs v-model="activeName" class="card-right-tabs" @tab-click="handleClick">
      <el-tab-pane name="first">
        <template #label>
          <el-icon>
            <tickets/>
          </el-icon>
        </template>
        <p>热门文章</p>
        <el-row class="hot-blog-card" v-for="(item,index) in blogTop5List" :key="index" gutter="5"
                style="margin-bottom: 20px;height: 55px;" @click="blogCardClick(item.id)">
          <el-col :span="6">
            <el-image :src="text_url" fit="cover" style="height: 55px"></el-image>
          </el-col>
          <el-col :span="16">
            <span style="margin-bottom: 3px">{{ index + 1 }}. {{ item.title }}</span>
            <span style="color: #98a6ad"><el-icon size="16px" style="color: #98a6ad"><View/></el-icon>{{
                item.blogBrowse
              }}</span>
          </el-col>
        </el-row>
        <p>博主信息</p>
        <el-card style="font-size: 12px;color: #6e6e6e;margin-bottom: 10px;">
          <el-row>
            <el-col :span="12">
              <span>博主昵称</span></el-col>
            <el-col :span="12">{{ blogUserInfo.nickname }}</el-col>
            <el-divider></el-divider>
          </el-row>
          <el-row>
            <el-col :span="12">运行天数</el-col>
            <el-col :span="12">{{ blogUserInfo.runningDay }}</el-col>
            <el-divider></el-divider>
          </el-row>
          <el-row>
            <el-col :span="12">文章数量</el-col>
            <el-col :span="12">{{ blogUserInfo.blogCount }}</el-col>
            <el-divider></el-divider>
          </el-row>
          <el-row>
            <el-col :span="12">评论数量</el-col>
            <el-col :span="12">{{ blogUserInfo.commentCount }}</el-col>
            <el-divider></el-divider>
          </el-row>
          <el-row>
            <el-col :span="12">博客粉丝</el-col>
            <el-col :span="12">{{ blogUserInfo.followCount }}</el-col>
            <el-divider></el-divider>
          </el-row>
        </el-card>
        <p>标签</p>
        <el-tag v-for="item in blogTagList" :key="item" style="margin: 0 0 10px 10px" @click="tagClick(item)">{{
            item.name
          }}
        </el-tag>
      </el-tab-pane>
      <el-tab-pane name="second">
        <template #label>
          <el-icon>
            <comment/>
          </el-icon>
        </template>
        <p>最新评论</p>
        <el-row class="hot-blog-card" v-for="(item,index) in blogCommentNewestList" :key="index" gutter="5"
                style="margin-bottom: 20px;height: 55px;" @click="blogCardClick(item.blogId)">
          <el-col :span="6">
            <el-image :src="text_url" fit="cover" style="height: 55px"></el-image>
          </el-col>
          <el-col :span="16">
            <span style="margin-bottom: 3px">{{ index + 1 }}.@ {{ item.createUserName }} 说：</span>
            <span style="color: #98a6ad">{{ item.comment }}</span>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane name="third">
        <template #label>
          <el-icon>
            <fold/>
          </el-icon>
        </template>
        <span>广告招租</span>
      </el-tab-pane>
    </el-tabs>
    <!--    个人资料-->
    <el-dialog
      v-model="userInfoDialogVisible"
      title="个人资料"
      width="30%"
    >
      <el-form :model="userinfo" label-width="80px" :disabled="userInfoDisabled">
        <el-form-item label="头像">
          <!--          todo 修改头像cover-->
          <el-upload
            :disabled="userInfoDisabled"
            class="avatar-uploader"
            action="/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :multiple="true"
          >
            <el-image fit="cover" :src="userinfo.headImgUrl"
                      style="max-height: 50px;max-width: 50px;border-radius: 50%"/>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userinfo.nickname"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="userinfo.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="userinfo.mobile"/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userinfo.email"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
              <el-button @click="userinfoEditBut" v-show="userInfoButShow">编辑</el-button>
        <el-button type="primary" @click="userinfoEditSaveBut" v-show="!userInfoButShow">保存</el-button>
      </span>
      </template>
    </el-dialog>
    <!--    个人配置-->
    <el-dialog
      v-model="settingDialogVisible"
      title="Tips"
      width="30%"
    >
      <el-form :model="settingForm" label-width="120px">
        <el-form-item label="Activity name">
          <el-input/>
        </el-form-item>

      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="settingDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="settingDialogVisible = false">Confirm</el-button>
      </span>
      </template>
    </el-dialog>
    <!--    标签设置-->
    <el-dialog
      v-model="tagSettingDialogVisible"
      title="Tips"
      width="30%"
    >
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
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="tagSettingDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="tagSettingDialogVisible = false">Confirm</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>


import { ref } from 'vue';
import { blogTop5Api, commentNewestApi, createTagApi, getBlogUserApi, getTagApi, updateUserInfoApi } from '@/utils/api';

export default {
  name: 'RightCard',
  data() {
    return {
      header_image_url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4fa94a8d213a0991007a99f37035cc06715b980c558e9-En6TDM_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649476198&t=9cd9bfde665ffde6b4ebd9ee2cd0ed9a',
      header_url: 'https://img2.baidu.com/it/u=2723317969,2981355550&fm=26&fmt=auto',
      text_url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F11020033428%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649771328&t=364f380b566aba545f1acfc37d0b1f85',
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      currentPage4: ref(4),
      pageSize4: ref(4),
      small: ref(false),
      background: ref(false),
      disable: ref(false),
      activeName: ref('first'),
      search_data: '',
      blogTop5List: [],
      blogCommentNewestList: [],
      blogTagList: [],
      blogUserInfo: {},
      userInfoDialogVisible: ref(false),
      settingDialogVisible: ref(false),
      settingForm: ref(),
      userinfo: {
        headImgUrl: ''
      },
      userInfoButShow: ref(true),
      userInfoDisabled: ref(true),
      tagSettingDialogVisible: ref(false),
      dynamicTags: [],
      tagInput: {
        name: ''
      },
      tagChecked: ref(false),
      tagCheckedList: []
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    handleSizeChange(val) {
      console.log(`${val} items per page`)
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // tag点击事件
    async tagClick(val) {
      console.log(val)
    },
    async blogCardClick(val) {
      await this.$router.push({ path: '/blog/read', query: { blogId: val } })
    },
    async commentNewest() {
      const { data: result } = await commentNewestApi();
      this.blogCommentNewestList = result.data;
    },
    async blogTop5() {
      const { data: result } = await blogTop5Api();
      this.blogTop5List = result.data;
    },
    async getTag() {
      const { data: result } = await getTagApi();
      this.blogTagList = result.data
    },
    async getUser() {
      const { data: result } = await getBlogUserApi()
      this.blogUserInfo = result.data
    },
    userinfoEditBut() {
      this.userInfoButShow = false;
      this.userInfoDisabled = false
    },
    async userinfoEditSaveBut() {
      this.userInfoDialogVisible = false
      this.userInfoDisabled = true
      this.userInfoButShow = true
      const userinfo = {
        newNickname: this.userinfo.nickname,
        newHeadImgUrl: this.userinfo.headImgUrl,
        newEMail: this.userinfo.email,
        newMobile: this.userinfo.mobile,
        newSex: this.userinfo.sex,
        newAddress: this.userinfo.address
      }
      const { data: result } = await updateUserInfoApi(userinfo)
      console.log(result)
      if (result.code === 200) {
        window.sessionStorage.setItem('userinfo', JSON.stringify(result.data))
        this.$message.success('更新数据成功')
      }
    },
    handleAvatarSuccess(response, uploadFile) {
      console.log(response)
      if (response.code === 200) {
        this.userinfo.headImgUrl = response.data.url
      } else {
        this.$message.warning('上传头像失败')
      }
    },
    async createTag() {
      if (this.blogTagList.length >= 10) {
        return this.$message.warning('最多可添加10个标签')
      }
      await createTagApi(this.tagInput)
      this.blogTag = ''
      const { data: result } = await getTagApi();
      this.blogTagList.push(result.data[result.data.length - 1])
    }
  },
  mounted() {
    this.userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
    this.commentNewest()
    this.blogTop5()
    this.getTag()
    this.getUser()
  }
}
</script>

<style lang="less" scoped>
.card-right {
  vertical-align: baseline;
  line-height: 1.5;
  flex-direction: column;
  padding-left: 10px;
  margin-right: 10px;

  .el-col {
    display: inline-flex;
    flex-direction: column;
    font-size: 12px;
  }

  .el-icon {
    margin-right: 10px;
    font-size: 20px;
    color: #6e6e6e;
  }

  .card-right-tabs {
    text-align: start;
    margin-top: 10px;

    .el-divider {
      margin: 10px 0 10px 0;
    }

    .el-col {
      color: #6e6e6e;
    }
  }
}

.el-avatar {
  img {
    width: 50px;
  }
}

.hot-blog-card:hover {
  cursor: pointer;
}
</style>
