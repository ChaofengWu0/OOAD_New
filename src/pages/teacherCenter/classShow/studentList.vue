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
          </template>
        </el-table-column>
      </el-table>
    </template>

  </div>
</template>

<script>
// todo 这里要利用courseID获取上这门课的所有人
export default {
  name: "studentList",
  data() {
    return {
      student_list: [{
        course_name: "名字",
        course_ID: "课程ID",
        student_name: "学生名字",
        student_ID: "学生ID",
        progress: "完成度",
        grades: "目前成绩",
      }]
    }
  },
  methods: {
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
    }
  },

  created() {

  }
}
</script>

<style scoped>

</style>