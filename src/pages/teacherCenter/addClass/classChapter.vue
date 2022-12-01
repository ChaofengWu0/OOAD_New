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
            stripe
            style="width: 100%">
          <el-table-column
              prop="sort"
              label="章节"
              width="250">
          </el-table-column>
          <el-table-column
              prop="chapterName"
              label="章节名字"
              width="250">
          </el-table-column>
          <el-table-column
              prop="grade"
              label="分数"
          >
          </el-table-column>


        </el-table>
      </template>
      <el-dialog title="添加章节" :visible.sync="dialogFormVisible">
        <el-form :model="chapterForm">
          <el-form-item label="章节名称" :label-width="formLabelWidth">
            <el-input v-model="chapterForm.chapterName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="第几章" :label-width="formLabelWidth">
            <el-input-number v-model="chapterForm.sort" :min="1" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="内容简介" :label-width="formLabelWidth">
            <el-input v-model="chapterForm.content" type="textarea" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="章节分数" :label-width="formLabelWidth">
            <el-input-number v-model="chapterForm.grade" :min="1" :step="10"></el-input-number>
          </el-form-item>
          <el-form-item label="视频" :label-width="formLabelWidth">
            <el-upload
                class="upload-demo"
                ref="upload"
                action="http://localhost:8003/edu-vod/video/uploadAliyunVideo"
                :on-success="handleVodUploadSuccess"
                :file-list="fileList"
                :auto-upload="true"
                :limit="1"
            >
              <el-button slot="trigger" size="small" type="primary">选取视频</el-button>
            </el-upload>
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
// todo
// 1.这个页面在一开始要在created()函数中把courseID传递给后端，需要从后端拿到这门课的所有chapter，并且把chapter全部存入data()中的chapterList中,
// 注意每个变量的名字要和table里面的prop的名字一模一样（或者修改成一模一样）
// 在这个方法中我已经调用getChapterVideos方法，todo 补充这个方法即可

// 2.在submit()方法里面要添加的，将chapterForm中的所有内容，全部传递给后端

// 3.next()中要添加的，传给数据库courseID,调用一个方法，让后端更新相关的信息

import requestUtil from "@/utils/request";

export default {
  name: "courseChapter",
  data() {
    return {
      fileList:[],
      formLabelWidth: '120px',
      saveBtnDisabled: false,
      course_ID: "",
      // 此值为false，则弹出的表单不可见
      dialogFormVisible: false,
      // 正在添加的
      chapterForm: {
        chapterName: "",
        sort: 0,
        content: "",
        courseId: this.course_ID,
        grade: 0,
        videoUrl: null,
        videoName: null,
      },

      // 返回拿到的chapterList
      chapterList: [
        {},

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
    // tableCellClassName({row, column, rowIndex, columnIndex}) {
    //   //注意这里是解构
    //   //利用单元格的 className 的回调方法，给行列索引赋值
    //   row.index = rowIndex + 1;
    //   column.index = columnIndex + 1;
    // },
    handleVodUploadSuccess(rep, file) {
      this.chapterForm.videoUrl = rep.data.videoId
      this.chapterForm.videoName = file.name
      console.log(rep)
    },
    cancel() {
      this.dialogFormVisible = false
      this.fileList = []
      this.getChapterVideos()
    },
    async submit() {
      // 关闭弹窗
      this.dialogFormVisible = false
      this.fileList = []
      const {data: res} = await requestUtil.post('/eduservice/t-chapter/addChapter', this.chapterForm)
      if (res.code === 20000) {
        this.$message.success("添加章节成功")
      }
      // todo
      // 调用方法，数据交给后端
      // 拿到后端res之后，如果成功，显示成功message，失败则显示对应消息
      this.chapterForm = {
        chapterName: null,
        sort: 0,
        content: null,
        courseId: this.course_ID,
        grade: 0,
        videoUrl: null,
        videoName: null,
      }
      this.getChapterVideos()
    },

    getCourseID() {
      if (this.$route.params && this.$route.params.id) {
        this.course_ID = this.$route.params.id
        this.chapterForm.courseId = this.course_ID
      } else {
        this.$message("Wrong in function getCourseID which is in classChapter.Vue ")
      }
    },
    async getChapterVideos() {
      // todo
      // 拿到后端数据，传递给对应的值，如最开始todo中写的那样
      const {data: res} = await requestUtil.get('/eduservice/t-chapter/getChapterListByCourseId/' + this.course_ID)
      console.log(res)
      this.chapterList = res.data.chapterList
      console.log(this.chapterList)
    },

    async next() {
      // 提交审核
      const {data: res} = await requestUtil.post('/eduservice/edu-course/publishCourse/' + this.course_ID)
      console.log(res)
      if (res.code === 20000) {
        this.$message.success("提交审核成功")
      }
      await this.$router.push("/teacher_center/my_classes/add_class")
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