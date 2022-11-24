<template>

  <div class="login_container">
    <div class="login_box">
      <!--登录表单 -->
      <el-form class="login_form" :model="loginForm" :rules="loginRules" ref="login_form_ref">
        <!--   用户名     -->
        <el-form-item label="Username" class="user_input" prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <!--密码-->
        <el-form-item label="Password" class="pwd_input" prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon_pwd" type="password"></el-input>
        </el-form-item>

        <!-- 记住密码 -->
        <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>

        <el-form-item class="select_button">
          <!--登录按钮-->
          <el-button type="primary" @click="loginHandler" class="login_button">
            login
          </el-button>

          <router-link to="/enroll">
            <el-button type="primary" class="enroll_button">
              enroll
            </el-button>
          </router-link>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import qs from 'qs'

import requestUtil from "@/utils/request"
import {encrypt, decrypt} from "@/utils/jsencrypt"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'index',
  data() {
    return {
      // 表单数据对象
      loginForm: {
        username: "admin",
        password: "admin",
        rememberMe: false
      },
      // 表单数据验证规则
      loginRules: {
        username: [
          {required: true, message: "Please input the username", trigger: "blur"},
          {min: 4, message: "The username should be at least 4 letters", trigger: "blur"}
        ],
        password: [
          {required: true, message: "Please input the password", trigger: "blur"},
          {min: 3, message: "The password should be at least 3 letters", trigger: "blur"}
        ]
      }
    }
  },
  methods: {
    //登录 11/18 少token
    loginHandler() {
      // p22
      this.$refs.login_form_ref.validate(async valid => {
        if (!valid) {
          console.log('验证失败')
          return
        }

        if (this.loginForm.rememberMe) {
          console.log('remember')
          // 记住用户名和密码，7天有效
          Cookies.set('username', this.loginForm.username, {expires: 7})
          Cookies.set('password', encrypt(this.loginForm.password), {expires: 7})
          Cookies.set("rememberMe", this.loginForm.rememberMe, { expires: 30 })
        } else {
          Cookies.remove('username')
          Cookies.remove('password')
          Cookies.remove("rememberMe")
        }
        // 向后端发送请求，获得数据
        const {data: res} = await requestUtil.post('/login?' + qs.stringify(this.loginForm))
        console.log(res);
        // 失败
        if (res.code !== 200)
          return this.$message.error("Wrong!login failed")
        // 成功，将返回的token 保存到 sessionStorage
        this.$message.success("Successfully login")
        this.$store.commit('setUserInfo', res.data)
        this.$store.commit('setToken', res.authorization)
        window.sessionStorage.setItem('token', res.data.role)
        this.getCookie()
        await this.$router.push('/main_page')
      })
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    resetForm() {
      this.$refs.login_form_ref.resetFields();
    },
  }
}
</script>

<style scoped>
.login_container {
  height: 100%;
  background-image: url("../../assets/img/login.jpg");
  background-size: cover;
}

.login_box {
  width: 450px;
  height: 300px;
  background: white;
  opacity: 75%;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login_form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login_button {
  position: absolute;
}

.enroll_button {
  position: absolute;
  left: 65%;
}

</style>



