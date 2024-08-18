<template>
  <div>
    <van-nav-bar left-arrow left-text="返回" title="注册" @click-left="onClickLeft"/>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field label="头像" name="uploader">
          <template #input>
            <van-uploader v-model="uploaderHeadImgUrl" :after-read="afterRead" :max-count="1"/>
          </template>
        </van-field>
        <van-field
          v-model="registerForm.nickname"
          :rules="[{ required: true, message: '请填写昵称' }]"
          label="昵称"
          name="昵称"
          placeholder="昵称"
        />
        <van-field
          v-model="registerForm.mobile"
          :rules="[{mobilePattern, message: '请输入手机号' }]"
          label="手机号码"
          name="手机号码"
          placeholder="手机号码"
        />
        <van-field
          v-model="registerForm.password"
          :rules="[{ required: true, message: '请填写密码' }]"
          label="密码"
          name="密码"
          placeholder="密码"
          type="password"
        />
        <van-field
          v-model="registerForm.inviteCode"
          :rules="[{ required: true, message: '请输入邀请码' }]"
          label="邀请码"
          name="邀请码"
          placeholder="邀请码"
        />
      </van-cell-group>
      <!--      <van-divider/>-->
      <div style="margin: 16px;">
        <van-row justify="space-between">
          <van-button block native-type="submit" round type="primary">
            注册
          </van-button>
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
const mobilePattern = /^1[3-9]\\d{9}$/;
const loginRequest = ref({password: '', username: ''});
const uploaderHeadImgUrl = ref([])

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

function afterRead(file) {

}

function login() {
  const passwordMd5 = md5(loginRequest.value.password)
  getLoginApi({username: loginRequest.value.username, password: passwordMd5}).then(result => {
    if (result.data.code !== 200) {
      return showNotify({type: 'danger', message: result.data.data});
    }
    console.log(result)
    window.sessionStorage.setItem('AccessToken', result.data.accessToken)
    window.sessionStorage.setItem('AccessTokenKey', result.data.accessTokenKey)
    window.sessionStorage.setItem('userinfo', JSON.stringify(result.data.oauthUserInfo))
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

<style lang="less" scoped>

</style>
