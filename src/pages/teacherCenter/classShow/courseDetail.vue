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

        <el-table-column
            prop="course_name"
            label="课程名字"
            width="140">
        </el-table-column>

        <el-table-column
            prop="student_name"
            label="学生名字"
            width="140">
        </el-table-column>

        <el-table-column
            prop="student_ID"
            label="学生ID"
            width="140">
        </el-table-column>

        <el-table-column
            prop="progress"
            label="完成度"
            width="140">
        </el-table-column>

        <el-table-column
            prop="grades"
            label="目前成绩"
            width="140">
        </el-table-column>

        <el-table-column>
          <template slot-scope="scope">
            <el-button @click.native.prevent="export_grade(scope.row)" type="primary">
              导出成绩
            </el-button>
            <el-button @click.native.prevent="delete_student(scope.row)" type="primary">
              删除学生
            </el-button>
            <el-button @click.native.prevent="view_chapter(scope.row)" type="primary">
              查看学生所有章节的成绩
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

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
      student_list: [{
        course_name: "名字",
        student_name: "学生名字",
        student_ID: "学生ID",
        progress: "完成度",
        grades: "目前成绩",
      }]
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

    }

  },

}
</script>

<style scoped>

</style>