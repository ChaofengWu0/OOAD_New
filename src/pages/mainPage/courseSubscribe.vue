<template>
  <div class="main_container">
    <div class="banner">
    </div>
  </div>
</template>

<script>
// import requestUtil from "@/utils/request";
// import qs from "qs";

import requestUtil from "@/utils/request";

export default {
  data() {
    return {
      course_id: null,
      course_cover: null,
      course_text_info: null,
    }
  },
  created() {
    this.getCourseID()
    this.getCover()
  },
  methods: {

    async getCover() {
      //todo
      const {data: res} = await requestUtil.get('/eduservice/edu-course/getCourseDetailById/' + this.course_id)
      console.log(res);
      this.course_text_info = res.data.description
      this.course_cover = res.data.cover
      if (res.code !== 20000)
        return this.$message.error("Wrong! Renderer failed")
    },

    getCourseID() {
      if (this.$route.params && this.$route.params.id) {
        this.course_id = this.$route.params.id
        console.log(this.course_id)
      } else {
        this.$message("Wrong in function getCourseID which is in classChapter.Vue ")
      }
    },


  },


}
</script>


<style>
.main_container {
  position: relative;
  height: 100%;
  width: 100%;
}

.banner {
  position: relative;
  height: 500px;
  width: 100%;
  /*background-image: url("");*/
}
</style>




