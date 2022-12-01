<template>
  <div class="main_page_container">
    <el-container>
      <el-header height="144px" class="head_container">
        <div class="banner">
          <div class="left_ele">
            <!--            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">-->
            <!--                     @select="handleSelect">-->
            <h2>欢迎来到在线视频学习网站</h2>
            <!--            </el-menu>-->
            <div class="line"></div>
          </div>

          <!--头像-->
          <div class="right_ele">
            <template>
              <div class="avatar">
                <div class="block">
                  <el-avatar :size="50" :src=this.avatar></el-avatar>
                </div>
              </div>
            </template>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" style="width: 100px;">
                <!--
                这里点击之后，要退出登录，要清空id和啥啥啥之类的
                -->
                <el-dropdown-item command="enter_center">
                  <div style="text-align: center;">个人中心</div>
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                  <div style="text-align: center;">退出</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </div>
        </div>
      </el-header>
      <el-main class="main_container">
        <div class="free-videos_container">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <a :href="'http://localhost:8080/#/course/' + course_list[0].id">
                  <el-image
                      style="width: 241px; height: 150px; border-radius: 10px "
                      :src="course_list[0].cover"
                      fit="cover"></el-image>
                </a>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <a :href="'http://localhost:8080/#/course/' + course_list[1].id">
                  <el-image
                      style="width: 241px; height: 150px; border-radius: 10px "
                      :src="course_list[1].cover"
                      fit="cover"></el-image>
                </a>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <a :href="'http://localhost:8080/#/course/' + course_list[2].id">
                  <el-image
                      style="width: 241px; height: 150px; border-radius: 10px "
                      :src="course_list[2].cover"
                      fit="cover"></el-image>
                </a>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <a :href="'http://localhost:8080/#/course/' + course_list[3].id">
                  <el-image
                      style="width: 241px; height: 150px; border-radius: 10px "
                      :src="course_list[3].cover"
                      fit="cover"></el-image>
                </a>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 100px">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <a :href="'http://localhost:8080/#/course/' + course_list[4].id">
                  <el-image
                      style="width: 241px; height: 150px; border-radius: 10px "
                      :src="course_list[4].cover"
                      fit="cover"></el-image>
                </a>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <a :href="'http://localhost:8080/#/course/' + course_list[5].id">
                  <el-image
                      style="width: 241px; height: 150px; border-radius: 10px "
                      :src="course_list[5].cover"
                      fit="cover"></el-image>
                </a>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <a :href="'http://localhost:8080/#/course/' + course_list[6].id">
                  <el-image
                      style="width: 241px; height: 150px; border-radius: 10px "
                      :src="course_list[6].cover"
                      fit="cover"></el-image>
                </a>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <a :href="'http://localhost:8080/#/course/' + course_list[7].id">
                  <el-image
                      style="width: 241px; height: 150px; border-radius: 10px "
                      :src="course_list[7].cover"
                      fit="cover"></el-image>
                </a>
              </div>
            </el-col>
          </el-row>
        </div>

        <el-button type="primary" @click="view_all" class="view_all_courses"
                   style="position: absolute;left: 44%; top :30px; padding: 20px">
          <h1> 查 看 所 有 课 程</h1>
        </el-button>


      </el-main>
      <el-footer style="height: 100px">
        <div class="foot_left_ele">
          <div class="foot_company">
            <h3>单位:南方科技大学</h3>
          </div>
          <div class="foot_address">
            <h5>地址:广东省深圳市南山区桃园街道南方科技大学</h5>
          </div>
        </div>
        <div class="foot_right_ele">
          <div class="contact_us">
            <h3>联系我们: asdlljasd@mail.sustech.edu.cn </h3>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import requestUtil from "@/utils/request";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "index",
  data() {
    return {
      course_list: [],
      activeIndex: "1",
      avatar: JSON.parse(sessionStorage.getItem("userInfo")).data.avatar
    }
  },
  created() {
    this.getCourses()
    this.avatar = JSON.parse(sessionStorage.getItem("userInfo")).data.avatar
    window.addEventListener('setItem', () => {
      console.log("aaaaaaaaaaaaaa")
      this.avatar = JSON.parse(sessionStorage.getItem("userInfo")).data.avatar
    })
  },
  mounted() {
    let beginTime = 0; //开始时间
    let differTime = 0; //时间差
    window.onunload = async function () {
      differTime = new Date().getTime() - beginTime;
      if (differTime <= 20) {
        await requestUtil.post("/eduservice/t-user/logout?username=" + JSON.parse(sessionStorage.getItem("userInfo")).data.username)
        window.sessionStorage.clear()
      } else {
        console.log("这是刷新");
      }
    };
    window.onbeforeunload = function () {
      beginTime = new Date().getTime();
    }
  },
  methods: {
    async getCourses() {
      const {data: res} = await requestUtil.get('/eduservice/edu-course')
      console.log(res);
      this.course_list = res.data.list
      console.log(this.course_list)
      if (res.code !== 20000)
        return this.$message.error("Wrong! Renderer failed")
    },
    handleCommand(command) {
      console.log('click on item ' + command);
      if (command === "logout") {
        this.$store.dispatch("logout")
      } else if (command === "enter_center") {
        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        console.log(userInfo)
        switch (userInfo.data.role) {
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
    },
    view_all() {
      this.$router.push('/all_course')
    }
  }
}
</script>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
  border: 0;
}

.el-main {
  height: 700px;
  background-image: url('../../assets/img/main_page.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.banner {
  background-color: white;
  width: 100%;
  height: 65px;
  opacity: 50%;
  position: relative;
}

.main_page_container {
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
  left: 40%;
  top: 20%;
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

.free-videos_container {
  margin-top: 100px;
  background-color: white;
  opacity: 85%;
  left: 15%;
  position: absolute;
  height: 500px;
  width: 70%;
}

.paid-videos_container {
  margin-top: 100px;
  background-color: white;
  opacity: 80%;
  top: 500px;
  left: 15%;
  position: absolute;
  height: 400px;
  width: 70%;
}

.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-row {
  padding: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.grid-content {
  border-radius: 4px;
  min-height: 150px;
}

.el-footer {
  background-color: #B3C0D1;
  background-image: url("../../assets/img/main_page_footer2.jpg");
  background-repeat: no-repeat;
  color: #333;
  text-align: center;
  width: 100%;
  position: relative;
}

body > .el-container {
  margin-bottom: 40px;
}

.foot_left_ele {
  position: absolute;
  width: 30%;
  height: 100%;
}

.foot_company {
  margin: 0;
  position: absolute;
  left: 20px;
  color: white;
}

.foot_address {
  margin: 0;
  position: absolute;
  color: white;
  left: 20px;
  bottom: 0;
}

.foot_right_ele {
  position: absolute;
  width: 30%;
  height: 100%;
  right: 50px;
  color: white;
  top: 20px;
}

.view_all_courses {
  color: black;
}

</style>


