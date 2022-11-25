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
            <el-button @click.native.prevent="getStudent(scope.row)" type="primary">课程学生名单</el-button>
            <el-button @click.native.prevent="send_notice(scope.row)" @click="dialogFormVisible=true" type="primary">
              发送通知
            </el-button>
            <el-button @click.native.prevent="send_email(scope.row)" @click="dialogFormVisible=true" type="primary">
              发送邮件与通知
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <template>
        <el-dialog title="发送内容" :visible.sync="dialogFormVisible">

          <el-input
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
    <img :src="defaultImg" style="width:700px"/>

  </div>
</template>

<script>
// todo
// 1. 在created()中要利用courseID获取上这门课的所有人
// 2. 在export_grade()中要导出这一个学生的成绩，怎么导出来呢？不知道
// 3. 在delete_student()中要删除这个学生，给后端发送 course_id，以及这个学生的id，后端负责改变数据库内容
export default {
  name: "courseDetail",
  data() {
    return {
      course_id: "",
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
  methods: {
    created() {
      this.getCourseID()
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
    getStudent(row) {
      this.$router.push({path: '/teacher_center/my_classes/student_list/' + this.index})
      console.log(row)
    },
    getDetail(row) {
      this.$router.push({path: '/teacher_center/my_classes/course_detail/' + this.index})
      console.log(row)
    },
    send_email(row) {
      console.log(row)
    },
    send_notice(row) {
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
      let student_id = "1"
      this.$router.push({path: '/teacher_center/my_classes/student_grade/' + student_id})
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

</style>