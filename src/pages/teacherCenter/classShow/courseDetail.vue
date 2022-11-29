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
          <el-button @click="previous" type="success">返回课程列表</el-button>
          <el-button @click.native.prevent="getStudent" type="primary">课程学生名单</el-button>
          <el-button @click.native.prevent="get_chapter" type="primary">查看课程章节</el-button>
          <el-button @click.native.prevent="send_notice" @click="dialogFormVisible=true" type="primary">
            发送通知
          </el-button>

          <el-button @click="email_dialog=true" type="primary">
            发送邮件
          </el-button>
        </el-table-column>
      </el-table>

      <template>
        <el-dialog title="发送内容" :visible.sync="email_dialog">
          <el-input v-model="email_return.subject" style="margin-bottom: 20px" placeholder="请输入标题">
          </el-input>
          <el-input
              placeholder="请输入内容"
              type="textarea"
              :row="10"
              v-model="email_return.text"
              size="large"
          >
          </el-input>

          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel_email">取 消</el-button>
            <el-button type="primary" @click="submit_email">确 定</el-button>
          </div>
        </el-dialog>
      </template>


      <template>
        <el-dialog title="发送内容" :visible.sync="dialogFormVisible">

          <el-input v-model="notice_title" style="margin-bottom: 20px" placeholder="请输入标题">

          </el-input>

          <el-input
              placeholder="请输入内容"
              type="textarea"
              :row="10"
              v-model="notice"
              size="large"
          >
          </el-input>

          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog>
      </template>

    </template>

    <div class="class_info">

      <img :src="course_cover" class="course_img"/>

      <div class="text_info">
        课程详情介绍:
        <br>
        {{ course_text_info }}
      </div>


    </div>


  </div>
</template>

<script>
// todo
// 1. 在created()中要利用courseID获取上这门课的所有人
// 2. 在export_grade()中要导出这一个学生的成绩，怎么导出来呢？不知道
// 3. 在delete_student()中要删除这个学生，给后端发送 course_id，以及这个学生的id，后端负责改变数据库内容
import requestUtil from "@/utils/request";


export default {
  name: "courseDetail",
  data() {
    return {
      course_cover: null,
      course_text_info: null,
      course_id: null,
      notice_title: null,

      notice_return: {
        title: this.notice_title,
        courseId: this.course_id,
        content: this.notice,
        teacherId: null,
      },

      email_return: {
        filePath: "/",
        subject: this.notice_title,
        sendTo: this.course_id,
        text: this.notice
      },

      email_dialog: false,

      notice: "",
      dialogFormVisible: false,
      student_list: [{
        course_name: "名字",
        student_name: "学生名字",
        student_ID: "学生ID",
        progress: "完成度",
        grades: "目前成绩",
      }],
    }
  },

  created() {
    this.getCourseID()
    this.getUserList()
    this.notice_return.teacherId = JSON.parse(sessionStorage.getItem("userInfo")).data.id
  },

  methods: {
    cancel_email() {
      this.email_return = {
        filePath: "/",
        subject: this.notice_title,
        sendTo: this.course_id,
        text: this.notice
      }
    },

    async submit_email() {
      const {data: res} = await requestUtil.post('/send-email/simple', this.email_return)
      if (res.code === 20000){
        this.$message.success("邮件发送成功")
      }
      this.email_return = {
        filePath: "/",
        subject: this.notice_title,
        sendTo: this.course_id,
        text: this.notice
      }
    },

    previous() {
      this.$router.push('/teacher_center/my_classes/class_list')
    },

    get_chapter() {
      this.$router.push({path: '/teacher_center/my_classes/view_chapter/' + this.course_id})
    },

    async getUserList() {
      // todo
      const {data: res} = await requestUtil.get('/eduservice/edu-course/getCourseDetailById/' + this.course_id)
      console.log(res);
      this.course_text_info = res.data.description
      this.course_cover = res.data.cover
      if (res.code !== 20000)
        return this.$message.error("Wrong! Renderer failed")
    },

    getCourseID() {
      if (this.$route.params && this.$route.params.id) {
        this.course_id = this.$route.params.id
        this.course_id = '14'
        console.log(this.course_id)
        console.log(this.notice_return.courseId)
      } else {
        this.$message("Wrong in function getCourseID which is in classChapter.Vue ")
      }
    },

    getStudent() {
      this.$router.push({path: '/teacher_center/my_classes/student_list/' + this.course_id})
    },

    // async send_email() {
    //   const {data: res} = await requestUtil.post('/send-email/simple', this.email_return)
    //   console.log(res);
    //   if (res.data.code === 20000) {
    //     this.$message.success("邮件发送成功")
    //   }
    // },

    send_notice() {
      console.log(this.notice_return.teacherId)
    },

    cancel() {
      this.dialogFormVisible = false
      this.notice = ""
      this.notice_title = ""
    },

    async submit() {
      const {data: res} = await requestUtil.post('/eduservice/t-notice', this.notice_return)
      console.log(res)
      if (res.code === 20000) {
        this.$message.success("通知发送成功")
      }
      this.dialogFormVisible = false
      this.notice = ""
      this.notice_title = ""
    },

  },

}
</script>

<style scoped>
.class_info {
  position: relative;
  background-color: #42b983;
}

.course_img {
  position: absolute;
  width: 780px;
  height: 500px;
  margin: 10px;
  padding-top: 10px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
}

.text_info {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  position: absolute;
  left: 60%;
  width: 520px;
  top: 10px;
}

</style>