<template>
  <div class="teacher_center_container">

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

              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-reading"></i>
                  <span slot="title">课程</span>
                </template>

                <el-menu-item-group class="class_sub_menu">
                  <el-menu-item index="1-1" @click="clickMenu(21)">我的课程</el-menu-item>
                  <el-menu-item index="1-2" @click="clickMenu(22)">添加课程</el-menu-item>
                </el-menu-item-group>

              </el-submenu>

<!--              <el-menu-item index="3" @click="clickMenu(3)">-->
<!--                <i class="el-icon-user"></i>-->
<!--                <span slot="title">通知中心</span>-->
<!--              </el-menu-item>-->


<!--              <el-menu-item index="3" @click="clickMenu(3)">-->
<!--                <i class="el-icon-document"></i>-->
<!--                <span slot="title">Application Center</span>-->
<!--              </el-menu-item>-->

<!--              <el-menu-item index="4" @click="clickMenu(4)">-->
<!--                <i class="el-icon-message-solid"></i>-->
<!--                <span slot="title">Notifications</span>-->
<!--              </el-menu-item>-->

<!--              <el-menu-item index="3" @click="clickMenu(3)">-->
<!--                <i class="el-icon-s-help"></i>-->
<!--                <span slot="title">Student list</span>-->
<!--              </el-menu-item>-->
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
  data() {
    return {
      path_header_for_personal_center: '/teacherCenter'
    }
  },
  methods: {
    clickMenu(item) {
      if (item === 1) {
        // 路由设置
        this.$router.push("/teacher_center/personal_center")
        // 子组件头的面包屑要修改
      } else if (item === 21) {
        this.$router.push("/teacher_center/my_classes/class_list")
      } else if (item === 22) {
        this.$router.push("/teacher_center/my_classes/add_class")
      }
      // else if (item === 3){
      //   this.$router.push("/teacher_center/notification")
      // }
    },
  },
  components: {header_for_personal_center},
  // 挂载上来之后，
  mounted() {

  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.main_container{
  position: relative;
  height: 100%;
  width: 100%;
}

.teacher_center_container {
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
  height: 100%;
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

.class_sub_menu {
  position: relative;
  margin: 0;
  padding: 0;
  border: 0;
  background-color: bisque;

}

</style>




