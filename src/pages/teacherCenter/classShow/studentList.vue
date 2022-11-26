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
              查看学生所有章节的作业与成绩
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
import requestUtil from "@/utils/request";
import ExportJsonExcel from "js-export-excel";

export default {
  name: "studentList",
  data() {
    return {
      course_id: "",
      now_student_id: null,
      student_list: [{
        course_name: "名字",
        student_name: "学生名字",
        student_ID: "学生ID",
        progress: "完成度",
        grades: "目前成绩",
      }]
    }
  }, created() {
    this.getCourseID()
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const {data: res} = await requestUtil.get('/eduservice/edu-course/getStudentByCourseId/'+this.course_id )
      console.log(res);
      this.course_data = res.data
      if (res.code !== '0')
        return this.$message.error("Wrong! Renderer failed")
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

    async get_chapter_grades() {

    },

    export_grade(row) {
      console.log(row)
      let arr_index = row.index - 1
      const dataList = this.student_list[arr_index];
      this.now_student_id = dataList.student_ID
      // todo TIME 11-26 1:40
      // 现在这里要获取后端给我的数据，要获取上这门课的这名学生的所有chapter的分数, 方法可行吗？不知道
      // 如果能行，那我会获得所有需要的值，那么我用循环，依次获取值并且装入data,然后装入option，最后输出即可
      // this.get_chapter_grades()

      let option = {};  //   option代表的就是excel文件
      let dataTable = [];   //   dataTable代表excel文件中的数据内容
      let obj = {
        studentID: dataList.student_ID,
        studentName: dataList.student_name
      }


      dataTable.push(obj)
      option.filename = "成绩";  //excel文件名
      //excel文件数据
      let header = ["学生ID", "学生名字", ""]


      option.datas = [
        {
          //   excel文件的数据源
          sheetData: dataTable,
          //   excel文件sheet的表名
          sheetName: "成绩",
          //   excel文件表头名
          sheetHeader: header,
        },
      ];

      //   创建ExportJsonExcel实例对象
      let toExcel = new ExportJsonExcel(option);
      //   调用保存方法
      toExcel.saveExcel();
    },

    async delete_student(row) {
      const {data: res} = await requestUtil.post('/notice?teacherUsername=' + row.student_ID)
      console.log(res);
      console.log(row)
    },

    view_chapter(row) {
      console.log(row)
      // 获取点击行的student的id（通过row这个参数，和student_list这个数组获取）
      this.$router.push({path: '/teacher_center/my_classes/student_grade/' + this.course_id + "+" + row.student_ID})

    }

  },

}
</script>

<style scoped>

</style>