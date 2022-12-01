<template>
  <div class="enroll_container">
    <div class="enroll_box">
      <!--      注册表单-->
      <el-form class="enroll_form" :model="enroll_form" ref="enroll_form_ref" :rules="enroll_rules">
        <!--   用户名-->
        <!--        <el-form-item label="账户" class="enroll_username" prop="userID"-->
        <!--                      :rules="[{ required: true, message: '请输入账户', trigger: 'blur' },]">-->
        <el-form-item label="昵称" class="enroll_username" prop="userID">
          <el-input v-model="enroll_form.nickName" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <el-form-item label="用户名" class="enroll_username" prop="username">
          <el-input v-model="enroll_form.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <!--        密码-->
        <el-form-item label="密码" class="enroll_password" prop="password">
          <el-input v-model="enroll_form.password" prefix-icon="el-icon_pwd" type="password"></el-input>
        </el-form-item>

        <!--     再次输入密码   -->
        <el-form-item label="请再次输入密码" class="enroll_password_again" prop="password_again">
          <el-input v-model="enroll_form.password_again" prefix-icon="el-icon_pwd" type="password"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" class="enroll_password_again" prop="email" :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
              ]">
          <el-input v-model="enroll_form.email" prefix-icon="el-icon_pwd"></el-input>
        </el-form-item>


        <el-form-item class="enroll_button">
          <el-button type="primary"
                     @click="enroll_test">
            注册
          </el-button>
        </el-form-item>
      </el-form>

      <h4 class="another_choose">
        已经有账户了？
        <router-link to="/login">登录</router-link>
      </h4>
    </div>
  </div>
</template>

<script>
// import {EnrollAPI} from "@/api";
// import qs from 'qs'
import requestUtil from "@/utils/request"

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
        nickName: "",
        username: "",
        password: "",
        password_again: "",
        email: "",
        phone: "",
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
      this.$refs.enroll_form_ref.validate(
          async valid => {
            if (!valid) return
            console.log('validated')
            const enrollData = {
              nickName: this.enroll_form.nickName,
              username: this.enroll_form.username,
              password: this.enroll_form.password,
              email: this.enroll_form.email,
              phone: this.enroll_form.phone
            };
            //发起请求
            const {data: res} = await requestUtil.post('/eduservice/t-user/register', enrollData)
            console.log(res);
            if (res.code !== 20000)
              return this.$message.error("错误！注册失败！")
            // 如果成功
            // 将返回的token 保存到 sessionStorage
            this.$message.success("注册成功！")
            await this.$router.push('/login')
          }
      )
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
  height: 600px;
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