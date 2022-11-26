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
            label="申请日期"
            prop="date"
            width="160"
        >
        </el-table-column>

        <el-table-column
            prop="course.id"
            label="课程ID"
            width="140">
        </el-table-column>

        <el-table-column
            prop="course.name"
            label="课程名字"
            width="140">
        </el-table-column>

        <el-table-column
            prop="teacher.name"
            label="教师姓名"
            width="140">
        </el-table-column>

        <el-table-column
            prop="teacher.id"
            label="教师ID"
            width="140">
        </el-table-column>

        <el-table-column
            prop="course.detail"
            label="课程简介"

            show-overflow-tooltip>
        </el-table-column>

        <el-table-column class="export_button">

          <template slot-scope="scope">
            <el-button type="danger" @click.native.prevent="refuseClick (scope.row)">
              拒绝
            </el-button>
            <br>
            <br>
            <el-button type="success" @click.native.prevent="acceptClick (scope.row)">
              接受
            </el-button>
          </template>

        </el-table-column>
      </el-table>
    </template>

  </div>
</template>

<script>

import {ButtonAPI, RendererAPI} from "@/api";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "applications",

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
  created(){ this.getUserList()},
  methods: {
    async getApplications(){
      const {data: res} = await RendererAPI({})
      // const  {data:res} = await requestUtil.
      console.log(res.data.length);
      this.tableData = res.data
      if (res.code !== '0')
        return this.$message.error("Wrong! Renderer failed")
      this.$forceUpdate()
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
    refuseAll(){

      console.log("refuseAll")
    },
    acceptAll(){
      console.log("acceptAll")
    },
    async acceptClick(row) {
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
    }
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