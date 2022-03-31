<template>
  <div>
    <el-button size="small" type="primary" @click="LoginDialogVisible = true" plain>登陆</el-button>
    <el-button size="small" type="success" @click="registerDialogVisible =true" plain>注册</el-button>
    <!--    登陆-->
    <el-dialog
      v-model="LoginDialogVisible"
      title="用户登陆"
      width="450px"
    >
      <!--        登陆表单区-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form" label-width="90px">
        <!--        用户名-->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名或手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!--        密码-->
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock"
                    type="password"></el-input>
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
      title="注册"
      width="450px"
    >
      <!--        登陆表单区-->
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="90px">
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :multiple="true"
          >
            <el-avatar :src="registerForm.headImgUrl" :size="40"/>
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
        <el-form-item label="用户密码" prop="checkPassword">
          <el-input v-model="registerForm.checkPassword" placeholder="请再次输入密码"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="EMail">
          <el-input v-model="registerForm.EMail" placeholder="请输入邮箱地址"></el-input>
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

<script>
import { ref } from 'vue';
import { getLoginApi, registerUserApi } from '@/utils/api';
import axios from '@/utils/http';
import NProgress from 'nprogress';
import md5 from 'js-md5';

export default {
  name: 'LoginRegister',
  data() {
    return {
      LoginDialogVisible: ref(false),
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
      },
      registerFormRules: {
        nickname: [
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
        ],
        mobile: [
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
          },
          { validator: this.validatePass, trigger: 'blur' }

        ],
        checkPassword: [
          {
            required: true,
            message: '请再次输入登陆密码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur'
          },
          { validator: this.validatePass2, trigger: 'blur' }
        ],
        EMail: [
          {
            required: true,
            message: '请输入邮箱地址',
            trigger: 'blur'
          }
        ]
      },
      registerDialogVisible: ref(false),
      registerForm: {
        username: '',
        password: '',
        checkPassword: '',
        grant_type: 'password',
        headImgUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
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
        this.loginForm.password = md5(this.loginForm.password)
        const { data: result } = await getLoginApi(this.loginForm)
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
      })
    },
    validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.checkPassword) {
        callback(new Error('两次密码不相等'))
      } else {
        callback()
      }
    },
    validatePass2(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次密码不相等'))
      } else {
        callback()
      }
    },
    register() {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return
        this.registerForm.password = md5(this.registerForm.password)
        this.registerForm.checkPassword = md5(this.registerForm.checkPassword)
        await registerUserApi(this.registerForm)
        this.registerDialogVisible = false
        this.$message.success('注册成功')
        this.loginForm.username = this.registerForm.mobile
        this.loginForm.password = this.registerForm.password
        this.login()
      })
    },
    handleAvatarSuccess(response, uploadFile) {
      console.log(response)
      if (response.code === 200) {
        this.registerForm.headImgUrl = response.data.url
      } else {
        this.$message.warning('上传头像失败')
      }
    }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>

</style>
