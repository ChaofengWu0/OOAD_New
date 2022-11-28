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
      baseurl: ''
    };
  },
  methods: {
    loadPDF() {
      //baseurl ：pdf存放的文件路径
      this.baseurl = 'https://edu-sustech.oss-cn-shenzhen.aliyuncs.com/Undergraduate%20Students%20Declaration%20Form.pdf';
      //ie有缓存加个随机数解决  + '?r=' + new Date()
      // let pSrc = baseurl + '?r=' + new Date();
      this.pSrc = '../../plugin/pdf/web/viewer.html?file=' + encodeURIComponent(this.baseurl);
    },
  },

  mounted: function () {
    this.loadPDF();
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

