<template>
  <div>
    <el-button plain size="small" type="primary" @click="LoginDialogVisible = true">登陆</el-button>
    <el-button plain size="small" type="success" @click="registerDialogVisible =true">注册</el-button>
    <!--    登陆-->
    <el-dialog
      v-model="LoginDialogVisible"
      title="用户登陆"
      width="450px"
      @close="resetLoginForm"
    >
      <!--        登陆表单区-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="90px">
        <!--        用户名-->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名或手机号"/>
        </el-form-item>
        <!--        密码-->
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码"
                    type="password"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
                <!--        按钮-->
       <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
      </span>
      </template>
    </el-dialog>
    <!--    注册-->
    <el-dialog
      v-model="registerDialogVisible"
      :close-on-click-modal="false"
      title="注册"
      width="450px"
    >
      <!--        注册表单区-->
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="90px">
        <el-form-item label="头像">
          <el-upload
            :multiple="true"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            action="/api/upload"
            class="avatar-uploader"
          >
            <el-avatar :size="40" :src="registerForm.headImgUrl"/>
          </el-upload>
        </el-form-item>
        <!--        用户名-->
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="registerForm.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <!--        用户名-->
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="registerForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!--        密码-->
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="registerForm.password" placeholder="请输入密码"
                    type="password"></el-input>
        </el-form-item>
        <!--        <el-form-item label="用户密码" prop="checkPassword">-->
        <!--          <el-input v-model="registerForm.checkPassword" placeholder="请再次输入密码"-->
        <!--                    type="password"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="邀请码" prop="inviteCode">
          <el-input v-model="registerForm.inviteCode" placeholder="请输入邀请码"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
                <!--        按钮-->
       <el-button type="primary" @click="register">注册</el-button>
          <el-button type="info" @click="registerDialogVisible=false">取消</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue';
import {getLoginApi, registerUserApi} from '@/utils/api.js';
import axios from '@/utils/http';
import NProgress from 'nprogress';
import md5 from 'js-md5';
import router from "@/router/index.js";
import {ElMessage} from "element-plus";


let LoginDialogVisible = ref(false)
let loginForm = {
  username: '',
  password: '',
  grant_type: 'password'
}
let loginFormRef = ref()
let registerFormRef = ref()

let loginFormRules = reactive({
  username: ([
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
  ]),
  password: ([
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
  ])
})
let registerFormRules = {
  nickname: ([
    {
      required: true,
      message: '请输入用户昵称',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 15,
      message: '长度在 3 到 15 个字符',
      trigger: 'blur'
    }
  ]),
  mobile: ([
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'blur'
    },
    {
      min: 11,
      max: 11,
      message: '手机号码格式错误',
      trigger: 'blur'
    }
  ]),
  password: ([
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
    // { validator: this.validatePass, trigger: 'blur' }

  ]),
  // checkPassword: [
  //   {
  //     required: true,
  //     message: '请再次输入登陆密码',
  //     trigger: 'blur'
  //   },
  //   {
  //     min: 3,
  //     max: 15,
  //     message: '长度在 3 到 15 个字符',
  //     trigger: 'blur'
  //   },
  //   { validator: this.validatePass2, trigger: 'blur' }
  // ],
  EMail: ([
    {
      required: true,
      message: '请输入邮箱地址',
      trigger: 'blur'
    }
  ]),
  inviteCode: ([
    {
      required: true,
      message: '邀请码不能为空',
      trigger: 'blur'
    }
  ])
}
let registerDialogVisible = ref(false)
let registerForm = {
  nickname: '',
  password: '',
  checkPassword: '',
  headImgUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  inviteCode: ''
}


function resetLoginForm() {
  console.log('-----')
  loginFormRef.value.resetFields()
}

function login() {
  /* await只能放在async修饰的函数中，表示异步执行该函数 */
  loginFormRef.value.validate(async valid => {
    if (!valid) return
    const passwordMd5 = md5(loginForm.password)
    const {data: result} = await getLoginApi({username: loginForm.username, password: passwordMd5})
    console.log(result)
    window.sessionStorage.setItem('AccessToken', result.data.accessToken)
    window.sessionStorage.setItem('AccessTokenKey', result.data.AccessTokenKey)
    window.sessionStorage.setItem('userinfo', JSON.stringify(result.data.UserInfo))
    axios.interceptors.request.use(config => {
      NProgress.start()
      config.headers.Authorization = 'Bearer ' + result.data.AccessToken
      config.headers.AccessTokenKey = result.data.AccessTokenKey
      return config
    })
    LoginDialogVisible = false
    await router.push('/')
    ElMessage.success('登陆成功！')
    location.reload()
  })
}

function validatePass(rule, value, callback) {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.checkPassword) {
    callback(new Error('两次密码不相等'))
  } else {
    callback()
  }
}

function validatePass2(rule, value, callback) {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.password) {
    callback(new Error('两次密码不相等'))
  } else {
    callback()
  }
}

function register() {
  registerFormRef.value.validate(async valid => {
    if (!valid) return
    const md5Password = md5(registerForm.password)
    registerForm.checkPassword = md5(registerForm.checkPassword)
    const {data: result} = await registerUserApi({
      nickname: registerForm.nickname,
      password: md5Password,
      mobile: registerForm.mobile,
      headImgUrl: registerForm.headImgUrl,
      inviteCode: registerForm.inviteCode,
      userType: 'BLOG'
    })
    if (result.code === 200) {
      registerFormRef.value.resetFields()
      registerDialogVisible = false
      ElMessage.success('注册成功')
      loginForm.username = registerForm.mobile
      loginForm.password = md5Password
      login()
    }
  })
}

function handleAvatarSuccess(response, uploadFile) {
  console.log(response)
  if (response.code === 200) {
    registerForm.headImgUrl = response.data.url
  } else {
    ElMessage.warning('上传头像失败')
  }
}

</script>

<style lang="less" scoped>

</style>
