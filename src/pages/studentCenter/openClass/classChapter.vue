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
            prop="course.id"
            label="课程ID"
            width="150">
        </el-table-column>

        <el-table-column
            prop="name"
            label="章节序号"
            width="150">
        </el-table-column>

        <el-table-column
            prop="teacher_name"
            label="老师名字"
            width="150">
        </el-table-column>

        <el-table-column
            prop="name"
            label="观看情况"
            width="150">
        </el-table-column>

        <el-table-column
            prop=""
            label="所得分数"
            width="150">
        </el-table-column>

        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button type="success" @click.native.prevent="watch_video (scope.row)">
              观看视频
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

  </div>
</template>

<script>
import {RendererAPI} from "@/api";
// import requestUtil from "@/utils/request";
// import qs from "qs";


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "myClasses",

  data() {
    return {
      chapter_return: {
        chapter_id: "",
        course_id: ""

      },
      course_id: "",
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
    this.getCourseID()
  },
  methods: {
    previous() {
      this.$router.push("/stu_center/my_classes/class_detail/1")
    },
    getCourseID() {
      if (this.$route.params && this.$route.params.id) {
        this.course_id = this.$route.params.id
        console.log(this.course_ID)
      } else {
        this.$message("Wrong in function getCourseID which is in classChapter.Vue ")
      }
    },

    watch_video(row) {
      //  根据row获取id，根据id获取视频source，根据source，进入player/source
      console.log(row)
      this.$router.push({path: '/player/' + "1"})
    },

    async getUserList() {
      const {data: res} = await RendererAPI({})
      console.log(res);
      if (res.code !== '0')
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
</style>

