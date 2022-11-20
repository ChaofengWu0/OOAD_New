<template>
  <div class="add_chapter_container">

    <div class="step_state_container">
      <div class="step_state">
        <el-steps :active="2" finish-status="success" align-center>
          <el-step title="填写课程基本信息"></el-step>
          <el-step title="填写课程大纲"></el-step>
<!--          <el-step title="提交审核"></el-step>-->
        </el-steps>
      </div>
    </div>

    <div class="chapter_form_together">

      <el-button type="text" @click="dialogFormVisible = true">添加章节</el-button>

      <template>
        <el-table
            :data="chapterList"
            :cell-class-name="tableCellClassName"
            stripe
            style="width: 100%">
          <el-table-column
              prop="num"
              label="章节"
              width="180">
          </el-table-column>
          <el-table-column
              prop="name"
              label="名字"
              width="180">
          </el-table-column>
          <el-table-column
              prop="content"
              label="简介">
          </el-table-column>
<!--          先不写-->
<!--          <el-table-column>-->
<!--            <template slot-scope="scope">-->
<!--              <el-button @click.native.prevent="Edit (scope.row)">编 辑</el-button>-->
<!--              <el-button @click.native.prevent="Delete(scope.row)">删 除</el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>
      </template>


      <el-dialog title="添加章节" :visible.sync="dialogFormVisible">
        <el-form :model="chapterForm">
          <el-form-item label="章节名称" :label-width="formLabelWidth">
            <el-input v-model="chapterForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="第几章" :label-width="formLabelWidth">
            <el-input-number v-model="chapterForm.num" :min="1" :step="1" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="内容简介" :label-width="formLabelWidth">
            <el-input v-model="chapterForm.content" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>


      <div class="buttons__control">
        <el-button style="margin-top: 20px;" @click="previous" :disabled="saveBtnDisabled">上一步</el-button>
        <el-button type="primary" @click="next" :disabled="saveBtnDisabled">提交审核</el-button>
      </div>

    </div>

  </div>
</template>

<script>

// import {showChapters} from "@/api/teacherAddClass/showChapter"

// todo: 写getChapterVideos方法
// 这个页面在一开始要在created()函数中把courseID传递给后端，需要从后端拿到这门课的所有chapter，并且把chapter全部存入data()中的chapterList中


export default {
  name: "courseChapter",
  data() {
    return {
      formLabelWidth: '120px',
      saveBtnDisabled: false,
      course_ID: "",
      // 此值为false，则弹出的表单不可见
      dialogFormVisible: false,
      // 正在添加的
      chapterForm: {
        name: "",
        num: "",
        content: "",
        course_id: this.course_ID,
      },

      // 返回拿到的chapterList
      chapterList: [
        {
          num: "第一章",
          name: 'test',
          content: 'asdasda',
          id: "asdas"
        },

      ]
    }
  },
  created() {
    // 调用此方法设置courseID
    this.getCourseID()
    // 调用此方法设置chapterList
    this.getChapterVideos()
  },
  methods: {
    tableCellClassName({row, column, rowIndex, columnIndex}) {
      //注意这里是解构
      //利用单元格的 className 的回调方法，给行列索引赋值
      row.index = rowIndex + 1;
      column.index = columnIndex + 1;
    },


    Edit(row) {
      console.log(row)
    },
    Delete() {
      console.log("Delete")
    },

    cancel() {
      // 关闭弹窗
      this.dialogFormVisible = false
      //
      this.getChapterVideos()
    },
    submit() {
      // 关闭弹窗
      this.dialogFormVisible = false
      // todo
      // 调用方法，数据交给后端
      // 拿到后端res之后，如果成功，显示成功message，失败则显示对应消息

      //
      this.getChapterVideos()
    },

    getCourseID() {
      if (this.$route.params && this.$route.params.id) {
        this.course_ID = this.$route.params.id
        console.log(this.course_ID)
      } else {
        this.$message("Wrong in function getCourseID which is in classChapter.Vue ")
      }
    },
    getChapterVideos() {
      // todo
      // this.chapterList = showChapters()
    },
    next() {
      // 提交审核
      this.$router.push("/teacher_center/my_classes/class_list")
    },
    previous() {
      this.$router.push({path: '/teacher_center/my_classes/info/1'})
    }
  }
}
</script>

<style scoped>


.add_chapter_container {
  position: relative;
  height: 100%;
  width: 100%;
}

.step_state_container {
  position: relative;
  width: 100%;
}

.chapter_form_together {
  position: relative;
  width: 100%;
}

.buttons {
  position: relative;
}

</style>