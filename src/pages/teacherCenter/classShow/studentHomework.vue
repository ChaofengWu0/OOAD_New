






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
            label="HomeworkID"
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
        <el-table-column class="export_button">

          <template slot-scope="scope">
            <br>
            <el-button type="success" @click.native.prevent="getDoucument (scope.row)">

              getDoucument
            </el-button>
            <br>
            <br>
          </template>

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
  name: "studentGrade",

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
    previewFileEvent() {

      let url = ''

      // 使用微软的office online
      url = 'http://view.officeapps.live.com/op/view.aspx?src=' + ' http://www.cnblogs.com/xiyangbaixue/'

      // window.open()居中打开
      const width = 1000; const height = 800
      const top = (window.screen.availHeight - height) / 2
      const left = (window.screen.availWidth - width) / 2
      window.open(url, '', 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left)
    },
    async getUserList(){
      const {data: res} = await RendererAPI({})
      console.log(res);
      this.tableData = res.data
      if (res.code != 0)
        return this.$message.error("Wrong! Renderer failed")
    },
    getDoucument(){
      window.open('http://www.xdocin.com/xdoc?_key=g54srfoj7fgmrh6dfufin6rtn4&_func=down&_dir=Project2.pdf')
    },
    async refuseClick(row) {
      row.status = 0
      console.log(row)
      const acceptData = {...row};
      //发起请求
      const {data: res} = await ButtonAPI(acceptData)
      console.log(res);

      if (res.code != 0)
        return this.$message.error("Wrong!acceptClick failed")
      console.log("acceptClick")

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

