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
            prop="chapterId"
            label="章节"
            width="200">
        </el-table-column>

        <el-table-column
            prop="hwGrade"
            label="作业成绩"
            width="200">
        </el-table-column>

        <el-table-column
            prop="proGrade"
            label="答题成绩"
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
import qs from "qs"

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
      } else {
        this.$message("Wrong in function getCourseID which is in classChapter.Vue ")
      }
    },

    async watchVideo(row) {
      console.log(1111111111111111111)
      console.log(row)
      const {data: res} = await requestUtil.get('/eduservice/t-chapter/getChapterInfo/' + row.chapterId)
      console.log(res)

      await this.$router.push({path: '/player/' + res.data.chapter.videoUrl + '/' + row.chapterId})
    },


    async getUserList() {
      console.log(this.course_id)
      // const getForm = {
      //   courseId: this.course_id,
      //   studentId: JSON.parse(sessionStorage.getItem("userInfo")).data.id
      // }
      const getForm = {
        courseId: this.course_id,
        studentId: JSON.parse(sessionStorage.getItem("userInfo")).data.id
      }
      console.log(getForm)
      const {data: res} = await requestUtil.get('/eduservice/t-chapter/getChapterByCourseIdAndStudentId?' + qs.stringify(getForm))
      console.log(res)
      this.tableData = res.data.ChapterStudentList
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

