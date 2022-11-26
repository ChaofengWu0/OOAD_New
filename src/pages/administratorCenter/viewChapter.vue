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
            prop="course.id"
            label="ChapterID"
            width="200">
        </el-table-column>

        <el-table-column
            prop="name"
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
            label="done">
        </el-table-column>

        <el-table-column>

          <template slot-scope="scope">
              <el-button type="success" @click.native.prevent="refuseClick (scope.row)">
              观看视频
            </el-button>
            <el-button type="primary" @click.native.prevent="previous">
              返回课程总概
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

  </div>
</template>

<script>
import { RendererAPI} from "@/api";
import requestUtil from "@/utils/request";
import qs from "qs";



export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "viewChapter",

  data() {
    return {
      chapter_return:{
        chapter_id:"",
        course_id:""

      },
      course_id:"",
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
  created(){ this.getUserList()
    this.getCourseID()},
  methods: {
    previous(){
      this.$router.push({path:"/admin_center/course_detail/" + this.course_id})
    },
    getCourseID() {
      if (this.$route.params && this.$route.params.id) {
        this.course_id = this.$route.params.id
        console.log(this.course_ID)
      } else {
        this.$message("Wrong in function getCourseID which is in classChapter.Vue ")
      }
    },
    async refuseClick(row) {
      this.chapter_return.course_id=this.course_id
      this.chapter_return.chapter_id=row.chapter_id
      const {data: res} = await requestUtil.get('/send-email/simple?'+qs.stringify(this.chapter_return))
      console.log(res);
    },

    async getUserList(){
      const {data: res} = await RendererAPI({})
      console.log(res);
      this.tableData1 = res.data
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
.application_container {
  position: relative;
  background-color: white;
  height: 100%;
  width: 100%;
}
</style>

