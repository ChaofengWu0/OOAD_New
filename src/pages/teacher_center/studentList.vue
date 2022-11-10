<template>
  <div class="student_list_container">

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
            width="55"
            >
        </el-table-column>

        <el-table-column
            label="Course"
            prop="date"
            width="120"
            sortable>
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
            prop=""
            label="UsrID"
            width="120">
        </el-table-column>
        <el-table-column
            prop="name"
            label="Name"
            width="120">
        </el-table-column>
        <el-table-column
            prop=""
            label="progress"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column class="export_button">

          <template slot-scope="scope">
            <el-button @click.native.prevent="exportClick (scope.row)">
              Export
            </el-button>
          </template>

        </el-table-column>
      </el-table>

      <div style="margin-top: 20px" class="button_container">
        <el-button @click="toggleSelection()">Deselect</el-button>
        <el-button @click="sendEmail">Send Email</el-button>
      </div>
    </template>

  </div>
</template>

<script>
export default {
  name: "studentList",
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
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
    sendEmail() {
      console.log("send_email")
      console.log(this.$refs.multipleTable.selection)
    },
    tableCellClassName({row, column, rowIndex, columnIndex}) {
      //注意这里是解构
      //利用单元格的 className 的回调方法，给行列索引赋值
      row.index = rowIndex + 1;
      column.index = columnIndex + 1;
    },
    exportClick(row) {
      console.log(row)
      console.log(row.index)
      console.log(this.tableData[row])
      //  这里以后想导出就用后端搜索用户名然后导出吧
    }

  }
}
</script>

<style scoped>
.student_list_container {
  position: relative;
  background-color: white;
  height: 100%;
  width: 100%;
}

.list_content {
  width: 100%;
  position: relative;
  left: 20px;
}

.button_container {
  width: 100%;
  position: relative;
  left: 20px;
}

.export_button {
  position: absolute;
  right: 0;
}


</style>