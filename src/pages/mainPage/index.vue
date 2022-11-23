<template>
  <div class="main_page_container">

    <el-container>
      <el-header height="144px" class="head_container">
        <div class="banner">
          <div class="left_ele">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
              <!--                     @select="handleSelect">-->
              <el-menu-item index="1">Main Page</el-menu-item>
              <!--              <el-menu-item index="2">Calculus</el-menu-item>-->
              <!--              <el-menu-item index="3">Linear Algebra</el-menu-item>-->
              <!--              <el-menu-item index="4">Physics</el-menu-item>-->
            </el-menu>
            <div class="line"></div>
          </div>

          <!--头像-->
          <div class="right_ele">
            <template>
              <div class="avatar">
                <div class="block">
                  <el-avatar :size="50" :src="this.$store.state.avatar_path"></el-avatar>
                </div>
              </div>
            </template>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <!--
                这里点击之后，要退出登录，要清空id和啥啥啥之类的
                -->
                <el-dropdown-item command="logout">Exit</el-dropdown-item>
                <el-dropdown-item command="enter_center">Personal_center</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </div>

        </div>
      </el-header>

      <el-main class="main_container">
        <!--    就只设置付费和免费模块    -->


        <div class="free_videos_container">

        </div>

        <div class="paid-videos_container">

        </div>

      </el-main>
    </el-container>


  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "index",
  data() {
    return {
      activeIndex: "1"
    }
  },
  methods: {
    handleCommand(command) {
      // 要具体处理对应的事件
      console.log('click on item ' + command);
      if (command === "logout") {
        // 做一些处理，然后回到login界面
        this.$router.push("/login")
      } else if (command === "enter_center") {
        console.log(this.$store.state.role)
        switch (this.$store.state.role) {
          case 1:
            this.$router.push("/admin_center/personal_center")
            break
          case 2:
            this.$router.push("/teacher_center/personal_center")
            break
          case 3:
            this.$router.push("/stu_center/personal_center")
            break
        }
      }
    }
  }

}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  border: 0;
}

.banner {
  background-color: white;
  width: 100%;
  height: 65px;
  opacity: 50%;
  position: relative;
}


.main_page_container {
  background-color: white;
  position: relative;
  height: 100%;
  width: 100%;
}


.head_container {
  height: 100%;
  width: 100%;
  background-image: url("../../assets/img/banner.png");
  position: relative;
}


.left_ele {
  left: 10px;
  height: 100%;
  position: absolute;
}

.avatar {
  position: absolute;
  top: 5px;
  right: 30px;
}

.right_ele {
  position: absolute;
  width: 100px;
  height: 100%;
  right: 10px;
}

.el-dropdown {
  position: absolute;
  bottom: 10px;
  right: 0;
}

.el-dropdown-menu {
  opacity: 65%;
}


.main_container {
  height: 100%;
  width: 100%;
  background-color: gray;
  position: relative;
}


</style>