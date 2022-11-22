<template>
  <div>
    Playerasdasasdasdas
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "index",
  data() {
    return {
      video: {
        video_url: "",
      }
    }
  },
  methods: {
    getVideoID() {
      if (this.$route.params && this.$route.params.id) {
        this.video.video_url = this.$route.params.id
        // console.log()
      } else {
        this.$message("Wrong in function getCourseID which is in classChapter.Vue ")
      }
    },
  },
  created() {
    this.getVideoID()
  }
}
</script>

<style scoped>

</style>