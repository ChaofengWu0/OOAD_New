<template>
  <div class="center_head_container">
    <div class="header_left">
      <el-breadcrumb separator="/" class="bread_crumb">
        <el-breadcrumb-item v-for="(item,index) in bread_crumb_list" :key="index">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="header_right" >
            <template>
              <div class="avatar">
                <div class="block">
                  <i class="el-icon-user" style="font-size: 30px"></i>
                  <!--                  <el-avatar :size="50" :src=this.avatar></el-avatar>-->
                </div>
              </div>
            </template>


      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right">
          </i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!--
          这里点击之后，要退出登录，要清空id和啥啥啥之类的
          -->
          <el-dropdown-item command="main_page">进入主页</el-dropdown-item>
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
  data() {
    return {
      avatar: JSON.parse(sessionStorage.getItem("userInfo")).data.avatar
    }
  },
  created() {
    this.avatar = JSON.parse(sessionStorage.getItem("userInfo")).data.avatar
    window.addEventListener('setItem', () => {
      console.log("aaaaaaaaaaaaaa")
      this.avatar = JSON.parse(sessionStorage.getItem("userInfo")).data.avatar
    })
  },
  computed: {
    bread_crumb_list() {
      return this.$route.matched
    }
  },


  methods: {
    handleCommand(command) {
      // 要具体处理对应的事件
      console.log('click on item ' + command);
      if (command === "logout") {
        // 做一些处理，然后回到login界面
        this.$store.dispatch("logout")
      } else if (command === "main_page") {
        this.$router.push("/main_page")
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
  height: 100%;
  width: 100%;
}

.header_right {
  position: absolute;
  height: 100%;
  right: 30px;
  top: 35%;
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

.bread_crumb {
  position: absolute;
  top: 40%;
  left: 20px;
}


/* 不被选中时的颜色 */
.el-breadcrumb ::v-deep .el-breadcrumb__inner {
  color: #d9bb95 !important;
  font-weight: 400 !important;
  font-size: x-large;
}

/* 被选中时的颜色 */
.el-breadcrumb__item:last-child ::v-deep .el-breadcrumb__inner {
  color: #fc9105 !important;
  font-weight: 800 !important;
  font-size: x-large;
}


</style>