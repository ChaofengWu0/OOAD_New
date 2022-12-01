<template>
  <div class="login_container">
    <div class="login_box">
      <el-form class="login_form" :model="loginForm" :rules="loginRules" ref="login_form_ref">
        <el-form-item label="账号" class="user_input" prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="pwd_input" prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon_pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item class="select_button">
          <el-button type="primary" @click="loginHandler" class="login_button">
            登录
          </el-button>
          <router-link to="/enroll">
            <el-button type="primary" class="enroll_button">
              注册
            </el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import requestUtil from "@/utils/request"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'index',
  data() {
    return {
      // 表单数据对象
      loginForm: {
        username: "",
        password: ""
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
    loginHandler() {
      this.$refs.login_form_ref.validate(async valid => {
        if (!valid) {
          this.$message.error('验证失败')
          return
        }
        const {data: res} = await requestUtil.post('/eduservice/login?' + qs.stringify(this.loginForm))
        if (res.code !== 20000)
          return this.$message.error("Wrong!login failed")
        this.$store.commit('setUserInfo', res.data)
        this.$store.commit('setToken', res.data.data.authorization)
        this.$store.commit('setRole', res.data.data.role)
        this.$message.success("Successfustatelly login")
        await this.$router.push('/main_page')
      })
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