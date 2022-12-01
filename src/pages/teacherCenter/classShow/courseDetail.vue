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
          <el-button @click.native.prevent="toStudentList" type="primary">课程学生名单</el-button>
          <el-button @click.native.prevent="toChapters" type="primary">查看课程章节</el-button>
          <el-button @click="dialogFormVisible=true" type="primary">
            发送通知
          </el-button>
          <el-button @click="email_dialog=true" type="primary">
            发送邮件
          </el-button>
        </el-table-column>
      </el-table>
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
            <el-button @click="cancelNotice">取 消</el-button>
            <el-button type="primary" @click="sendNotice">确 定</el-button>
          </div>
        </el-dialog>
      </template>
    </template>
    <template>
      <el-dialog title="发送内容" :visible.sync="email_dialog">
        <el-input v-model="email_return.sendTo" style="margin-bottom: 20px"
                  placeholder="请输入收件人（为空时发送给课程下的所有学生）"></el-input>
        <el-input v-model="email_return.subject" style="margin-bottom: 20px" placeholder="请输入标题"></el-input>
        <el-input
            placeholder="请输入内容"
            type="textarea"
            :row="10"
            v-model="email_return.text"
            size="large"
        ></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelEmail">取 消</el-button>
          <el-button type="primary" @click="sendEmail">确 定</el-button>
        </div>
      </el-dialog>
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
        filePath: null,
        subject: null,
        sendTo: null,
        text: null
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
    cancelNotice() {
      this.dialogFormVisible = false
      this.notice = ""
      this.notice_title = ""
    },
    async sendNotice() {
      this.notice_return.title = this.notice_title
      this.notice_return.courseId = this.course_id
      this.notice_return.content = this.notice
      const {data: res} = await requestUtil.post('/eduservice/t-notice', this.notice_return)
      if (res.code === 20000) {
        this.$message.success("通知发送成功")
      }
      this.dialogFormVisible = false
      this.notice = ""
      this.notice_title = ""
    },
    cancelEmail() {
      this.email_return = {
        filePath: null,
        subject: null,
        sendTo: null,
        text: null
      }
    },
    async sendEmail() {
      let sendMailUrl = 'http://localhost:8001/eduservice/send-mail/simple'
      if (this.email_return.sendTo === null) {
        sendMailUrl = 'http://localhost:8001/eduservice/send-mail/simple/all/' + this.course_id
      }
      const {data: res} = await requestUtil.post(sendMailUrl, this.email_return)
      if (res.code === 20000) {
        this.email_dialog = false
        this.email_return = {
          filePath: null,
          subject: null,
          sendTo: null,
          text: null
        }
        this.$message.success("邮件发送成功")
      } else {
        this.$message.success("邮件发送失败请重试")
      }
    },
    async getUserList() {
      const {data: res} = await requestUtil.get('/eduservice/edu-course/getCourseDetailById/' + this.course_id)
      this.course_text_info = res.data.description
      this.course_cover = res.data.cover
      if (res.code !== 20000)
        return this.$message.error("Wrong! Renderer failed")
    },
    getCourseID() {
      if (this.$route.params && this.$route.params.id) {
        this.course_id = this.$route.params.id
      } else {
        this.$message("Wrong in function getCourseID which is in classChapter.Vue ")
      }
    },
    previous() {
      this.$router.push('/teacher_center/my_classes/class_list')
    },
    toChapters() {
      this.$router.push({path: '/teacher_center/my_classes/view_chapter/' + this.course_id})
    },
    toStudentList() {
      this.$router.push({path: '/teacher_center/my_classes/student_list/' + this.course_id})
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