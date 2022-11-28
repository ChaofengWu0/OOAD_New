<template>
  <div class="box">
    <div class="title">导出excel</div>
    <el-button @click="exportExcel">导出</el-button>
  </div>
</template>

<script>
// import ExportJsonExcel from "js-export-excel";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'test',
  data() {
    return {
      list: {
        getList: [
          {
            id: "1",
            province: "江西",
            city: "赣州",
          },
          {
            id: "2",
            province: "广东",
            city: "深圳",
          },
          {
            id: "3",
            province: "湖南",
            city: "长沙",
          },
          {
            id: "4",
            province: "浙江",
            city: "杭州",
          },
          {
            id: "5",
            province: "河南",
            city: "洛阳",
          },
          {
            id: "6",
            province: "山东",
            city: "青岛",
          },
          {
            id: "7",
            province: "安徽",
            city: "烟台",
          },
        ],
      },

    };
  },

  methods: {
    exportExcel(){
      window.open("https://edu-sustech.oss-cn-shenzhen.aliyuncs.com/22-OOAD-Project.pdf", '_blank')
    }
  }
};
</script>

<style>
</style>