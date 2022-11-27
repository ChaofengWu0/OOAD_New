<template>
  <div>

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
            prop="studentId"
            label="学生ID"
            width="200">
        </el-table-column>

        <el-table-column
            prop="sort"
            label="第几章"
            width="200">
        </el-table-column>


        <el-table-column
            prop="grade"
            label="章节成绩"
            width="200">
        </el-table-column>
        <el-table-column
            prop="time"
            label="视频进度"
            width="200">
        </el-table-column>

        <el-table-column>

          <template slot-scope="scope">
            <el-button type="success" @click.native.prevent="watchVideo (scope.row)">
              观看视频
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
  // eslint-disable-next-line vue/multi-word-component-names
  name: "myClasses",

  data() {
    return {
      course_return: {
        courseId: "",
        studentId: ""
      },
      chapter_return: {
        chapter_id: "",
        course_id: ""
      },
      course_id: "",
      tableData: [],
    }
  },
  created() {
    this.getCourseID()
    this.getUserList()
  },
  methods: {
    getCourseID() {
      if (this.$route.params && this.$route.params.id) {
        this.course_id = this.$route.params.id
        this.course_id = "1596759546842451970"
        // console.log(this.course_id)
      } else {
        this.$message("Wrong in function getCourseID which is in classChapter.Vue ")
      }
    },

    watchVideo(row) {
      console.log(row)
      this.$router.push({path: '/player/' + row.videoUrl})
    },


    async getUserList() {
      console.log(this.course_id)
      const {data: res} = await requestUtil.get('/eduservice/t-chapter/getChapterVideo/' + this.course_id)
      console.log(res)
      this.tableData = res.data.allChapterVideo
      if (res.code !== 20000)
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

