<template>
  <div>

    <template>
      <el-table
          ref="multipleTable"
          :data="student_list"
          :cell-class-name="tableCellClassName"
          tooltip-effect="dark"
          style="width: 100%"
          class="list_content">
        <el-table-column>
          <el-button @click.native.prevent="getStudent" type="primary">课程学生名单</el-button>
          <el-button @click.native.prevent="get_chapter" type="primary">查看课程章节</el-button>
          <el-button @click.native.prevent="send_notice" @click="dialogFormVisible=true" type="primary">
            发送通知
          </el-button>
          <el-button @click.native.prevent="send_email" @click="dialogFormVisible=true" type="primary">
            发送邮件与通知
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
import qs from "qs";


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
        teacherId: "this.$store.getters.getUserInfo.id"
      },
      email_return: {
        filePath: "/",
        subject: this.notice_title,
        sendTo: this.course_id,
        text: this.notice
      },
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
  },

  methods: {
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
      } else {
        this.$message("Wrong in function getCourseID which is in classChapter.Vue ")
      }
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    tableCellClassName({row, column, rowIndex, columnIndex}) {
      //注意这里是解构
      //利用单元格的 className 的回调方法，给行列索引赋值
      row.index = rowIndex + 1;
      column.index = columnIndex + 1;
    },

    getStudent() {
      this.$router.push({path: '/teacher_center/my_classes/student_list/' + this.course_id})
    },

    async send_email(row) {
      const {data: res} = await requestUtil.post('/send-email/simple?' + qs.stringify(this.email_return))
      console.log(res);
      console.log(row)
    },

    async send_notice() {
      this.notice_return.teacherId = this.$store.getters.getUserInfo.id
      const {data: res} = await requestUtil.post('/eduservice/t-notice?' + qs.stringify(this.notice_return))
      console.log(res);
    },

    cancel() {
      this.dialogFormVisible = false
      this.notice = ""
    },

    submit() {
      this.dialogFormVisible = false
      this.notice = ""
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