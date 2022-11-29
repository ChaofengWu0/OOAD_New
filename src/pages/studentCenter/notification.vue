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
              prop="title"
              label="主题"
              width="100"
          >
          </el-table-column>

          <el-table-column
              prop="courseId"
              label="课程ID"
              width="100"
          >
          </el-table-column>
          <el-table-column
              prop="teacherId"
              label="教师ID"
              width="100"
          >
          </el-table-column>
          <el-table-column
              prop="content"
              label="内容"
              width="400"
          >
          </el-table-column>
          <el-table-column
              prop="gmtModified"
              label="日期"
              width="100"
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
      const {data: res} = await requestUtil.get('/eduservice/t-notice?studentId='+ JSON.parse(sessionStorage.getItem("userInfo")).data.id)
      console.log(res);
      this.notifications = res.data.noticeList
      if (res.code !== 20000)
        return this.$message.error("Wrong! Renderer failed")
    }
  },

  data() {
    return {
      studentId:"",
      // 这个用来装notification
      notifications: []
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