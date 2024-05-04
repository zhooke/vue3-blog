<template>

  <div id="userInfo" v-show="userinfo.username">
    <van-nav-bar title="我的资料" right-text="编辑" @click-right="onClickRight"/>

    <van-row>
      <van-col span="10">
        <van-image
          round
          width="7rem"
          height="7rem"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
      </van-col>
      <van-col span="12">
        <van-cell-group>
          <van-cell title="用户名" value="zhooke"/>
          <van-cell title="文章数量" value="12"/>
        </van-cell-group>
      </van-col>
    </van-row>
    <van-divider/>

    <van-cell-group>
      <van-cell icon="newspaper" title="我的文章" is-link/>
      <van-cell icon="todo-list" title="草稿" is-link/>
      <van-cell icon="fire" title="沸点" is-link/>
    </van-cell-group>

  </div>
  <div v-show="!userinfo.username" id="registerBox">
    <van-nav-bar title="登陆" right-text="关于" @click-right="onClickRight"/>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="loginRequest.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="loginRequest.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <!--      <van-divider/>-->
      <div style="margin: 16px;">
        <van-row justify="space-between">
          <van-col span="10">
            <van-button round block type="default" native-type="submit">
              登陆
            </van-button>
          </van-col>
          <van-col span="10">
            <van-button round block type="primary" to="/mobile/blog/user/register">
              注册
            </van-button>
          </van-col>
        </van-row>
      </div>
    </van-form>
  </div>

</template>

<script setup>
import {ref} from "vue";
import router from "@/router/index.js";
import md5 from "js-md5";
import {getLoginApi} from "@/utils/api.js";
import axios from "@/utils/http.js";
import {showNotify} from "vant";

const userinfo = ref({});
const loginRequest = ref({password: '', username: ''});

function onClickRight() {
  router.push('/mobile/blog/user/info')
}

function onSubmit() {
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
</script>

<style scoped lang="less">
#userInfo {
  margin: 0 10px;
  //padding: 10px;
}

#registerBox {
  margin: 0 10px;

}
</style>
