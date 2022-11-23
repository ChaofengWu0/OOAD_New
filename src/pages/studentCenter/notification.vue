<template>
  <div class="notification_container">
    <div>
      <template>
        <el-table
            :data="notifications"
        >
          <el-table-column
              type="index"
              label="index"
              width="100">
          </el-table-column>
          <el-table-column
              prop="date"
              label="date"
              width="180"
              sortable
          >
          </el-table-column>
          <el-table-column
              prop="content"
              label="content"
          >
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import {RendererAPI} from "@/api";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "notification",
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const {data: res} = await RendererAPI({})
      console.log(res);
      this.notifications = res.data
      if (res.code != 0)
        return this.$message.error("Wrong! Renderer failed")
    }
  },

  data() {
    return {
      // 这个用来装notification
      notifications: this.$store.state.notifications
    }
  }
}
</script>

<style scoped>
.notification_container {
  position: relative;
  background-color: white;
  height: 100%;
  width: 100%;
}

</style>