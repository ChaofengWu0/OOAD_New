<template>
  <div class="main_container">

    <div class="image_container">
      <el-image :src="course_cover" class="course_img">
      </el-image>

      <div class="text_info">
        <h2>课程标题：{{ title }}</h2>
        <h2>课程价格：{{ price }} (优惠中！！)</h2>
        <h2> 老师ID：{{ teacher_name }}</h2>

        <el-button style="margin-left: 60px; padding: 20px" class="watch_video" type="primary" @click="watch_video"
                   v-if="is_subscribed || this.role !==3 ">
          立 即 观 看 第 一 集
        </el-button>
        <el-button style="margin-left: 60px; padding: 20px" class="subscribe_course" type="warning" @click="subscribe"
                   v-if="!is_subscribed && this.role === 3">订 阅
        </el-button>
      </div>
    </div>

    <div class="class_detail">
      <!--      <div class="class_detail_left_ele">-->
      <h1 style="margin:20px;">
        课程介绍
      </h1>
      <div type="text" class="detail_text">
        {{ course_detail }}
      </div>
      <!--      </div>-->
      <!--      <div class="class_detail_right_ele">-->
      <!--        <h2>广 告</h2>-->
      <!--      </div>-->
    </div>


    <div class="discussion">

    </div>

    <el-dialog title="付费观看我们的课程吧" :visible.sync="paidForm" width="400px">
      <div style="">课 程 费 用 {{ price }}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="paidForm = false">我 再 想 想</el-button>
        <el-button type="primary" @click="submit">确 定 支 付</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>

import requestUtil from "@/utils/request";
import qs from "qs";

export default {
  data() {
    return {
      role: null,
      title: "title",
      price: 0,
      teacher_name: "teacher_name",
      is_free: false,
      is_subscribed: false,
      course_id: null,
      course_cover: null,
      course_text_info: null,
      course_detail: "课程详情",
      paidForm: false,

      subscribe_form: {
        courseId: null,
        studentId: JSON.parse(sessionStorage.getItem("userInfo")).data.id
      },


      subscribe_stu: {
        userId: JSON.parse(sessionStorage.getItem("userInfo")).data.id,
        money: 0
      }

    }
  },
  created() {
    this.getCourseID()
    this.getCover()
    this.role = JSON.parse(sessionStorage.getItem("userInfo")).data.role
  },

  methods: {
    watch_video() {
      // this.$router.push('/player/'+this.)
      console.log("watch_video")
    },

    async subscribe() {
      //  免费就直接订阅，调后端方法
      console.log(this.price)
      if (this.price === "0") {
        //  todo 调后端方法通知后端
        const {data: res} = await requestUtil.post('/eduservice/t-course-student', this.subscribe_form)
        if (res.code === 20000) {
          this.$message.success("订阅成功")
        }
      }
      //  付费就弹框
      else if (this.price !== "0") {
        this.paidForm = true
      }
    },

    async getCover() {
      // const {data: res} = await requestUtil.get('/eduservice/edu-course/getCourseDetailById/' + this.course_id)
      const {data: res} = await requestUtil.get('/eduservice/edu-course/getCourseInfo/' + this.course_id)
      console.log(res);
      this.title = res.data.courseInfoVo.title
      this.teacher_name = res.data.courseInfoVo.teacherId
      this.price = res.data.courseInfoVo.price
      this.course_text_info = res.data.courseInfoVo.description
      this.course_detail = res.data.courseInfoVo.description
      this.course_cover = res.data.courseInfoVo.cover
      if (res.code !== 20000)
        return this.$message.error("Wrong! Renderer failed")
    },

    getCourseID() {
      if (this.$route.params && this.$route.params.id) {
        this.course_id = this.$route.params.id
        this.subscribe_form.courseId = this.course_id
      } else {
        this.$message("Wrong in function getCourseID which is in classChapter.Vue ")
      }
    },

    async submit() {
      this.paidForm = false
      console.log("submit")
      console.log(JSON.parse(sessionStorage.getItem("userInfo")).data.money)
      console.log(JSON.parse(sessionStorage.getItem("userInfo")))
      //   todo  调用后端方法去告诉后端数据变化
      console.log(JSON.parse(sessionStorage.getItem("userInfo")).data.money - this.price)
      if (Number(JSON.parse(sessionStorage.getItem("userInfo")).data.money) >= Number(this.price)) {
        let new_money = -this.price;
        this.subscribe_stu.money = new_money
        this.subscribe_stu.userId = JSON.parse(sessionStorage.getItem("userInfo")).data.id
        //   todo 第一个要给你(money-price)和studentID
        const {data: res} = await requestUtil.put('/eduservice/t-user/updateMoneyById?' + qs.stringify(this.subscribe_stu))
        let res1 = JSON.parse(sessionStorage.getItem("userInfo"))
        res1.data.money = res1.data.money - this.price;
        this.$store.commit('setUserInfo', res1)
        if (res.code === 20000) {
          this.$message("付费成功")
          // todo 如果后端给我显示20000，我就继续调用加入课程的api，studentID，courseID
          const {data: res} = await requestUtil.post('/eduservice/t-course-student', this.subscribe_form)
          if (res.code === 20000) {
            this.$message.success("订阅成功")
          }
        } else {
          this.$message.error("付费失败")
        }
      } else {
        this.$message.warning("余额不足")
      }
    }

  },


}
</script>


<style>
.class_detail .detail_text {
  font-size: 20px;
  float: left;
  position: absolute;
  width: 96%;
  margin-left: 3%;
}

/*.class_detail .class_detail_right_ele {*/
/*  padding: 0;*/
/*  margin: 0;*/
/*  border: 0;*/
/*  float: right;*/
/*  position: absolute;*/
/*  top: 60%;*/
/*  right: 30%;*/
/*  background-image: url("../../assets/img/banner.png");*/
/*}*/


.main_container {
  position: relative;
  height: 100%;
  width: 100%;
}


.image_container {
  position: relative;
  height: 460px;
  background-color: bisque;
}

.image_container .course_img {
  float: left;
  height: 100%;
  width: 60%;
  left: 2%;
}

.image_container .text_info {
  float: right;
  position: absolute;
  top: 50px;
  height: 100%;
  width: 40%;
  left: 60%;
}


h2 {
  margin: 20px;
  margin-left: 40px;
  padding: 20px;
}

</style>




