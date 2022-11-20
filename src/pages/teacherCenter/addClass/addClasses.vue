<template>
  <div class="add_classes_container">
    <div class="step_state_container">
      <div class="step_state">
        <el-steps :active="1" finish-status="success" align-center>
          <el-step title="填写课程基本信息"></el-step>
          <el-step title="填写课程大纲"></el-step>
          <el-step title="提交审核"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="add_course_form">
      <el-form label-width="150px" :model="course" ref="add_course_form">

        <el-form-item label="课程名字" style="width: 500px; margin-top: 50px">
          <el-input v-model="course.course_name" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="课程简介" style="width: 500px;">
          <el-input v-model="course.course_content" placeholder="请输入内容"></el-input>
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
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="course.cover"
              :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
// 在这个页面中，需两个地方要用到后端
// 1. 上传图片（还没搞清楚）
// 2. 点击下一步，此时要把course这个对象的所有信息全部传递给后端，后端需要为我们返回一个courseID，我们要把data()中的course_id置为后端返回的ID。
// 接下来就是路由跳转了



export default {
  name: "addClasses",
  mounted() {
    console.log(this)
  },
  data() {
    return {
      saveBtnDisabled: false,
      // 是否付费，boolean
      paid: "",
      course_id : "1",
      // 新申请的课程的名字
      course: {
        course_name: "",
        // 确定新申请的课的状态是applying
        state: "applying",
        course_content: "",
        // 若付费，则价格？
        price: "",
        // 封面
        course_cover: "",
      },
    };
  },
  methods: {
    next() {
      // this.$refs.add_course_form.validate(
      //     async valid => {
      //       if (!valid) {
      //         return this.$message.error("Not valid in addClass")
      //       }
      // const addClasNextData = {...this.course}
      // const {data: res} = TeacherAddClassNextAPI(addClasNextData)
      // if (res.code != 0)
      //   return this.$message.error("Wrong!add class first step failed")
      //
      // // 不知道返回给我的是什么，只是这样猜测
      // this.course_id = res.data.course_id
      // 跳转到第二部分
      this.$router.push({path: '/teacher_center/my_classes/chapter/' + this.course_id})
      // })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
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

/*.step_state {*/
/*  position: relative;*/
/*  width: 80%;*/
/*  left: 100px;*/
/*}*/

</style>