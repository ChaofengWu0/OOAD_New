<template>
  <div class="add_classes_container">
    <div class="step_state_container">
      <div class="step_state">
        <el-steps :active="1" finish-status="success" align-center>
          <el-step title="填写课程基本信息"></el-step>
          <el-step title="填写课程大纲"></el-step>
          <!--          <el-step title="提交审核"></el-step>-->
        </el-steps>
      </div>
    </div>
    <div class="add_course_form">
      <el-form label-width="150px" :model="course" ref="add_course_form">

        <el-form-item label="课程名字" style="width: 500px; margin-top: 50px">
          <el-input v-model="course.title" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="课程简介" style="width: 500px;">
          <el-input v-model="course.description" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="付费" prop="paid">
          <el-radio v-model="paid" label="false">免费</el-radio>
          <el-radio v-model="paid" label="true">付费</el-radio>
        </el-form-item>

        <el-form-item v-show="paid=== 'true' " label="价格" style="width: 500px;">
          <el-input v-model="course.price" placeholder="请输入价格"></el-input>
        </el-form-item>

        <el-form-item label="课程封面">
          <el-upload
              class="upload-demo"
              ref="upload"
              action="http://localhost:9001/eduoss/fileoss"
              :on-success="success"
              :before-upload="beforeAvatarUpload"
              :auto-upload="true"
              :limit="1"
          >
            <img :src="course.cover" v-if="course.cover!==''" class="cover">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传png文件，且不超过5Mb</div>
          </el-upload>

        </el-form-item>


        <el-form-item>
          <el-button style="margin-top: 12px;" type="primary" @click="next" :disabled="saveBtnDisabled">下一步
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import {TeacherAddClassNextAPI} from "@/api";
// todo
// 1.点击下一步，此时要把course这个对象的所有信息全部传递给后端，后端需要为我们返回一个courseID，我们要把data()中的course_id置为后端返回的ID。
// 接下来就是路由跳转了
import requestUtil from "@/utils/request";

export default {
  name: "addClasses",
  mounted() {

  },
  data() {
    return {
      saveBtnDisabled: false,
      // 是否付费，boolean
      paid: "",
      course_id: null,
      // 新申请的课程的名字
      course: {
        teacherId: this.$store.getters.getUserInfo.data.id,
        // course_ID: "",
        title: "",
        // 确定新申请的课的状态是applying
        state: "applying",
        description: "",
        // 若付费，则价格？
        price: 0,
        // 封面
        cover: "",
      },
    };
  },
  methods: {


    success(res, file) {
      this.course.cover = res.data.url
      console.log(file)
      this.$message.success("上传封面成功")
    },

    //上传之前调用的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt2M
    },


    async next() {
      const {data: res} = await requestUtil.post('/eduservice/edu-course/addCourseInfo', this.course)
      this.course_id = res.data.courseId
      // 跳转到第二部分
      await this.$router.push({path: '/teacher_center/my_classes/add_chapter/' + this.course_id})
    },
  }
}
</script>

<style scoped>
.add_classes_container {
  position: relative;
  height: 100%;
  width: 100%;
}

.step_state_container {
  position: relative;
  width: 100%;
}

.add_course_form {
  position: absolute;
  left: 25%;
}

.cover {
  height: 100px;
  width: 220px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
}

/*.step_state {*/
/*  position: relative;*/
/*  width: 80%;*/
/*  left: 100px;*/
/*}*/

</style>