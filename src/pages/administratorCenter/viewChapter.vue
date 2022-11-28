<template>
  <div>

    <template>

      <el-button type="primary" @click.native.prevent="previous" style="margin: 20px">
        返回课程总概
      </el-button>
      <el-table
          ref="multipleTable"
          :data="tableData"
          :cell-class-name="tableCellClassName"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          class="list_content">
        <el-table-column
            prop="sort"
            label="章节"
            width="200">
        </el-table-column>

        <el-table-column
            prop="chapterName"
            label="章节名称"
            width="200">
        </el-table-column>

        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click.native.prevent="watchVideoClick(scope.row)" align="center">
              观看章节视频
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

  </div>
</template>

<script>
import requestUtil from "@/utils/request";


export default {
  name: "viewChapter",

  data() {
    return {
      course_id: "",
      tableData: [],
    }
  },
  created() {
    this.getCourseID()
    this.getUserList()
  },
  methods: {
    previous() {
      this.$router.push({path: "/admin_center/course_detail/" + this.course_id})
    },

    async getUserList() {
      console.log(this.course_id)
      const {data: res} = await requestUtil.get('/eduservice/t-chapter/getChapterListByCourseId/' + this.course_id)
      console.log(res)
      this.tableData = res.data.chapterList
      if (res.code !== 20000)
        return this.$message.error("Wrong! Renderer failed")
    },

    getCourseID() {
      if (this.$route.params && this.$route.params.id) {
        this.course_id = this.$route.params.id
        console.log(this.course_ID)
      } else {
        this.$message("Wrong in function getCourseID which is in classChapter.Vue ")
      }
    },

    async watchVideoClick(row) {
      console.log(row)
      await this.$router.push({path: '/player/' + row.videoUrl + '/' + row.id})
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

