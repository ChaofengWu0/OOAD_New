





<template>
  <div >

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
            type="selection"
            width="55">
        </el-table-column>



        <el-table-column
            prop="id"
            label="ChapterID"
            width="200">
        </el-table-column>

        <el-table-column
            prop="course_name"
            label="ChapterName"
            width="200">
        </el-table-column>

        <el-table-column
            prop="teacher_name"
            label="score"
            width="200">
        </el-table-column>

        <el-table-column
            prop="course_detail"
            label="done"

            show-overflow-tooltip>
          <br>
          <br>
        </el-table-column>

      </el-table>

      <div style="margin-top: 20px" class="button_container">
        <el-button @click="toggleSelection()">Deselect</el-button>
      </div>
    </template>

  </div>
</template>

<script>
import {ButtonAPI, RendererAPI} from "@/api";



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
  created(){ this.getUserList()},
  methods: {
    previous(){
      this.$router.push("/stu_center/my_classes/class_detail/1")
    },
    async getUserList(){
      const {data: res} = await RendererAPI({})
      console.log(res);
      this.tableData = res.data
      if (res.code != 0)
        return this.$message.error("Wrong! Renderer failed")
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

    async refuseClick(row) {
      row.status = 0
      console.log(row)
      const acceptData = {...row};
      //发起请求
      const {data: res} = await ButtonAPI(acceptData)
      console.log(res);
      this.$router.push({path: '/stu_center/my_classes/chapter/' + row.id})
      if (res.code != 0)
        return this.$message.error("Wrong!acceptClick failed")
      console.log("acceptClick")

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

