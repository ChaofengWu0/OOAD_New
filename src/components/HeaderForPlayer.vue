<template>
  <div class="center_head_container">
    <div class="header_left">
      观看课程
    </div>

    <div class="header_right">
      <template>
        <div class="avatar">
          <div class="block">
            <el-avatar :size="50" :src=this.avatar></el-avatar>
          </div>
        </div>
      </template>


      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right">
          </i>
        </span>
        <el-dropdown-menu slot="dropdown">

          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>


    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "header_for_personal_center",
  computed: {
    bread_crumb_list() {
      return this.$route.matched
    }
  },
  data(){
    return{
      avatar : JSON.parse(sessionStorage.getItem("userInfo")).data.avatar}
  },
  created() {
    this.avatar=JSON.parse(sessionStorage.getItem("userInfo")).data.avatar
  },
  methods: {
    handleCommand(command) {
      // 要具体处理对应的事件
      console.log('click on item ' + command);
      if (command === "logout") {
        // 做一些处理，然后回到login界面
        this.$store.dispatch("logout")
      }
    }

  }
}
</script>

<style scoped>
.center_head_container {
  position: relative;
  height: 100%;
  width: 100%;
}

.header_left {
  position: absolute;
  font-size: 50px;
  color: #DD4A68;
  font-family: 华文琥珀;
  left: 44%;
  top: 30%;
}

.header_right {
  position: absolute;
  height: 100%;
  right: 30px;
  top: 20%;
}

.avatar {
  position: absolute;
  right: 20px;
  top: 0;
}

.el-dropdown-link {
  position: absolute;
  right: 0;
  bottom: 0
}


</style>