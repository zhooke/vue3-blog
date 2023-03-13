<template>
  <div class="login_container">
    <div class="login_box">
      <!--        头像区-->
      <div class="avatar_box">
        <img alt="" src="@/assets/logo.png"/>
      </div>
      <!--        登陆表单区-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form" label-width="80px">
        <!--        用户名-->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <!--        密码-->
        <el-form-item prop="password" label="密码">
          <el-input v-model="loginForm.password" placeholder="请输入密码"
                    type="password"></el-input>
        </el-form-item>
        <!--        按钮-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import axios from '@/utils/http'
import NProgress from 'nprogress';
import { getLoginApi } from '@/utils/api';
import md5 from 'js-md5';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'index',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        grant_type: 'password'
      },
      loginFormRules: {
        username: [
          {
            required: true,
            message: '请输入用户名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入登陆密码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      /* await只能放在async修饰的函数中，表示异步执行该函数 */
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const passwordMd5 = md5(this.loginForm.password)
        const { data: result } = await getLoginApi({ username: this.loginForm.username, password: passwordMd5 })
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
        this.LoginDialogVisible = false
        await this.$router.push('/')
        this.$message.success('登陆成功！')
        location.reload()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-image: url("https://tensua-file.oss-cn-hangzhou.aliyuncs.com/images/4d3ea53c084bad6931a56d5158a48jpeg.jpeg");
  background-size: 100%;
}

.login_box {
  width: 450px;
  height: 260px;
  background-color: #fff;
  background-image: linear-gradient(to right, cornsilk, #efff91);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
