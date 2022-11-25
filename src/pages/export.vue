<template>
  <div class="box">
    <div class="title">导出excel</div>
    <el-button @click="exportExcel">导出</el-button>
  </div>
</template>

<script>
import ExportJsonExcel from "js-export-excel";

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
    exportExcel() {
      console.log(123);
      const dataList = this.list.getList;

      let option = {};  //   option代表的就是excel文件

      let dataTable = [];   //   dataTable代表excel文件中的数据内容

      if (dataList) {
        for (let i in dataList) {
          let obj = {
            序号: dataList[i].id,
            省份: dataList[i].province,
            城市: dataList[i].city,
          };

          dataTable.push(obj);   //   设置excel每列获取的数据源
        }
      }

      option.filename = "省份城市表";  //excel文件名
      //excel文件数据
      option.datas = [
        {
          //   excel文件的数据源
          sheetData: dataTable,
          //   excel文件sheet的表名
          sheetName: "sheet",
          //   excel文件表头名
          sheetHeader: ["序号", "省份", "城市"],
          //   excel文件列名
          sheetFilter: ["序号", "省份", "城市"],
        },
      ];
      //   创建ExportJsonExcel实例对象
      let toExcel = new ExportJsonExcel(option);
      //   调用保存方法
      toExcel.saveExcel();
    },
  },
};
</script>

<style>
</style>