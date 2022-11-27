<template>
  <div class="application_container">

    <template>

      <el-table
          ref="multipleTable"
          :data="tableData"
          :cell-class-name="tableCellClassName"
          tooltip-effect="dark"
          style="width: 100%"
          class="list_content">


        <el-table-column
            prop="gmtCreate"
            label="申请日期"
            width="160"
        >
        </el-table-column>

        <el-table-column
            prop="id"
            label="课程ID"
            width="140">
        </el-table-column>

        <el-table-column
            prop="title"
            label="课程名字"
            width="140">
        </el-table-column>

        <el-table-column
            prop="teacherName"
            label="教师姓名"
            width="140">
        </el-table-column>

        <el-table-column
            prop="teacherId"
            label="教师ID"
            width="140">
        </el-table-column>

        <el-table-column class="export_button">

          <template slot-scope="scope">
            <br>
            <el-button type="success" @click.native.prevent="detailClick (scope.row)">
              课程详情
            </el-button>
            <br>
            <br>
          </template>

        </el-table-column>


      </el-table>
    </template>

  </div>
</template>

<script>

import requestUtil from "@/utils/request";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "applications",

  data() {
    return {
      application_return: {},

      now_course_id: null,
      tableData: [{
        date: "",
        course: {
          name: 'OOAD',
          id: 'CS309',
          detail: "brief info of this course"
        },
        teacher: {
          id: "",
          name: ""
        },
        status: 0
      }],
      multipleSelection: []
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      // 获取全部未审核过的课程
      const {data: res} = await requestUtil.get('/eduservice/edu-course/getDraftCourse')
      console.log(res);
      this.tableData = res.data.courseList
      if (res.code !== 20000)
        return this.$message.error("Wrong! Renderer failed")
    },

    detailClick(row) {
      row.status = 0
      console.log(row)
      this.$router.push({path: "/admin_center/course_detail/" + row.id})
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
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
    tableCellClassName({row, column, rowIndex, columnIndex}) {
      //注意这里是解构
      //利用单元格的 className 的回调方法，给行列索引赋值
      row.index = rowIndex + 1;
      column.index = columnIndex + 1;
    },
  },

}
</script>


<style scoped>
.application_container {
  position: relative;
  background-color: white;
  height: 100%;
  width: 100%;
}
</style>