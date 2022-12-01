<template>
  <div class="main_container">

    <div class="image_container">
      <img :src="course_cover" style="margin-left: 20px" class="course_img">
      <!--      </img>-->

      <div class="text_info">
        <h2>课程标题：{{ title }}</h2>
        <h2>课程价格：{{ price }} (优惠中！！)</h2>
        <h2> 老师ID：{{ teacher_name }}</h2>

        <el-button style="margin-left: 60px; padding: 20px" class="watch_video" type="primary" @click="watch_video"
                   v-if="is_subscribed || this.role === 1 || this.role === 2">
          立 即 观 看 第 一 集
        </el-button>
        <el-button style="margin-left: 60px; padding: 20px" class="subscribe_course" type="warning" @click="subscribe"
                   v-if="!is_subscribed && this.role === 3">订 阅
        </el-button>
      </div>
    </div>

    <el-button style="margin-left: 20px; margin-top: 20px" type="warning" @click="main_page">返 回 主 页
    </el-button>

    <div class="class_detail"
         style="border: solid; border-color: #6ccd9b; margin: 20px; background-color: #6ccd9b; border-radius: 10px">
      <!--      <div class="class_detail_left_ele">-->
      <h1 style="margin:5px; color: black">
        课 程 介 绍
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
      <div class="give_comment">
        <h2 style="margin: 0">来 发 表 评 论 吧</h2>
        <el-input v-model="now_discussion" style="width: 60%;margin-left: 20px"></el-input>
        <el-button @click="submit_discussion" type="primary" style="margin-left: 20px">确定发送</el-button>
      </div>

      <ul v-for="(item,index) in discussion" :key="index">
        <div style="padding: 20px; border: solid; border-radius: 5px; width: 80%  ">
          <el-avatar :size="'small'" :src="item.avatar" alt="头像" class="usr_avatar">
          </el-avatar>
          <div class="usr_name" style="margin-left: 10px"> {{ item.nickname }}</div>

          <li class="comment_content" type="none"
              style="height: 50px;padding-top: 5px; padding-bottom: 40px; margin-top: 20px">
            {{ item.comment }}
          </li>

          <div style="margin: 0;border:0; right: 20%;position: absolute; ">
            {{ item.gmtCreate }}
          </div>

        </div>
      </ul>


    </div>

    <el-dialog title="付费观看我们的课程吧" :visible.sync="paidForm" width="400px">
      <div style="">课 程 费 用 {{ price }}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="paidForm = false">我 再 想 想</el-button>
        <el-button type="primary" @click="submit">确 定 支 付</el-button>
      </div>
    </el-dialog>


    <!--    &lt;!&ndash;小于七页的分页&ndash;&gt;-->
    <!--    <div class="block" style="padding-bottom: 50px; background: #42b983 " align="center" :hide-on-single-page="true">-->
    <!--      <span class="demonstration"></span>-->
    <!--      <el-pagination-->
    <!--          layout="prev, pager, next"-->
    <!--          :total="1"-->
    <!--          v-if="this.discussion.length<7">-->
    <!--      </el-pagination>-->
    <!--    </div>-->
    <!--    &lt;!&ndash;大于七页的分页&ndash;&gt;-->
    <!--    <div class="block" style="padding-bottom: 50px;background: #42b983 "  align="center" :hide-on-single-page="true">-->
    <!--      <span class="demonstration"></span>-->
    <!--      <el-pagination-->
    <!--          layout="prev, pager, next"-->
    <!--          :total="1000"-->
    <!--          v-if="this.discussion.length>=7">-->
    <!--      </el-pagination>-->
    <!--    </div>-->


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

      video_id: null,
      chapter_id: null,
      course_id: null,
      course_cover: null,
      course_text_info: null,
      course_detail: "课程详情",
      paidForm: false,

      course_student: {
        courseId: this.course_id,
        studentId: JSON.parse(sessionStorage.getItem("userInfo")).data.id
      },

      subscribe_form: {
        courseId: null,
        studentId: JSON.parse(sessionStorage.getItem("userInfo")).data.id
      },

      subscribe_stu: {
        userId: JSON.parse(sessionStorage.getItem("userInfo")).data.id,
        money: 0
      },


      now_discussion: null,
      now_discussion_form: {
        avatar: null,
        comment: null,
        courseId: null,
        nickname: null,
        userId: null,
      },
      discussion: [
        // {
        //   name: 'test1',
        //   comment: 'test1_comment',
        //   avatar: 'src/assets/img/banner.jpg',
        //   date: 'test1-date',
        // },
        // {
        //   name: 'test2',
        //   comment: 'test2_comment',
        //   avatar: 'src/assets/img/logo.jpg',
        //   date: 'test2-date'
        // }
      ]

    }
  },

  created() {
    this.getCourseID()
    this.getCover()
    this.getVideoID()
    this.check()
    this.getComment();
    this.role = JSON.parse(sessionStorage.getItem("role"))
  },
  methods: {
    async getComment() {
      const {data: res} = await requestUtil.get('/eduservice/t-comment/' + this.course_id)
      console.log(res)
      this.discussion = res.data.list;
      console.log(this.discussion)
    },

    async submit_discussion() {
      console.log('info')
      let info = JSON.parse(sessionStorage.getItem("userInfo"))
      console.log(info)
      this.now_discussion_form.avatar = info.data.avatar
      this.now_discussion_form.userId = info.data.id
      this.now_discussion_form.nickname = info.data.nickName
      this.now_discussion_form.courseId = this.course_id
      this.now_discussion_form.comment = this.now_discussion
      console.log("now_discussion_form")
      console.log(this.now_discussion_form)
      const {data: res} = await requestUtil.post('/eduservice/t-comment/addComment', this.now_discussion_form)
      console.log(res)
      if (res.code === 20000) {
        this.$message.success("评论成功")
      }
      this.now_discussion = ''
      this.getComment()
    },

    async check() {
      console.log(this.course_student)
      this.course_student.courseId = this.course_id
      const {data: res} = await requestUtil.get('/eduservice/t-course-student?' + qs.stringify(this.course_student))

      // console.log(res.data.ifExists)
      // console.log(this.role)

      if (res.data.ifExists !== 'no') {
        console.log('check')
        this.is_subscribed = true
      } else {
        this.is_subscribed = false
      }
    },

    async getVideoID() {
      console.log(this.course_id)
      const {data: res} = await requestUtil.get('/eduservice/t-chapter/getVideoIdByCourseId?courseId=' + this.course_id)
      this.video_id = res.data.video_id
      this.chapter_id = res.data.chapter_id
    },

    watch_video() {
      this.$router.push('/player/' + this.video_id + '/' + this.chapter_id)
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
      this.title = res.data.courseInfoVo.title
      this.teacher_name = res.data.courseInfoVo.teacherId
      this.price = res.data.courseInfoVo.price
      this.course_text_info = res.data.courseInfoVo.description
      this.course_detail = res.data.courseInfoVo.description
      this.course_cover = res.data.courseInfoVo.cover
      console.log(this.course_cover)
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
            this.check()
          }
        } else {
          this.$message.error("付费失败")
        }
      } else {
        this.$message.warning("余额不足")
      }
    },
    main_page() {
      this.$router.push('/main_page')
    }

  },


}
</script>


<style>
.class_detail .detail_text {
  font-size: 20px;
  width: 90%;
  /*margin-left: 3%;*/
  margin: 2%;
  background-color: #6ccd9b;
  color: white;
  /*border: solid;*/
  /*border-color: #3967FF;*/
}

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


.discussion {
  position: relative;
  border: solid;
  border-color: dodgerblue;
  border-radius: 10px;
  margin: 40px;
  /*background-color: #795da3;*/
  /*height: ;*/
  width: 90%;

}


.discussion .usr_avatar {
  position: absolute;
  float: left;
}

.discussion .usr_name {
  float: right;
  position: absolute;
  left: 90px;
}

.discussion .comment_content {
  /*margin: ;*/
  position: relative;
  top: 30px;
}


/*.discussion*/

</style>




