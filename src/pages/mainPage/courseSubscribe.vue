<template>
  <div class="main_container">
    <div class="image_container">
      <el-image :src="course_cover" class="course_img">
      </el-image>

      <h4 class="text_info">
        测试
      </h4>

    </div>
  </div>
</template>

<script>

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

.image_container {
  height: 460px;
  background-color: #DD4A68;
}

.image_container .course_img {
  height: 400px;
  width: 80%;
  left: 10%;
  /*height: 1000px;*/
}


</style>




