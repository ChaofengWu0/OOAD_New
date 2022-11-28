<template>
  <div>

    <template>
      <el-table
          ref="multipleTable"
          :data="student_list"
          tooltip-effect="dark"
          style="width: 100%"
          class="list_content">
        <el-table-column>
          <el-button @click="goBack" type="primary">
            返回申请中心
          </el-button>
          <el-button @click="viewChapter" type="primary">
            查看章节
          </el-button>
          <el-button type="danger" @click.native.prevent="acceptClick">
            同意
          </el-button>
          <el-button type="success" @click.native.prevent="refuseClick">
            拒绝
          </el-button>
        </el-table-column>
      </el-table>
    </template>

    <div class="class_info">

      <el-image :src="course_cover" class="course_img">

      </el-image>

      <div class="text_info">
        课程详情介绍:
        <br>
        {{ course_text_info }}
      </div>


    </div>


  </div>
</template>

<script>
import requestUtil from "@/utils/request";
import qs from "qs";


export default {
  name: "courseDetail",
  data() {
    return {

      course_text_info: null,
      course_id: null,
      course_cover: null,
      notice_return: {
        sendTo: this.course_id,
        content: this.notice
      },
      button_return: {
        courseId: "",
        status: ""
      },

      notice: "",
      dialogFormVisible: false,
      student_list: [{}],
    }
  },

  created() {
    this.getCourseID()
    this.getUserList()
  },

  methods: {

    async getUserList() {
      // 根据课程id获取课程详情
      const {data: res} = await requestUtil.get('/eduservice/edu-course/' + this.course_id)
      console.log(res);
      this.course_text_info = res.data.courseDetail.description
      if (res.code !== 20000)
        return this.$message.error("Wrong! Renderer failed")
    },

    async acceptClick() {
      this.button_return.status = 'Normal'
      this.button_return.courseId = this.course_id
      // 通过申请
      console.log(qs.stringify(this.button_return))
      const {data: res} = await requestUtil.post('/eduservice/edu-course/updateCourseStatus?' + qs.stringify(this.button_return))
      console.log(res);
      if (res.code !== 20000)
        return this.$message.error("Wrong!acceptClick failed")
      console.log("acceptClick")
      await this.getUserList()
    },

    async refuseClick() {
      this.button_return.status = "Refuse"
      this.button_return.courseId = this.course_id
      // 拒绝申请
      const {data: res} = await requestUtil.post('/eduservice/edu-course/updateCourseStatus?' + qs.stringify(this.button_return))
      console.log(res);
      if (res.code !== 20000)
        return this.$message.error("Wrong!refuseClick failed")
      console.log("refuseClick")
      await this.getUserList()
    },

    getCourseID() {
      if (this.$route.params && this.$route.params.id) {
        this.course_id = this.$route.params.id
      } else {
        this.$message("Wrong in function getCourseID which is in classChapter.Vue ")
      }
    },

    goBack(){
      this.$router.push({path: '/admin_center/application_center/'})
    },

    viewChapter() {
      this.$router.push({path: '/admin_center/view_chapter/' + this.course_id})
    },

  },

}
</script>

<style scoped>
.class_info {
  position: relative;
}

.course_img {
  position: absolute;
  padding: 10px;
  ;
}

.text_info {
  position: absolute;
  left: 60%;
  width: 530px;
  top: 10px;
}

</style>