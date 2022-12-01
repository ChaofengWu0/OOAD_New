<template>
  <div>
    <template>
      <el-table-column>
        <el-button @click="previous" type="success">返回课程学生列表</el-button>
      </el-table-column>
      <el-table
          ref="multipleTable"
          :data="tableData"
          :cell-class-name="tableCellClassName"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          class="list_content">
        <el-table-column
            type="index"
            label="序号"
            width="100">
        </el-table-column>
        <el-table-column
            prop="studentId"
            label="学生ID"
            width="100">
        </el-table-column>

        <el-table-column
            prop="chapterId"
            label="章节序号"
            width="150">
        </el-table-column>
        <el-table-column
            prop="time"
            label="观看时间"
            width="150">
        </el-table-column>
        <el-table-column
            prop="hwGrade"
            label="作业成绩"
            width="150">
        </el-table-column>
        <el-table-column
            prop="proGrade"
            label="答题成绩"
            width="150"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            align="center"
            class="export_button">
          <template slot-scope="scope">
            <!--            <el-button type="success" @click="getDoucument (scope.row)">-->
            <!--              在线查看本章作业-->
            <!--            </el-button>-->
            <!--            <router-link target="_blank"-->
            <!--                         :to="{path:'/pdf/'}">-->
            <el-button class="homework" @click="view_hw(scope.row)">
              在 线 查 看 作 业
            </el-button>
            <!--            </router-link>-->

            <el-button type="success" @click.native.prevent="score (scope.row)">
              打分
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog title="给这份作业打个分吧" :visible.sync="score_dialog">
      <el-form>
        <el-form-item label="分数" :label-width="formLabelWidth">
          <el-input-number v-model="score_return.hwGrade" label="打分"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel_score">取 消</el-button>
        <el-button type="primary" @click="submit_score">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import requestUtil from "@/utils/request";
import qs from "qs";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "studentGrade",
  data() {
    return {
      homeworkUrl: null,
      course_return: {
        courseId: "",
        studentId: ""
      },
      course_id: null,
      chapter_id: "",
      student_id: null,
      score_dialog: false,
      formLabelWidth: '120px',
      score_return: {
        studentId: '',
        hwGrade: '',
        chapterId: ''
      },
      tableData: [{
        // studentId: "1",
      }],
    }
  },
  created() {
    this.getCourseID()
    this.getUserList()
  },
  methods: {
    view_hw(row) {
      window.open("http://localhost:8080/#/pdf/" + row.hwUrl, "_blank")
    },
    getCourseID() {
      if (this.$route.params && this.$route.params.id) {
        let String_all = this.$route.params.id
        this.student_id = String_all.split("+")[1]
        this.course_id = String_all.split("+")[0]
        console.log(this.course_id)
        console.log(this.student_id)
      } else {
        this.$message("Wrong in function getCourseID which is in classChapter.Vue ")
      }
    },
    async getUserList() {
      this.course_return.courseId = this.course_id
      this.course_return.studentId = this.student_id
      const {data: res} = await requestUtil.get('/eduservice/t-chapter/getChapterByCourseIdAndStudentId?' + qs.stringify(this.course_return))
      console.log(res);
      this.tableData = res.data.ChapterStudentList
      // this.tableData = res.data.chapterStudent
      console.log(this.tableData)
      if (res.code !== 20000)
        return this.$message.error("Wrong! Renderer failed")
    },
    score(row) {
      this.score_dialog = true
      this.chapter_id = row.chapterId
    },
    previous() {
      this.$router.push('/teacher_center/my_classes/student_list/'+this.course_id)
    },
    // 下面的和在线查看无关
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

    async submit_score() {
      this.score_dialog = false
      console.log(1111111111111111111111111111);
      this.score_return.chapterId = this.chapter_id
      this.score_return.studentId = this.student_id
      console.log(this.score_return);
      const {data: res} = await requestUtil.put('/eduservice/t-chapter-student/hw', this.score_return)
      console.log(res);
      await this.getUserList()
    },

    cancel_score() {
      this.score_dialog = false
      this.score_return.hwGrade = 0
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

