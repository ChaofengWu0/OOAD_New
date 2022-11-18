<template>
  <div class="enroll_container">
    <div class="enroll_box">
      <!--      注册表单-->
      <el-form class="enroll_form" :model="enroll_form" ref="enroll_form_ref" :rules="enroll_rules">
        <!--   用户名-->
        <el-form-item label="Username" class="enroll_username" prop="username">
          <el-input v-model="enroll_form.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <!--        密码-->
        <el-form-item label="Password" class="enroll_password" prop="password">
          <el-input v-model="enroll_form.password" prefix-icon="el-icon_pwd" type="password"></el-input>
        </el-form-item>

        <!--     再次输入密码   -->
        <el-form-item label="Password_again" class="enroll_password_again" prop="password_again">
          <el-input v-model="enroll_form.password_again" prefix-icon="el-icon_pwd" type="password"></el-input>
        </el-form-item>

        <el-form-item class="enroll_button">
          <el-button type="primary"
                     @click="enroll_test">
            enroll
          </el-button>
        </el-form-item>
      </el-form>

      <div class="another_choose">
        Already have accounts?
        <router-link to="/login">LogIn</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "index",
  data() {
    let validate_enroll_passwordagain = (rule, value, callback) => {
      if (value !== this.enroll_form.password) {
        callback(new Error("Please make sure the two password blanks are the same"))
      } else {
        callback();
      }
    }

    return {
      enroll_form: {
        username: "",
        password: "",
        password_again: ""
      },
      enroll_rules: {
        username: [
          {required: true, message: "Please input the username", trigger: "blur"},
          {min: 4, message: "At least 4 letters should be filled in this blank", trigger: "blur"}
        ],
        password: [
          {required: true, message: "Please input the password", trigger: "blur"},
          {min: 3, message: "At least 3 letters should be filled in this blank", trigger: "blur"}
        ],
        password_again: [
          {required: true, message: "Please input the password_again", trigger: "blur"},
          {
            validator: validate_enroll_passwordagain,
            trigger: "blur"
          }
        ]
      }
    }
  },
  methods: {
    enroll_test() {
      //  先查password
      this.$refs.enroll_form_ref.validate(async (valid) => {
        if (!valid) return
        let baseUrl = "http://localhost:3333/api/usr"

        const {data: res} = this.$http.get(baseUrl + "/register", this.enroll_form)
        if (res.meta.status !== 200) return this.$message.error("Wrong!login failed")


        this.$message.success("Successfully register")
        console.log(res)
        window.sessionStorage.setItem('token', res.data.token)
        // this.$router.push('/teacher_center')
      })
    }
  }
}
</script>

<style scoped>
.enroll_container {
  height: 100%;
  background: url("../../assets/img/enroll.jpg");
  background-size: cover;
}

.enroll_box {
  height: 400px;
  width: 500px;
  background: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 75%;
  border-radius: 10px;
}

.enroll_form {
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
}

.enroll_button {
  position: absolute;
  top: 105%;
  left: 30%;
}

.another_choose {
  position: absolute;
  top: 100%;
}

</style>