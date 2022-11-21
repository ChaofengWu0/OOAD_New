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
            label="课程ID"
            prop="course_ID"
            width="120"
        >
        </el-table-column>

        <el-table-column
            prop="course_name"
            label="课程名字"
            width="140">
        </el-table-column>

        <el-table-column
            prop="course_teacher"
            label="老师名字"
            width="140">
        </el-table-column>

        <el-table-column
            prop="course_teacher_id"
            label="老师ID"
            width="140">
        </el-table-column>

        <el-table-column
            prop="course_detail"
            label="课程简介"
            width="140">
        </el-table-column>

        <el-table-column>
          <template slot-scope="scope">
            <!--            <el-button @click.native.prevent="detail(scope.row)" type="primary">课程详情</el-button>-->
            <el-button @click.native.prevent="getStudent(scope.row)" type="primary">课程学生名单</el-button>
            <el-button @click.native.prevent="send_notice(scope.row)" @click="dialogFormVisible=true" type="primary">
              发送通知
            </el-button>
            <el-button @click.native.prevent="send_email(scope.row)" @click="dialogFormVisible=true" type="primary">
              发送邮件与通知
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <template>

      <el-dialog title="发送内容" :visible.sync="dialogFormVisible">

        <el-input
            type="textarea"
            :row="10"
            v-model="notice"
            size="large"
        >
        </el-input>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
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

export default {
  name: "courseList",
  data() {
    return {
      course_id: "1",
      notice: "",
      dialogFormVisible: false,
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
  watch: {
    notice(newV) {
      console.log(newV
      )
    }
  },

  methods: {
    // detail(row) {
    //   this.$router.push({path: '/teacher_center/my_classes/list_chapter/' + this.course_id})
    //   console.log(row.row)
    // },
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
    getStudent(row) {
      this.$router.push({path: '/teacher_center/my_classes/student_list/' + this.course_id})
      console.log(row.row)
    },
    send_email(row) {
      console.log(row.row)
    },
    send_notice(row) {
      console.log(row.row)
    }
  }

}
</script>

<style scoped>

</style>