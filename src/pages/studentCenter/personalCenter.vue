<template>
  <div class="personal_center_container">

    <div class="info_box">
      <div class="left_ele">
        <div class="avatar">
          <el-avatar :size="250" :src="this.original_data.avatar_path"></el-avatar>
        </div>

      </div>


      <div class="right_ele">
        <div class="right_container">
          <ul class="info_items">
            <li style="list-style:none">
              <h3> 账号: {{ this.original_data.id }} </h3>
            </li>
            <li style="list-style:none">
              <h3> 名称: {{ this.original_data.name }}</h3>
            </li>
            <li style="list-style:none">
              <h3> 邮件: {{ this.original_data.email }}</h3>
            </li>
            <li style="list-style:none">
              <h3> 电话: {{ this.original_data.phone }}</h3>
            </li>
          </ul>
          <el-button type="text" class="down_ele" @click="edit_info" style="color: black">
            <h3 style="color: #DD4A68">编 辑</h3>
          </el-button>

        </div>
      </div>
    </div>


    <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="change_form">
        <el-form-item label="" :label-width="formLabelWidth">
          <el-input v-model="change_form.name" autocomplete="off"></el-input>
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
export default {
  name: "personalCenter",
  data() {
    return {
      original_data: {
        id: this.$store.state.id,
        name: this.$store.state.name,
        avatar_path: this.$store.state.avatar_path,
        phone: this.$store.state.phone,
        address: this.$store.state.address,
        subject: this.$store.state.subject,
      },

      formLabelWidth: "120px",
      dialogFormVisible: false,
      change_form: {}
    }
  },
  methods: {
    edit_info() {
      this.dialogFormVisible = true
    },
    cancel() {
      this.dialogFormVisible = false
    },
    submit() {
      this.dialogFormVisible = false
    }
  },

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
  background-image: url("../../assets/img/personalCenter.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
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
  top: 30%;
  width: 100%;


}

.info_items {
  background-color: white;
  height: 100%;
  width: 100%;
  /*position: absolute;*/
}

li {
  font-family: 隶书;
  font-size: 20px;
}


</style>