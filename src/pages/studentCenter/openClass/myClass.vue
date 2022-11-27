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
            width="150">
        </el-table-column>

        <el-table-column
            prop="title"
            label="课程名字"
            width="150">
        </el-table-column>

        <el-table-column
            prop="lessonNum"
            label="课程节数"
            width="150">
        </el-table-column>

        <el-table-column
            prop="gmtCreate"
            label="创建时间"
            width="150"
        >
        </el-table-column>

        <el-table-column
            prop="price"
            label="价格"

            show-overflow-tooltip>
        </el-table-column>

        <el-table-column class="export_button">

          <template slot-scope="scope">
            <br>
            <el-button type="primary" @click.native.prevent="refuseClick (scope.row)">
              课程详情
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
      }],
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const {data: res} = await requestUtil.get('/eduservice/edu-course/getCourseByStudentId/' + this.$store.getters.getUserInfo.data.id)
      console.log(res);
      this.tableData = res.data.CourseList
      if (res.code !== 20000)
        return this.$message.error("Wrong! Renderer failed")
    },
    async refuseClick(row) {
      row.status = 0
      console.log(row)
      this.$router.push({path: "/stu_center/my_classes/chapter/" + row.id})

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
