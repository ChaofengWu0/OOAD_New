<template>
  <div class="add_classes_container">
    <div class="step_state_container">
      <div class="step_state">
        <el-steps :active="3" finish-status="success" align-center>
          <el-step title="填写课程基本信息"></el-step>
          <el-step title="填写课程大纲"></el-step>
          <el-step title="提交审核"></el-step>
        </el-steps>
      </div>
    </div>
    <el-form label-width="150px">
      <el-form-item>
        <el-button style="margin-top: 12px;" @click="previous" :disabled="saveBtnDisabled">上一步</el-button>
        <el-button style="margin-top: 12px;" type="primary" @click="submit" :disabled="saveBtnDisabled">提交审核
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  name: "coursePublish",
  data() {
    return {
      active: 0,
      saveBtnDisabled: false,
    };
  },
  methods: {
    submit() {
      this.$router.push("/teacher_center/my_classes/class_list")
    },
    previous() {
      this.$router.push({path: '/teacher_center/my_classes/chapter/1'})
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
</style>