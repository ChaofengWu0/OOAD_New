<template>
  <div class="course_list_container">
    <template>
      <el-table
          ref="multipleTable"
          :data="course_data"
          :cell-class-name="tableCellClassName"
          tooltip-effect="dark"
          style="width: 100%"
          class="list_content">
        <el-table-column
            label="课程名称"
            prop="title"
            width="200"
        >
        </el-table-column>

        <el-table-column
            prop="teacherId"
            label="老师ID"
            width="140">
        </el-table-column>
        <el-table-column
            prop=buyCount
            label="课程购买人数"
            width="140">
        </el-table-column>
        <el-table-column
            prop="gmtCreate"
            label="创建时间"
            width="140">
        </el-table-column>

        <el-table-column
            prop="status"
            label="通过情况"
            width="140">
        </el-table-column>
        <el-table-column
            prop="price"
            label="价格"
            width="140">
        </el-table-column>
        <el-table-column>
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
// 注意，这里有个地方没写好，如我点击了“发送”只会，输入框内容不会清空
// todo
// 1. send_email
// 2. send_notice
// 1 2方法调用的api是一样的（后端只会写一个接口） 我们只需要把courseID，data()中的notice，以及一个int类型的数据给后端（用来标记是发送email还是发送notice）
// 发送成功后可以显示一个发送成功的消息this.$message

import requestUtil from "@/utils/request";

export default {
  name: "courseList",
  data() {
    return {
      teacherUsername: "",
      course_id: "1",
      course_data: [{
        course_ID: "1",
        course_name: "课程名字",
        // 介绍
        course_detail: "课程简介",
        course_teacher: "课程老师",
        course_teacher_id: "课程老师id",
      },],
    }
  },
  created() {
    this.getUserList()
  },

  methods: {
    async getUserList() {
      const {data: res} = await requestUtil.get('/eduservice/edu-course/getCourseByTeacherId/' + JSON.parse(sessionStorage.getItem("userInfo")).data.id)
      // todo
      // this.$store.getters.getUserInfo.username
      console.log(res.data);
      this.course_data = res.data.courseList
      if (res.code !== 20000)
        return this.$message.error("Wrong! Renderer failed")
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    tableCellClassName({row, column, rowIndex, columnIndex}) {
      //注意这里是解构
      //利用单元格的 className 的回调方法，给行列索引赋值
      row.index = rowIndex + 1;
      column.index = columnIndex + 1;
    },

    getDetail(row) {
      this.$router.push({path: '/teacher_center/my_classes/course_detail/' + row.id})
    }
  }

}
</script>

<style scoped>

</style>