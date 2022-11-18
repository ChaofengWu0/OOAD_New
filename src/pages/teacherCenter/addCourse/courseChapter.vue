<template>
  <div class="add_classes_container">
    <div class="step_state_container">
      <div class="step_state">
        <el-steps :active="2" finish-status="success" align-center>
          <el-step title="填写课程基本信息"></el-step>
          <el-step title="填写课程大纲"></el-step>
          <el-step title="提交审核"></el-step>
        </el-steps>
      </div>
    </div>
    <el-form label-width="150px">
      <el-form-item>
        <el-button style="margin-top: 12px;" @click="previous" :disabled="saveBtnDisabled">上一步</el-button>
        <el-button style="margin-top: 12px;" type="primary" @click="next" :disabled="saveBtnDisabled">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "courseChapter",
  data() {
    return {
      saveBtnDisabled: false,
    };
  },
  methods: {
    next() {
      // 跳转到第二部分
      this.$router.push({path: '/teacher_center/my_classes/publish/1'})
      // if (this.active++ > 2) this.active = 0;
    },
    previous() {
      this.$router.push({path: '/teacher_center/my_classes/info/1'})
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