<template>
  <div>
    <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field name="uploader" label="头像">
          <template #input>
            <van-uploader v-model="uploaderHeadImgUrl"/>
          </template>
        </van-field>
        <van-field
          v-model="registerForm.nickname"
          name="昵称"
          label="昵称"
          placeholder="昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
        />
        <van-field
          v-model="registerForm.mobile"
          name="手机号码"
          label="手机号码"
          placeholder="手机号码"
          :rules="[{ required: true, message: '请输入手机号' }]"
        />
        <van-field
          v-model="registerForm.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="registerForm.inviteCode"
          name="邀请码"
          label="邀请码"
          placeholder="邀请码"
          :rules="[{ required: true, message: '请输入邀请码' }]"
        />
      </van-cell-group>
      <!--      <van-divider/>-->
      <div style="margin: 16px;">
        <van-row justify="space-between">
          <van-col span="10">
            <van-button round block type="default" native-type="submit">
              提交
            </van-button>
          </van-col>
        </van-row>
      </div>
    </van-form>
  </div>

</template>

<script setup>
import router from "@/router/index.js";
import {ref} from "vue";
import md5 from "js-md5";
import {getLoginApi, registerUserApi} from "@/utils/api.js";
import {showNotify} from "vant";
import axios from "@/utils/http.js";

const registerForm = ref({
  nickname: '',
  password: '',
  checkPassword: '',
  mobile: '',
  inviteCode: '',
  headImgUrl: '',
  userType: 'BLOG'
})
const loginRequest = ref({password: '', username: ''});

function onSubmit() {
  const md5Password = md5(registerForm.value.password)
  registerForm.value.checkPassword = md5(registerForm.value.checkPassword)
  registerUserApi(registerForm.value).then(result => {
    if (result.code === 200) {
      showNotify({type: 'success', message: '注册成功'})
      loginRequest.username = registerForm.value.mobile
      loginRequest.password = md5Password
      login()
    }
  })

}

function uploaderHeadImgUrl(file) {

}

function login() {
  const passwordMd5 = md5(loginRequest.value.password)
  getLoginApi({username: loginRequest.value.username, password: passwordMd5}).then(result => {
    if (result.data.code !== 200) {
      return showNotify({type: 'danger', message: result.data.data});
    }
    console.log(result)
    window.sessionStorage.setItem('AccessToken', result.data.AccessToken)
    window.sessionStorage.setItem('AccessTokenKey', result.data.AccessTokenKey)
    window.sessionStorage.setItem('userinfo', JSON.stringify(result.data.UserInfo))
    axios.interceptors.request.use(config => {
      NProgress.start()
      config.headers.Authorization = 'Bearer ' + result.data.AccessToken
      config.headers.AccessTokenKey = result.data.AccessTokenKey
      return config
    })
    router.push('/')
    showNotify({type: 'success', message: '登陆成功'});
    location.reload()
  })
}


function onClickLeft() {
  router.back();
}

</script>

<style scoped lang="less">

</style>
