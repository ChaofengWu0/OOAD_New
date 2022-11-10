<template>
  <div class="application_container">
    <template>
      <el-tabs class="application_list" >
        <el-tab-pane label="All">
          <div class="all">
            <template>
              <el-table
                  :data="All">
                <el-table-column
                    type="index"
                    label="Index"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="course_name"
                    label="Course"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="State"
                >
                </el-table-column>
                <el-table-column
                    prop="paid"
                    label="Paid/Free"
                >
                </el-table-column>
              </el-table>
            </template>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Applied">
          <div class="applied">
            <template>
              <el-table
                  :data="Applied">
                <el-table-column
                    type="index"
                    label="Index"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="course_name"
                    label="Course"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="paid"
                    label="Paid/Free"
                >
                </el-table-column>
              </el-table>
            </template>
          </div>

        </el-tab-pane>

        <el-tab-pane label="Applying">
          <div class="applying">
            <template>
              <el-table
                  :data="Applying">
                <el-table-column
                    type="index"
                    label="Index"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="course_name"
                    label="Course"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="paid"
                    label="Paid/Free"
                >
                </el-table-column>
              </el-table>
            </template>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>

export default {
  name: "applicationCenter",
  data() {
    return {
      All: [{
        course_name: "test1",
        state: 'Applying',
        paid: 'Free'
      },
        {
          course_name: "test2"
        },
        {
          course_name: "test3"
        }],
      Applied: [{}],
      Applying: [{}]
    }
  }
}
</script>

<style scoped>


.application_container {
  position: relative;
  background-color: white;
  height: 100%;
  width: 100%;
}

.application_list{
  position: absolute;
  width: 100%;
  left: 20px;
}


>>> .el-tabs__header {
  margin: 0;
}

</style>