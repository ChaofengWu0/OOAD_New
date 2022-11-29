<template>
  <div class="personal_center_container">

    <div class="info_box">
      <div class="left_ele">
        <div class="avatar">
          <el-avatar :size="250" :src=this.original_data.avatar></el-avatar>
        </div>

      </div>


      <div class="right_ele">
        <div class="right_container">
          <h2 style="font-family: 隶书;font-size: 30px;">个人信息</h2>
          <ul class="info_items">
            <li style="list-style:none">
              <h3> 账号: {{ this.original_data.userId }} </h3>
            </li>
            <li style="list-style:none">
              <h3> 昵称: {{ this.original_data.nickName }}</h3>
            </li>
            <li style="list-style:none">
              <h3> 邮件: {{ this.original_data.email }}</h3>
            </li>
            <li style="list-style:none">
              <h3> 电话: {{ this.original_data.phone }}</h3>
            </li>
          </ul>


          <el-button type="primary" icon="el-icon-edit" @click="edit_info" style="font-size: 30px;margin-right: 5%"
                     plain>
            <div style="margin-left: 2%">编 辑</div>
          </el-button>

        </div>
      </div>
    </div>
    <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="change_form">
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="change_form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email" :rules="[
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ]">
          <el-input v-model="change_form.email" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="change_form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
              class="upload-demo"
              action="http://localhost:9001/eduoss/fileoss"
              :auto-upload="true"
              :on-success="success"
          >
            <el-button size="text" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" style="width: 80px; height: 50px">
          <h3>取 消</h3>
        </el-button>
        <el-button type="primary" @click="submit" style="width: 80px; height: 50px">
          <h3>确 定</h3>
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import requestUtil from "@/utils/request"
import qs from "qs";

export default {
  name: "personalCenter",
  data() {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
    return {
      original_data: {
        userId: userInfo.data.id,
        nickName: userInfo.data.nickName,
        avatar: userInfo.data.avatar,
        phone: userInfo.data.phone,
        address: userInfo.data.address,
        email: userInfo.data.email

      },

      formLabelWidth: "120px",
      dialogFormVisible: false,
      change_form: {
        name: userInfo.data.nickName,
        phone: userInfo.data.phone,
        email: userInfo.data.email,
        avatar: userInfo.data.avatar
      }
    }
  },
  created() {

  },

  methods: {
    edit_info() {
      this.dialogFormVisible = true
    },

    cancel() {
      this.change_form.name = this.original_data.nickName
      this.change_form.avatar= this.original_data.avatar
      this.change_form.phone = this.original_data.phone
      this.change_form.email = this.original_data.email
      this.dialogFormVisible = false
    },
    async submit() {
      // 要交给后端数据，并且从后端拿到数据，再赋给头像
      this.original_data.nickName = this.change_form.name
      this.original_data.phone = this.change_form.phone
      this.original_data.email = this.change_form.email
      this.dialogFormVisible = false
      console.log(qs.stringify(this.original_data))
      const {data: res} = await requestUtil.post('/eduservice/t-user/update?' + qs.stringify(this.original_data))
      console.log(res)
      // 失败
      if (res.code !== 20000)
        return this.$message.error("Wrong!login failed")
      // 成功
      this.$store.commit("setUserInfo", res.data)
    },
    success(res, file) {
      this.original_data.avatar = res.data.url
      console.log(file)
    }
  }

}
</script>

<style scoped>
* {
  padding: 0;
}

.personal_center_container {
  position: relative;
  height: 100%;
  width: 100%;
}


.info_box {
  width: 100%;
  height: 100%;
  background: white;
  opacity: 75%;
  position: relative;
}

.right_ele {
  position: absolute;
  height: 100%;
  width: 70%;
  right: 0;
  /*background-image: url("../../assets/img/personalCenter.jpg");*/
  /*background-repeat: no-repeat;*/
  /*background-position: center;*/
  /*background-size: 100% 100%;*/
  background-image: linear-gradient(to bottom right, lightskyblue, greenyellow)
  /*background-color: #42b983;*/
}

.left_ele {
  position: absolute;
  background-image: url("../../assets/img/personalCenterLeft.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  height: 100%;
  width: 30%;
}

.avatar {
  position: absolute;
  top: 30%;
  left: 18%;
}

.right_container {
  position: absolute;
  top: 20%;
  width: 60%;
  left: 10%;
  /*background-image: linear-gradient(to bottom right, red, yellow)*/
  padding-top: 2%;
  padding-bottom: 10%;
}

.info_items {
  /*background-color: white;*/
  height: 100%;
  width: 100%;
  /*position: absolute;*/
  /*background-image: linear-gradient(to bottom right, red, yellow)*/
  margin-left: 5%;
  padding-left: 5%;
}

li {
  font-family: 隶书;
  font-size: 20px;
}

</style>