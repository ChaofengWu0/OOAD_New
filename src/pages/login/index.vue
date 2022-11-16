<template>
  <div class="login_container">
    <div class="login_box">
      <!--登录表单 -->
      <el-form class="login_form" :model="login_form" :rules="login_rule" ref="login_form_ref">
        <!--   用户名     -->
        <el-form-item label="Username" class="user_input" prop="username">
          <el-input v-model="login_form.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <!--密码-->
        <el-form-item label="Password" class="pwd_input" prop="password">
          <el-input v-model="login_form.password" prefix-icon="el-icon_pwd" type="password"></el-input>
        </el-form-item>

        <el-form-item class="select_button">
          <!--登录按钮-->
          <el-button type="primary" @click="login_test" class="login_button">
            login
          </el-button>

          <router-link to="/enroll">
            <el-button type="primary" @click="login_test" class="enroll_button">
              enroll
            </el-button>
          </router-link>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'index',
  data() {
    return {
      login_form: {
        username: "",
        password: ""
      },
      login_rule: {
        username: [
          {required: true, message: "Please input the username", trigger: "blur"},
          {min: 4, message: "At least four letters should be in the username", trigger: "blur"}
        ],
        password: [
          {required: true, message: "Please input the password", trigger: "blur"},
          {min: 3, message: "The password should be at least 3 letters", trigger: "blur"}
        ]
      }
    }
  },
  methods: {
    login_test() {
      // p22
      this.$refs.login_form_ref.validate(async valid => {
        if (!valid) return

        const {data: res} = this.$http.post('login', this.login_form)
        if (res.meta.status !== 200) return this.$message.error("Wrong!login failed")

        this.$message.success("Successfully login")
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
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



