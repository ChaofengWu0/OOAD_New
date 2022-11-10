<template>
  <div class="application_container">

    <template>

      <el-table
          ref="multipleTable"
          :data="tableData"
          :cell-class-name="tableCellClassName"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :default-sort="{prop: 'date', order: 'ascending'}"
          class="list_content">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>

        <el-table-column
            label="ApplyDate"
            prop="date"
            width="120"
        >
          <template slot-scope="scope">{{ scope.row.date }}

          </template>
        </el-table-column>

        <el-table-column
            prop="course.id"
            label="CourseID"
            width="140">
        </el-table-column>

        <el-table-column
            prop="course.name"
            label="CourseName"
            width="140">
        </el-table-column>

        <el-table-column
            prop="teacher.name"
            label="TeacherName"
            width="140">
        </el-table-column>

        <el-table-column
            prop="teacher.id"
            label="TeacherID"
            width="140">
        </el-table-column>

        <el-table-column
            prop="course.detail"
            label="CourseDetail"

            show-overflow-tooltip>
        </el-table-column>

        <el-table-column class="export_button">

          <template slot-scope="scope">
            <el-button type="danger" @click.native.prevent="refuseClick (scope.row)">
              Refuse
            </el-button>
            <br>
            <br>
            <el-button type="success" @click.native.prevent="acceptClick (scope.row)">
              Accept
            </el-button>
          </template>

        </el-table-column>
      </el-table>

      <div style="margin-top: 20px" class="button_container">
        <el-button @click="toggleSelection()">Deselect</el-button>
        <el-button @click="acceptAll">AcceptAll</el-button>
        <el-button @click="refuseAll">RefuseAll</el-button>
      </div>
    </template>

  </div>
</template>

<script>
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
        }
      }, {
        date: "",
        course: {
          name: 'OOAD',
          id: 'CS309',
          detail: "brief info of this course"
        },
        teacher: {
          id: "",
          name: ""
        }
      }, {
        date: "",
        course: {
          name: 'OOAD',
          id: 'CS309',
          detail: "brief info of this course"
        },
        teacher: {
          id: "",
          name: ""
        }
      },],
      multipleSelection: []
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
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
    acceptClick(row){
      console.log(row)
      console.log("acceptClick")
    },
    refuseClick(row){
      console.log(row)
      console.log("refuseClick")
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