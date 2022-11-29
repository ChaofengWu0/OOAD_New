<template>
  <div>
    <template>
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop=""
            label="封面"
            width="300">
          <template slot-scope="scope">
            <img :src="scope.row.cover" width="200px" height="100px">
          </template>
        </el-table-column>

        <el-table-column
            prop="title"
            label="课程名字"
            width="300">
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button @click.native.prevent="getDetail(scope.row)" type="primary">
              详情
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </template>
  </div>
</template>

<script>
import requestUtil from "@/utils/request";

export default {
  name: "allVideos",
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getCourses()
  },
  methods: {
    getDetail(row) {
      this.$router.push({path: '/course/' + row.id})
    },

    async getCourses() {
      const {data: res} = await requestUtil.get('/eduservice/edu-course')
      console.log(res);
      this.tableData = res.data.list
      console.log(this.tableData)
      console.log(this.course_list)
      if (res.code !== 20000)
        return this.$message.error("Wrong! Renderer failed")
    },
  }
}
</script>

<style scoped>

</style>