<template>
  <div>
    <template>
      <el-button @click="previous" type="success" style="margin-left: 5px">返回课程详情</el-button>
      <el-table
          ref="multipleTable"
          :data="student_list"
          :cell-class-name="tableCellClassName"
          tooltip-effect="dark"
          style="width: 100%"
          class="list_content">

        <el-table-column
            prop="course_name"
            :formatter="formatterType"
            label="课程名字"
            width="140">
        </el-table-column>

        <el-table-column
            prop="username"
            label="学生名字"
            width="140">
        </el-table-column>

        <el-table-column
            prop="id"
            label="学生ID"
            width="140">
        </el-table-column>

        <el-table-column
            prop="grade"
            label="总成绩"
            width="140">
        </el-table-column>

        <el-table-column
            prop="phone"
            label="电话"
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
import qs from "qs";

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
    previous() {
      this.$router.push('/teacher_center/my_classes/course_detail/' + this.course_id)
    },

    formatterType() {
      return this.course_id
    },
    async getUserList() {
      const {data: res} = await requestUtil.get('/eduservice/edu-course/getStudentByCourseId/' + this.course_id)
      console.log(res);
      this.student_list = res.data.StudentList
      if (res.code !== 20000)
        return this.$message.error("Wrong! Renderer failed")
    },

    getCourseID() {
      if (this.$route.params && this.$route.params.id) {
        this.course_id = this.$route.params.id
        console.log("courseID")
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

    async get_chapter_grades() {

    },

    async export_grade(row) {
      console.log(row)
      let arr_index = row.index - 1
      const dataList = this.student_list[arr_index];
      this.now_student_id = dataList.student_ID
      // todo TIME 11-26 1:40
      // 现在这里要获取后端给我的数据，要获取上这门课的这名学生的所有chapter的分数, 方法可行吗？不知道
      // 如果能行，那我会获得所有需要的值，那么我用循环，依次获取值并且装入data,然后装入option，最后输出即可
      // this.get_chapter_grades()
      // console.log({courseId:this.course_id,studentId:row.id});
      const {data: res} = await requestUtil.get('/eduservice/t-chapter/getChapterByCourseIdAndStudentId?' + qs.stringify({courseId:this.course_id,studentId:row.id}))
      console.log(res);
      let option = {};  //   option代表的就是excel文件
      let dataTable = [{}];   //   dataTable代表excel文件中的数据内容
      // let obj = {
      //   studentID: dataList.student_ID,
      //   studentName: dataList.student_name
      // }

      let sheetfilter = ["name", "a"]
      dataTable[0]["name"] = row.id.toString()
      dataTable[0]["a"] = this.course_id.toString()

      option.filename = "成绩";  //excel文件名
      //excel文件数据
      let header = ["学生ID", "课程ID"]
      console.log(res.data.ChapterStudentList)
      console.log(11111111111111)
      for (let i in res.data.ChapterStudentList) {
        sheetfilter.push("i")
        header.push("第" + i + "章的作业及答题分数（各占0.5）")
        dataTable[0]["i"] = res.data.ChapterStudentList[i].hwGrade*0.5+res.data.ChapterStudentList[i].proGrade*0.5
      }
      console.log(header);


      option.datas = [
        {
          //   excel文件的数据源
          sheetData: dataTable,
          //   excel文件sheet的表名
          sheetFilter: sheetfilter,
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
      const {data: res} = await requestUtil.delete1('/eduservice/edu-course/' + this.course_id + "/" + row.id)
      console.log(res);
      console.log(row)
      await this.getUserList()
    },

    view_chapter(row) {
      console.log(row)
      // 获取点击行的student的id（通过row这个参数，和student_list这个数组获取）
      this.$router.push({path: '/teacher_center/my_classes/student_grade/' + this.course_id + "+" + row.id})

    }

  },

}
</script>

<style scoped>

</style>