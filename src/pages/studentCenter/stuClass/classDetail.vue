<template>
<div>
  class-detail
  <el-button @click="next">next</el-button>
</div>
</template>

<script>
export default {
  name: "classDetail",
  methods:{
    next(){
      this.$router.push("/stu_center/my_classes/chapter/1")
    }
  }
}
</script>

<style scoped>

</style>