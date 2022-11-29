<template>
  <div class="wrap">
    <iframe :src="pSrc" width="100%" height="100%"></iframe>
  </div>
</template>

<script>
export default {
  name: "pdfS",
  data() {
    return {
      pSrc: '',
      baseurl: '',
    };
  },


  methods: {
    loadPDF() {
      //ie有缓存加个随机数解决  + '?r=' + new Date()
      // let pSrc = baseurl + '?r=' + new Date();
      // this.baseurl = 'https:\\\\edu-sustech.oss-cn-shenzhen.aliyuncs.com\\9b3ab01f29314175ba4b814012a2cc7622-OOAD-Project.pdf';
      this.pSrc = '../../plugin/pdf/web/viewer.html?file=' + encodeURIComponent(this.baseurl)
    },

    getPDf() {
      if (this.$route.params && this.$route.params.para1) {
        this.baseurl = this.$route.params.para1
        // this.baseurl = tmp1 + '//' + tmp2 + '/' + tmp3
        // this.baseurl = ""
        console.log(this.baseurl)
      } else {
        this.$message("Wrong in function getCourseID which is in classChapter.Vue ")
      }
    },
  },

  created() {
    this.getPDf()
    console.log("created")
    console.log(this.baseurl)
  },

  mounted: function () {
    this.loadPDF()
  }

};
</script>

<style scoped>
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
}
</style>

