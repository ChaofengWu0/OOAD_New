<template>
  <div>
    <template>
      <el-button @click="previous" type="success" style="margin-left: 5px">返回课程详情</el-button>

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
            width="150">
        </el-table-column>

        <el-table-column
            prop="chapterName"
            label="章节名称"
            width="150">
        </el-table-column>

        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button type="primary" @click.native.prevent="watch_video (scope.row)">
              观看视频
            </el-button>

            <el-button type="primary" ref="problem_button" @click="submit_problem(scope.row)">
              发布习题
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="left" width="170px">
          <template slot-scope="scope">
            <el-upload
                class="upload-demo"
                ref="upload"
                action="http://localhost:9001/eduoss/fileoss"
                :on-success="success"
                :auto-upload="true"
                :limit="1"
            >
              <el-button type="primary" @click="choose(scope.row)">
                选择发布作业文件
              </el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button v-if="scope.homework_url!==null" type="primary" @click="publish(scope.row)">
              发布作业
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!--布置习题-->
    <el-dialog title="布置习题" :visible.sync="dialogFormVisibleForProblem">
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <h3> 注意 :在A B C D中至少填入两个选项，并且选择一个作为此题目的答案</h3>
        <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="'题目' + (index+1)"
            :key="index"
            :prop="'domains.' + index + '.value'"
            :rules="{required: true, message: '题目不能为空', trigger: 'blur'}">
          <el-input v-model="domain.value"></el-input>
          <el-form-item prop="resource">
            <el-radio label="A" v-model="domain.answer" style="padding-top: 20px ;padding-bottom: 20px">
              A
              <el-input v-model="domain.optionA"></el-input>
            </el-radio>
            <el-radio label="B" v-model="domain.answer" style="padding-left: 50px;padding-bottom: 20px">
              B
              <el-input v-model="domain.optionB"></el-input>
            </el-radio>
            <el-radio label="C" v-model="domain.answer" style="padding-top: 20px; padding-bottom: 10px">
              C
              <el-input v-model="domain.optionC"></el-input>
            </el-radio>
            <el-radio label="D" v-model="domain.answer" style="padding-left: 50px;padding-bottom: 10px">
              D
              <el-input v-model="domain.optionD"></el-input>
            </el-radio>
          </el-form-item>
          <el-button @click.prevent="removeDomain(domain)">删除此题</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain">再加一题</el-button>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">提 交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import requestUtil from "@/utils/request";

export default {
  name: "myClasses",

  data() {
    return {
      nowChapter: null,
      row_id: "",
      flag: false,
      homework_url: null,
      course_id: "",
      tableData: [{
        name: "test",
      }],
      dialogFormVisibleForProblem: false,
      dynamicValidateForm: {
        domains: [{
          value: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          answer: ''
        }],
      },

      teacher_give_homework: {
        id: null,
        homeworkUrl: null,
      }
    }
  },
  created() {
    this.getCourseID()
    this.getUserList()
  },

  mounted() {
    console.log("mounted")
    console.log(this.homework_url)
  },


  methods: {
    submit_problem(row) {
      // console.log(111111111111111)
      this.nowChapter = row.id
      this.dialogFormVisibleForProblem = true

    },
    previous() {
      this.$router.push("/teacher_center/my_classes/course_detail/" + this.course_id)
    },

    choose(row) {
      this.row_id = row.id
    },

    success(res) {
      this.teacher_give_homework.homeworkUrl = res.data.url
      console.log(res)
    },

    getCourseID() {
      if (this.$route.params && this.$route.params.id) {
        this.course_id = this.$route.params.id
      } else {
        this.$message("Wrong in function getCourseID which is in viewChapter.Vue ")
      }
    },

    watch_video(row) {
      this.$router.push({path: '/player/' + row.videoUrl + '/' + row.id})
    },

    async getUserList() {
      const {data: res} = await requestUtil.get('/eduservice/t-chapter/getChapterListByCourseId/' + this.course_id)
      this.tableData = res.data.chapterList
      if (res.code !== 20000)
        return this.$message.error("Wrong! Renderer failed")
    },

    // 接下来5个方法都是和problem有关的
    initial_form() {
      this.dynamicValidateForm = {
        domains: [{
          value: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          answer: ''
        }],
      }
    },

    cancel() {
      this.dialogFormVisibleForProblem = false
      this.initial_form()
    },

    async submit() {
      this.dialogFormVisibleForProblem = false
      // 提交给后端
      let returnForm = []
      for (const idx in this.dynamicValidateForm) {
        let problem = this.dynamicValidateForm[idx]
        for (const problemElement of problem) {
          let myanswer = 0
          switch (problemElement.answer) {
            case "A":
              myanswer = 0
              break
            case "B":
              myanswer = 1
              break
            case "C":
              myanswer = 2
              break
            case "D":
              myanswer = 3
              break
          }
          const ret = {
            content: problemElement.value,
            optionA: problemElement.optionA,
            optionB: problemElement.optionB,
            optionC: problemElement.optionC,
            optionD: problemElement.optionD,
            answer: myanswer
          }
          returnForm.push(ret)
        }
      }
      console.log(returnForm)
      const {data: res} = await requestUtil.post('/eduservice/t-problem/' + this.nowChapter, returnForm);
      console.log(res)
      if (res.code !== 20000) {
        this.$message.error("Wrong! Renderer failed")
      }
      this.initial_form()
      this.$refs.problem_button.disabled = true
    },

    removeDomain(item) {
      let index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    }
    ,

    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      });
    }
    ,

    // 发布作业
    async publish(row) {
      // this.nowChapter = row
      console.log(this.row_id)
      console.log(row)
      if (this.teacher_give_homework.homeworkUrl === null || this.row_id !== row.id) {
        this.$message.warning("你还没有选择文件")
      } else {
        // todo 这里点击之后要给后端homework的url以及课程名字
        this.teacher_give_homework.id = row.id
        const {data: res} = await requestUtil.post('/eduservice/t-chapter/updateChapter', this.teacher_give_homework)
        console.log(res)
        this.teacher_give_homework.homeworkUrl = null
      }
    }
    ,

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    }
    ,

    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
    ,

    tableCellClassName({row, column, rowIndex, columnIndex}) {
      //注意这里是解构
      //利用单元格的 className 的回调方法，给行列索引赋值
      row.index = rowIndex + 1;
      column.index = columnIndex + 1;
    }
    ,

  },
}
</script>


<style scoped>
</style>

