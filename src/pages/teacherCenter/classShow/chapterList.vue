<template>
  <div class="chapter_list_container">
    ChapterList
    <el-button @click="previous">previous</el-button>
  </div>
</template>

<script>
export default {
  name: "chapterList",
  data() {
    return {
      course_id: "1"
    }
  },
  methods: {
    previous() {
      this.$router.push({path: '/teacher_center/my_classes/list_course/' + this.course_id})
    }
  }
}
</script>

<style scoped>

</style>