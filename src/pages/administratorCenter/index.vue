<template>
  <div class="administrator_center_container">

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
                <i class="el-icon-document"></i>
                <span slot="title">申请中心</span>
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
      if (item === 1) {
        // 路由设置
        this.$router.push("/admin_center/personal_center")
        // 子组件头的面包屑要修改
        // this.path_header_for_personal_center = "/teacherCenter/personal_center"
      } else if (item === 2) {
        this.$router.push("/admin_center/application_center")
        // this.path_header_for_personal_center = "/teacherCenter/application_center"
      }
    },
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
  border: 0;
}

.administrator_center_container {
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