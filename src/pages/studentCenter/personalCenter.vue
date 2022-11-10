<template>
  <div class="personal_center_container">

    <div class="info_box">
      <div class="left_ele">
        <div class="avatar">
          <el-avatar :size="250" :src="this.avatar_path"></el-avatar>
        </div>

      </div>


      <div class="right_ele">
        <div class="right_container">
          <el-descriptions title="Info" class="info_items" :column="1">
            <el-descriptions-item label="UserId">{{ this.id }}</el-descriptions-item>
            <el-descriptions-item label="Name">{{ this.name }}</el-descriptions-item>
            <el-descriptions-item label="Phone">{{ this.phone }}</el-descriptions-item>
            <el-descriptions-item label="Address">{{ this.address }}</el-descriptions-item>
            <el-descriptions-item label="Subject">{{ this.subject }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "personalCenter",
  data() {
    return {
      id: this.$store.state.id,
      name: this.$store.state.name,
      avatar_path: this.$store.state.avatar_path,
      phone: this.$store.state.phone,
      address: this.$store.state.address,
      subject: this.$store.state.subject
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
  background-color: #42b983;
}

.left_ele {
  position: absolute;
  height: 100%;
  width: 30%;
  background-color: #795da3;
}

.avatar {
  position: absolute;
  top: 30%;
  left: 18%;
}

.right_container{
  position: absolute;
  top: 30%;

}

.info_items{
  height: 100%;
  width: 100%;
  /*position: absolute;*/
}


</style>