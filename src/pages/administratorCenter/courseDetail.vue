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
          <template slot-scope="scope">

            <el-button @click.native.prevent="send_notice(scope.row)" @click="view_chapter" type="primary">
              查看章节
            </el-button>
            <el-button type="danger" @click.native.prevent="acceptClick(scope.row)">
              同意
            </el-button>
            <el-button type="success" @click.native.prevent="refuseClick(scope.row)">
              拒绝
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="class_info">
      <img :src="defaultImg" style="width:800px" class="course_img"/>

      <div class="text_info">
        <el-input v-model="course_text_info" type="textarea" :rows="24">

        </el-input>
      </div>
    </div>


  </div>
</template>

<script>
import requestUtil from "@/utils/request";
import qs from "qs";
import {ButtonAPI} from "@/api";

export default {
  name: "courseDetail",
  data() {
    return {

      course_text_info: "课程介绍",
      course_id: "",
      notice_return: {
        sendTo: this.course_id,
        content: this.notice
      },
      email_return: {
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

      defaultImg: require('@/assets/img/enroll.jpg')


    }
  },
  created() {
    this.getCourseID()
    this.getUserList()
    console.log(this.course_id)
  },
  methods: {
    async getUserList() {
      const {data: res} = await requestUtil.get('/course/enroll/id?id=' + this.course_id)
      console.log(res);
      this.course_text_info = res.data.text
      if (res.code !== '0')
        return this.$message.error("Wrong! Renderer failed")
    }, async acceptClick(row) {
      row.status = 1
      console.log(row)
      const acceptData = {...row};
      //发起请求
      const {data: res} = await ButtonAPI(acceptData)
      console.log(res);
      if (res.code !== '0')
        return this.$message.error("Wrong!acceptClick failed")
      console.log("acceptClick")
      await this.getUserList()
    },

    async refuseClick(row) {
      row.status = 0
      console.log(row)
      const refuseData = {...row};
      //发起请求
      const {data: res} = await ButtonAPI(refuseData)
      console.log(res);
      if (res.code !== '0')
        return this.$message.error("Wrong!refuseClick failed")
      console.log("refuseClick")
      await this.getUserList()
    },
    getCourseID() {
      if (this.$route.params && this.$route.params.id) {
        this.course_id = this.$route.params.id
        console.log(this.course_ID)
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

    getDetail(row) {
      this.$router.push({path: '/teacher_center/my_classes/course_detail/' + this.index})
      console.log(row)
    },
    async send_email(row) {
      const {data: res} = await requestUtil.post('/send-email/simple?' + qs.stringify(this.email_return))
      console.log(res);
      console.log(row)
    },
    async send_notice(row) {
      const {data: res} = await requestUtil.post('/notice?' + qs.stringify(this.notice_return))
      console.log(res);
      console.log(row.row)
    },
    export_grade(row) {
      console.log(row)
      console.log("asdhkl")
    },
    delete_student(row) {
      console.log(row)
      console.log("del_stu")
    },
    view_chapter(row) {
      console.log(row)
      console.log('chapter')
      // 获取点击行的student的id（通过row这个参数，和student_list这个数组获取）
      this.$router.push({path: '/admin_center/view_chapter/' + this.course_id})
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
}

.course_img {
  position: absolute;
}

.text_info {
  position: absolute;
  left: 60%;
  width: 530px;
  top: 10px;
}

</style>