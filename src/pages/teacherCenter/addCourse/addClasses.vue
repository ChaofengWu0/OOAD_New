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
    <el-form label-width="150px" :model="course" ref="add_course_form">

      <el-form-item label="课程名字" style="width: 500px; margin-top: 50px">
        <el-input v-model="course.course_name" placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item label="付费" prop="paid">
        <el-radio v-model="course.paid" label="false">免费</el-radio>
        <el-radio v-model="course.paid" label="true">付费</el-radio>
      </el-form-item>

      <el-form-item v-show="course.paid=== 'true' " label="价格" style="width: 500px;">
        <el-input v-model="course.price" placeholder="请输入内容"></el-input>
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
        <el-button style="margin-top: 12px;" type="primary" @click="next" :disabled="saveBtnDisabled">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "addClasses",
  mounted() {
    console.log(this)
  },
  data() {
    return {
      saveBtnDisabled: false,
      // 新申请的课程的名字
      course: {
        course_name: "",
        // 确定新申请的课的状态是applying
        state: "applying",
        // 是否付费，boolean
        paid: "",
        // 若付费，则价格？
        price: "",
        // 封面
        course_cover: "",
        applied_time: "",
        cover: {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      },
    };
  },
  methods: {
    next() {
      // 跳转到第二部分
      this.$router.push({path: '/teacher_center/my_classes/chapter/1'})
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

/*.step_state {*/
/*  position: relative;*/
/*  width: 80%;*/
/*  left: 100px;*/
/*}*/

</style>