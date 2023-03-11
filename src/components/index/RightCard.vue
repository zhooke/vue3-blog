<template>
  <div class="card-right">
    <el-scrollbar>
      <el-row justify="space-between" style="margin: 10px">
        <el-row v-if="tokenStr === null">
          <LoginRegister/>
        </el-row>
        <el-row v-else>
          <span style="margin:auto 0;">个人资料</span>
          <el-dropdown>
            <el-image style="max-width: 30px;max-height: 30px;border-radius: 20%;margin-left: 30px" fit="cover"
                      :src="userinfo.headImgUrl">
              <template #error>4
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
          <el-row class="hot-blog-card" v-for="(item,index) in blogTop5List" :key="index" gutter="20"
                  @click="blogCardClick(item.id)">
            <el-col :span="8">
              <el-image :src="item.picture === '' ? text_url : item.picture" fit="cover"></el-image>
            </el-col>
            <el-col :span="16">
              <span class="hot-blog-title">{{ index + 1 }}. {{ item.title }}</span>
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
          <el-row class="hot-blog-card" v-for="(item,index) in blogCommentNewestList" :key="index" gutter="20"
                  @click="blogCardClick(item.blogId)">
            <el-col :span="6">
              <el-icon size="40"><UserFilled /></el-icon>
<!--              <el-image :src="text_url" fit="cover" style="height: 55px"></el-image>-->
            </el-col>
            <el-col :span="16">
            <span style="margin-bottom: 3px;height: 36px">{{
                index + 1
              }}.@ {{ item.createUserName === null ? item.ipAddress : item.createUserName }} 说：</span>
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
        width="420px"
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
        width="420px"
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
      <!--    todo 待完善-->
      <el-dialog
        v-model="tagSettingDialogVisible"
        title="设置标签"
        width="420px"
      >
        <div class="tag-card">
          <el-row>
            <el-card>
              <el-tag
                v-for="tag in blogTagList"
                :key="tag"
                class="mx-1"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
                style="margin: 5px"
              >
                {{ tag.name }}
              </el-tag>
              <el-input
                v-if="inputVisible"
                ref="InputRef"
                v-model="inputValue"
                class="ml-1 w-20"
                size="small"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
              />
              <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                + New Tag
              </el-button>

              <el-col :span="24" :offset="14" style="font-size: 12px;color: #a2b0b7;">
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
    </el-scrollbar>

  </div>
</template>

<script>


import { ref } from 'vue';
import { blogTop5Api, commentNewestApi, createTagApi, getBlogUserApi, getTagApi, updateUserInfoApi } from '@/utils/api';
import LoginRegister from '@/components/login/LoginRegister';

export default {
  name: 'RightCard',
  components: { LoginRegister },
  data() {
    return {
      text_url: 'https://bpic.588ku.com/element_origin_min_pic/01/48/73/4357443aa53522b.jpg',
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
        address: '',
        createTime: '',
        email: '',
        headImgUrl: '',
        id: 1000000,
        mobile: '',
        nickname: '',
        sex: 0,
        username: ''
      },
      userInfoButShow: ref(true),
      userInfoDisabled: ref(true),
      tagSettingDialogVisible: ref(false),
      dynamicTags: [],
      tagInput: {
        name: ''
      },
      tagChecked: ref(false),
      tagCheckedList: [],
      tokenStr: ''
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/blog/list')
      this.$message.success('退出成功')
      location.reload()
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
      const { data: result } = await commentNewestApi({ blogAuthorId: this.userinfo.id });
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
      location.reload()
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
    const user = JSON.parse(window.sessionStorage.getItem('userinfo'))
    if (user) {
      this.userinfo = user
    }
    this.tokenStr = window.sessionStorage.getItem('AccessToken')

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
  max-width: 235px;

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

.hot-blog-card {
  margin-bottom: 20px;
  height: 55px;

  .el-image {
    height: 55px;
    width: 55px;
    border-radius: 30%;
  }
}

.hot-blog-title {
  height: 36px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 3px;
}

.hot-blog-card:hover {
  cursor: pointer;
}

.tag-card {
  flex-direction: column;
  justify-content: start;
  display: inline-block;
  text-align: left;
  width: 100%;

  .el-input {
    width: 350px;
  }
}
</style>
