<template>
  <div>
    class-detail
    <el-button @click="previous">previous</el-button>
  </div>
</template>

<script>
export default {
  name: "chapterS",
  methods:{
    previous(){
      this.$router.push("/stu_center/my_classes/class_detail/1")
    }
  }
}
</script>

<style scoped>

</style>