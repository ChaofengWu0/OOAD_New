<template>
  <div class="course_list_container">
    courseList
    <el-button @click="next">next</el-button>
  </div>
</template>

<script>
export default {
  name: "courseList",
  data() {
    return {
      course_id: "1",

    }
  },
  methods: {
    next() {
      this.$router.push({path: '/teacher_center/my_classes/list_chapter/' + this.course_id})
    }
  }
}
</script>

<style scoped>

</style>