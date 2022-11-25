<template>
  <div class="my_classes_container">

    <template>

      <el-table
          ref="multipleTable"
          :data="tableData"
          :cell-class-name="tableCellClassName"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          class="list_content">
        <el-table-column
            prop="id"
            label="课程编号"
            width="200">
        </el-table-column>

        <el-table-column
            prop="course_name"
            label="课程名字"
            width="200">
        </el-table-column>

        <el-table-column
            prop="teacher_name"
            label="教师姓名"
            width="200">
        </el-table-column>

        <el-table-column
            prop="course_detail"
            label="课程详情"

            show-overflow-tooltip>
        </el-table-column>

        <el-table-column
            prop="progress"
            label="完成度"

            show-overflow-tooltip>
        </el-table-column>

        <el-table-column class="export_button">

          <template slot-scope="scope">
            <br>
            <el-button type="success" @click.native.prevent="refuseClick (scope.row)">
              Detail
            </el-button>
            <br>
            <br>
          </template>

        </el-table-column>
      </el-table>

<!--      <div style="margin-top: 20px" class="button_container">-->
<!--        <el-button @click="toggleSelection()">Deselect</el-button>-->
<!--      </div>-->
    </template>

  </div>
</template>

<script>

import requestUtil from "@/utils/request";



export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "myClasses",

  data() {
    return {
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
      const {data: res} = await requestUtil.get('/course/student?studentUsername='+this.$store.getters.getUserInfo.username )
      console.log(res);
      this.tableData1 = res.data
      if (res.code !== '0')
        return this.$message.error("Wrong! Renderer failed")
    },
    async refuseClick(row) {
      row.status = 0
      console.log(row)
      this.$router.push({path: "/stu_center/my_classes/chapter/"+ row.id})

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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
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
