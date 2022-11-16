<template>
  <div class="my_classes_container">

    <div class="my_class_list">
      <template>
        <el-table
            :data="classes"
            :cell-class-name="tableCellClassName"
            @cell-click="cellClick">
          <el-table-column
              type="index"
              label="Index"
              width="100">
          </el-table-column>

          <el-table-column
              prop="course_name"
              label="Course"
          >
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="add_course">
      <el-button type="primary" @click="add_class">
        Add A New Course
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "myClasses",
  data() {
    return {
      classes: [
        {course_name: "test1"},
        {course_name: "test2"}
      ],
    }
  },
  methods: {
    tableCellClassName({row, column, rowIndex, columnIndex}) {
      //注意这里是解构
      //利用单元格的 className 的回调方法，给行列索引赋值
      row.index = rowIndex + 1;
      column.index = columnIndex + 1;
    },
    cellClick(row) {
      console.log(row)
      let url = this.classes[row.index - 1].course_name
      console.log(url)
      this.$router.push(url)
    },
    add_class(){
      console.log("adD")
    }
  }
}
</script>

<style scoped>

.my_classes_container {
  background-color: white;
  height: 100%;
  width: 100%;
}

.add_course{

}

</style>