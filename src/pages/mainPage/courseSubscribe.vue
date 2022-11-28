<template>
  <div class="main_container">
    <div class="image_container">
      <el-image :src="course_cover" class="course_img">
      </el-image>

      <div class="text_info">
        <h2>{{ title }}</h2>
        <h2>{{ price }} </h2>
        <h2> {{ teacher_name }}</h2>

        <el-button style="margin-left: 60px; padding: 20px" class="watch_video" type="primary" @click="watch_video"
                   v-if="is_subscribed">
          立 即 观 看 第 一 集
        </el-button>
        <el-button style="margin-left: 60px; padding: 20px" class="subscribe_course" type="warning" @click="subscribe"
                   v-if="!is_subscribed">订 阅
        </el-button>
      </div>
    </div>

    <div class="class_detail">
      <h2 style="margin: 0 0 0 20px;">
        课程介绍
      </h2>

      <div type="text" style="width: 97%  ;margin-left: 3%">
        {{ course_detail }}
      </div>


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

export default {
  data() {
    return {
      title: "title",
      price: "price",
      teacher_name: "teacher_name",
      is_free: false,
      is_subscribed: true,
      course_id: null,
      course_cover: null,
      course_text_info: null,
      course_detail: "课程详情",
      paidForm: false,
    }
  },
  created() {
    this.getCourseID()
    this.getCover()
  },
  methods: {
    watch_video() {
      console.log("watch_video")
    },

    subscribe() {

      //  免费就直接订阅，调后端方法
      if (this.is_free) {
        //  todo 调后端方法通知后端
      }
      //  付费就弹框
      else if (!this.is_free) {
        this.paidForm = true
      }

    },

    async getCover() {
      const {data: res} = await requestUtil.get('/eduservice/edu-course/getCourseDetailById/' + this.course_id)
      console.log(res);
      this.course_text_info = res.data.description
      this.course_cover = res.data.cover
      if (res.code !== 20000)
        return this.$message.error("Wrong! Renderer failed")
    },

    getCourseID() {
      if (this.$route.params && this.$route.params.id) {
        this.course_id = this.$route.params.id
        console.log(this.course_id)
      } else {
        this.$message("Wrong in function getCourseID which is in classChapter.Vue ")
      }
    },

    submit() {
      this.paidForm = false
      //  todo  调用后端方法去告诉后端数据变化
    }

  },


}
</script>


<style>
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




