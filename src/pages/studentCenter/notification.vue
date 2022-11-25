<template>
  <div class="notification_container">
    <div>
      <template>
        <el-table
            :data="notifications"
        >
          <el-table-column
              type="index"
              label="序号"
              width="100">
          </el-table-column>
          <el-table-column
              prop="date"
              label="日期"
              width="100"
          >
          </el-table-column>
          <el-table-column
              prop="course_id"
              label="课程名字"
              width="200"
          >
          </el-table-column>
          <el-table-column
              prop="teacher_name"
              label="教师姓名"
              width="100"
          >
          </el-table-column>
          <el-table-column
              prop="content"
              label="内容"
          >
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import requestUtil from "@/utils/request";
// import qs from "qs";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "notification",
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const {data: res} = await requestUtil.get('/notice/{id}?student_id='+this.studentid)
      console.log(res);
      this.notifications1 = res.data
      if (res.code !== '0')
        return this.$message.error("Wrong! Renderer failed")
    }
  },

  data() {
    return {
      studentid:"",
      // 这个用来装notification
      notifications: this.$store.state.notifications
    }
  }
}
</script>

<style scoped>
.notification_container {
  position: relative;
  background-color: white;
  height: 100%;
  width: 100%;
}

</style>