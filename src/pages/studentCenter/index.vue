<template>
  <div class="student_center_container">
    <el-container>
      <!--
      侧边的布置完成了
      -->
      <el-aside width="200px">
        <el-row class="tac">
          <el-col>
            <h5 class="nav_title">导航</h5>
            <!--
            下面开始是整个导航栏
            -->
            <el-menu default-active="1" class="el-menu-vertical-demo">
              <el-menu-item index="1" @click="clickMenu(1)">
                <i class="el-icon-user"></i>
                <span slot="title">个人中心</span>

              </el-menu-item>
              <el-menu-item index="2" @click="clickMenu(2)">
                <i class="el-icon-money"></i>
                <span slot="title">我的订单</span>
              </el-menu-item>

              <el-menu-item index="3" @click="clickMenu(3)">
                <i class="el-icon-reading"></i>
                <span slot="title">我的课程</span>
              </el-menu-item>

              <el-menu-item index="4" @click="clickMenu(4)">
                <i class="el-icon-message-solid"></i>
                <span slot="title">消息中心</span>
              </el-menu-item>

            </el-menu>
          </el-col>

        </el-row>
      </el-aside>

      <el-container>
        <el-header height="80px">
          <header_for_personal_center>
          </header_for_personal_center>
        </el-header>

        <el-main>
          <router-view>
          </router-view>
        </el-main>

      </el-container>
    </el-container>

  </div>
</template>

<script>
import header_for_personal_center from "@/components/HeaderForPersonalCenter";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "index",
  components: {header_for_personal_center},
  methods: {
    clickMenu(item) {
      switch (item) {
        case 1:
          this.$router.push("/stu_center/personal_center")
          break
        case 2:
          this.$router.push("/stu_center/my_orders")
          break
        case 3:
          this.$router.push("/stu_center/my_classes/classes")
          break
        case 4:
          this.$router.push("/stu_center/notification")
          break
      }
    },
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  border: 0;
}

.student_center_container {
  position: relative;
  height: 100%;
  width: 100%;
}


.el-container {
  height: 100%;
  width: 100%;
}

.el-menu-vertical-demo {
  background: bisque;
}

.tac {
  height: 100%;
  width: 100%;
}

.nav_title {
  position: center;
}

.navigation {
  /*position: relative;*/
  height: 100%;
  width: 100%;
}

.el-main {
  background-color: white;
  /*color: #333;*/
  /*text-align: center;*/
  /*line-height: 160px;*/
}

/*.el-container:nth-child(5) .el-aside,*/
/*.el-container:nth-child(6) .el-aside {*/
/*  line-height: 260px;*/
/*}*/

/*.el-container:nth-child(7) .el-aside {*/
/*  line-height: 320px;*/
/*}*/

.el-header {
  background-color: white;
  /*  color: #333;*/
  /*  text-align: center;*/
  /*  line-height: 60px;*/
}

.el-aside {
  background-color: bisque;
  /*#D3DCE6;*/
  color: dodgerblue;
  /*#333;*/
  text-align: center;
  line-height: 100px;
}

</style>