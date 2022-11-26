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
            type="index"
            label="序号"
            width="100">
        </el-table-column>

        <el-table-column
            prop="teacher_name"
            label="章节序号"
            width="150">
        </el-table-column>

        <el-table-column
            prop="teacher_name"
            label="章节名字"
            width="150">
        </el-table-column>
        <el-table-column
            prop="course_detail"
            label="分数"
            width="150"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            align="center"
            class="export_button">
          <template slot-scope="scope">
            <el-button type="success" @click.native.prevent="getDoucument (scope.row)">
              在线查看本章作业
            </el-button>
            <!--             -->
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
          <el-input-number v-model="score_return.score" label="打分"></el-input-number>
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
      course_id:null,
      chapter_id:null,
      student_id:null,
      score_dialog:false,
      formLabelWidth:'120px',
      score_return:{
        student_id:'',
        score:'',
        course_id:'',
        chapter_id:''
      }
      ,
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
    this.getCourseID()
    this.getUserList()
  },
  methods: {

    getCourseID() {
      if (this.$route.params && this.$route.params.id) {
        let String_all=this.$route.params.id
        this.student_id=String_all.split("+")[1]
        this.course_id = String_all.split("+")[0]
        // console.log(this.course_id)
        // console.log(this.student_id)
      } else {
        this.$message("Wrong in function getCourseID which is in classChapter.Vue ")
      }
    },

    previewFileEvent() {
      let url = ''
      // 使用微软的office online
      url = 'http://view.officeapps.live.com/op/view.aspx?src=' + ' http://www.cnblogs.com/xiyangbaixue/'
      // window.open()居中打开
      const width = 1000;
      const height = 800
      const top = (window.screen.availHeight - height) / 2
      const left = (window.screen.availWidth - width) / 2
      window.open(url, '', 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left)
    },
    async getUserList() {
      const {data: res} = await requestUtil.get('/course/enroll/id?id='+this.course_id )
      console.log(res);
      this.tableData1 = res.data
      if (res.code !== '0')
        return this.$message.error("Wrong! Renderer failed")
    },
    async getDoucument(row) {
      let url=row.homework_url
      console.log(url)
      window.open('http://www.xdocin.com/xdoc?_key=g54srfoj7fgmrh6dfufin6rtn4&_func=down&_dir=Project2.pdf')
    },
     score(row) {
      this.score_dialog= true
      this.chapter_id=row.chapter_id


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
    async submit_score(){
      this.score_dialog = false
      this.score_return.chapter_id=this.chapter_id
      this.score_return.course_id=this.course_id
      this.score_return.student_id=this.student_id
      // console.log(this.score_return.score);
      const {data: res} = await requestUtil.post('/notice?' +qs.stringify(this.score_return) )
      console.log(res);
      this.score_return.score = 0
    },
    cancel_score(){
      this.score_dialog = false
      this.score_return.score = 0
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

