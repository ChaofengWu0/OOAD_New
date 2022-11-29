<template>
  <div class="video_page_container">
    <el-container class="page_container">
      <el-header height="90px">
        <HeaderForPlayer></HeaderForPlayer>
      </el-header>

      <el-main style="padding: 0;margin: 0;border: 0">
        <div>
          <vue-aliplayer-v2
              class="multiple-player"
              ref="VueAliplayerV2"
              :encryptType="1"
              :source="source"
              :options="options"
              controlBarVisibility="always"
              @ended="end"
          />
        </div>
        <div class="under_player">

          <div class="player-btns">
            <span @click="chapters">返回章节显示页面</span>
            <span @click="main_page">返回主站页面</span>
            <span @click="play">播放</span>
            <span @click="pause">暂停</span>
            <!--          <span @click="getStatus_test()">获取播放器状态</span>-->
          </div>

          <el-button @click="view_hw" class="homework">
            在 线 查 看 作 业
          </el-button>


          <div class="upload_homework">
            <el-upload
                class="upload-demo"
                ref="upload"
                action="http://localhost:9001/eduoss/fileoss"
                :on-success="handleVodUploadSuccess"
                :auto-upload="true"
                :limit="1"
            >
              <el-button type="text" class="letter">点击此处选择上传作业文件</el-button>
            </el-upload>
            <el-button type="primary" align="center" style="position: relative; margin: 20px" @click="stu_upload_hw">确
              定 提 交
            </el-button>
          </div>

          <el-button class="homework" @click="do_problem" style="margin-top: 90px">
            做此视频的习题
          </el-button>
        </div>

        <el-dialog title="来答题测试一下吧" :visible.sync="dialogFormVisible">
          <h3>
            您已用时 {{ this.one }}:{{ this.two }}:{{ this.three }}
          </h3>
          <!-- 考试 -->
          <div class="examination">
            <ul v-for="(item,i) in examinationData" :key="i">
              <div>{{ i + 1 }}、{{ item.question }}</div>
              <li style="list-style:none" v-for="(son,index) in item.answer" :key="index" class="question">
                <el-radio
                    v-model="radio[i]"
                    :label="son.value"
                    v-if="son.value!==null"
                    @change="getInputValue(i)"
                ></el-radio>
              </li>

            </ul>
          </div>
          <!-- 考试 -->
          <el-button @click="submit_ans">提交答案</el-button>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="windowVisible"
            width="30%">
          <span>点击确定以继续视频</span>
          <span slot="footer" class="dialog-footer">
             <el-button type="primary"
                        @click="continue_video">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>


    </el-container>
  </div>
</template>
<script>
import HeaderForPlayer from "@/components/HeaderForPlayer";
import requestUtil from "@/utils/request";
import qs from "qs";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'index',
  components: {
    HeaderForPlayer
  },
  data() {
    return {
      course_id: null,
      flag_for_page: null,
      role: null,
      // 学生要拿到的作业
      chapter_hw_url: null,
      // 学生要上传的作业
      stu_hw_form: {
        hwUrl: null,
        studentId: null,
        chapterId: null,
      },

      // 看的时间的记录
      record_time_form: {
        chapterId: null,
        studentId: null,
        time: null
      },

      source: null,
      chapter_id: null,

      one_forth_time: null,
      video_time: null,
      check_time: null,
      dialogFormVisible: false,
      current_time: null,
      windowVisible: false,
      check_time_flag: null,
      options: {
        // source:'//player.alicdn.com/video/aliyunmedia.mp4',
        autoplay: false,
        "skinLayout": [
          {
            "name": "H5Loading",
            "align": "cc"
          },
          {
            "name": "errorDisplay",
            "align": "tlabs",
            "x": 0,
            "y": 0
          },
          {
            "name": "infoDisplay"
          },
          {
            "name": "tooltip",
            "align": "blabs",
            "x": 0,
            "y": 56
          },
          {
            "name": "thumbnail"
          },
          {
            "name": "controlBar",
            "align": "blabs",
            "x": 0,
            "y": 0,
            "children": [
              {
                "name": "progress",
                "align": "blabs",
                "x": 0,
                "y": 44
              },
              {
                "name": "timeDisplay",
                "align": "tl",
                "x": 10,
                "y": 7
              },
              {
                "name": "fullScreenButton",
                "align": "tr",
                "x": 10,
                "y": 12
              },
              {
                "name": "volume",
                "align": "tr",
                "x": 5,
                "y": 10
              }
            ]
          }
        ]
      },


      flag: null,
      total_time: 10,
      one: '00', // 时
      two: '00', // 分
      three: '00', // 秒
      abc: 0, // 秒的计数
      cde: 0, // 分的计数
      efg: 0, // 时的计数

      examinationData: [],

      allRadio: [],//提交给后台的真题数据

      radio: []//单选真题答案
    }
  },

  created() {
    this.getVideoID()
    this.getChapterUrl()
    this.role = JSON.parse(sessionStorage.getItem("userInfo")).data.role
    sessionStorage.removeItem('problems' + this.chapter_id)
  },

  // mounted() {
  // let tmp = this.chapter_hw_url_before_process.split("https://")
  // let paras = tmp[1].split('/')
  // console.log(paras)
  // this.chapter_hw_url_after_process_para1 = paras[0]
  // this.chapter_hw_url_after_process_para2 = paras[1]
  // },

  watch: {
    current_time: {
      handler(newV) {
        console.log(newV)
        if (newV > this.one_forth_time && newV < this.one_forth_time * 2) {
          this.record_watch_time(25)
          console.log('已经完成1/4')
        } else if (newV > 2 * this.one_forth_time && newV < 3 * this.one_forth_time) {
          this.record_watch_time(50)
        } else if (newV > this.check_time) {
          this.$refs.VueAliplayerV2.pause()
          this.endCheckHandler()
          this.windowVisible = true
        } else if (newV > 3 * this.one_forth_time && newV < 4 * this.one_forth_time) {
          this.record_watch_time(75)
        }
      }
    },
  },

  methods: {

    chapters() {
      if (this.role === 1) {
        this.$router.push('/admin_center/view_chapter/' + this.course_id)
      } else if (this.role === 2) {
        this.$router.push('/teacher_center/my_classes/view_chapter/' + this.course_id)
      } else if (this.role === 3) {
        this.$router.push('/stu_center/my_classes/class_detail/' + this.course_id)
      }
    },

    main_page() {
      this.$router.push('/main_page')
    },

    async getChapterUrl() {
      const {data: res} = await requestUtil.get('/eduservice/t-chapter/getChapterInfo/' + this.chapter_id)
      this.chapter_hw_url = res.data.chapter.homeworkUrl
      console.log(11111111111111111111111)
      console.log(res)
    },

    async record_watch_time(time) {
      this.record_time_form.time = time
      this.record_time_form.chapterId = this.chapter_id
      this.record_time_form.studentId = JSON.parse(sessionStorage.getItem("userInfo")).data.id
      const {data: res} = await requestUtil.put('/eduservice/t-chapter-student/time', this.record_time_form)
      console.log(res)

    },

    async stu_upload_hw() {
      this.stu_hw_form.chapterId = this.chapter_id
      this.stu_hw_form.studentId = this.$store.getters.getUserInfo.data.id
      const {data: res} = await requestUtil.put('/eduservice/t-chapter-student/hw_url', this.stu_hw_form)
      if (res.data.code === 20000) {
        this.$message.success("上传成功")
      }
    },

    continue_video() {
      this.windowVisible = false;
      this.$refs.VueAliplayerV2.play()
    },

    async submit_ans() {
      this.dialogFormVisible = false
      let userInfo = this.$store.getters.getUserInfo
      // 计算分数，返回给后端。
      let problemGrade = 0
      for (let i in this.allRadio) {
        let solution = this.examinationData[i].answer[this.examinationData[i].sol]
        // console.log(solution)
        // console.log(this.allRadio[i])
        if (this.allRadio[i] === solution.value) {
          problemGrade += 5
        }
      }
      const returnForm = {
        chapterId: this.chapter_ID,
        studentId: userInfo.data.id,
        proGrade: problemGrade
      }
      // console.log(returnForm)
      const {data: res} = await requestUtil.put('/eduservice/t-chapter-student/pro/', returnForm)
      console.log("test")
      console.log(res)
      this.endHandler()
    },

    async getProblemData() {
      const {data: res} = await requestUtil.get('/eduservice/t-problem/getProblemsByChapterId/' + this.chapter_ID)
      const problemList = res.data.problemList
      console.log(problemList)
      this.examinationData = []
      for (let i in problemList) {
        let problem = problemList[i]
        this.examinationData.push({
          idx: i,
          sol: problem.answer,
          question: problem.content,
          answer: [
            {value: problem.optionA},
            {value: problem.optionB},
            {value: problem.optionC},
            {value: problem.optionD}
          ]
        })
      }
      console.log(this.examinationData)
    },

    end() {
      // todo
      this.record_watch_time(100)
      this.check_time_flag = null
      this.current_time = null
    },

    async do_problem() {
      this.dialogFormVisible = true;
      await this.getProblemData()
      this.initial_time()
      this.startHandler()
    },

    view_hw() {
      console.log(this.chapter_hw_url)
      let url = this.chapter_hw_url.split("https://")
      console.log(url)
      window.open("http://localhost:8080/#/pdf/" + url[1], '_blank')
    },

    async getVideoID() {
      if (this.$route.params && this.$route.params.id && this.$route.params.chapter) {
        this.video_id = this.$route.params.id
        this.chapter_id = this.$route.params.chapter
        // this.video_id = "2cd729109884494ab431f44f6bcc4ea3"
        const {data: res1} = await requestUtil.get('/edu-vod/video/getAutoPlayUrl/' + this.video_id)
        this.source = res1.data.autoUrl

        const {data: res2} = await requestUtil.get('/eduservice/t-chapter/getCourseIdbyChapterId?' + qs.stringify(this.chapter_id))
        this.course_id = res2.data.courseId

      } else {
        this.$message("Wrong in function getVideoID which is in classChapter.Vue ")
      }
    },

    initial_time() {
      this.abc = 0
      this.cde = 0
      this.efg = 0
      this.one = "00"
      this.two = "00"
      this.three = "00"
    },

    play() {
      this.$refs.VueAliplayerV2.play();
      this.video_time = this.$refs.VueAliplayerV2.getDuration();
      if (this.check_time_flag == null && this.current_time == null) {
        this.setCheckHandler()
      }
      this.check_time = 2 * this.video_time / 3
      this.one_forth_time = (this.video_time / 4)
      console.log(this.video_time)
      console.log(this.check_time)
      console.log(this.one_forth_time)
    },

    pause() {
      this.$refs.VueAliplayerV2.pause();
    },

    handleVodUploadSuccess(res) {
      this.stu_hw_form.hwUrl = res.data.url
      // 设置了这个学生上交的作业的url
      console.log(res)
    },

    getInputValue(index) {
      this.allRadio[index] = this.radio[index]; // 将数据存入提交给后台的数据中
      // console.log(this.allRadio);
    },

    setCheckHandler() {
      this.check_time_flag = setInterval(() => {
        this.current_time = this.$refs.VueAliplayerV2.getCurrentTime()
      }, 1000)
    },

    endCheckHandler() {
      this.check_time_flag = clearInterval(this.check_time_flag)
    },

    startHandler() {
      this.flag = setInterval(() => {
        if (this.three === 60 || this.three === '60') {
          this.three = '00';
          this.abc = 0;
          if (this.two === 60 || this.two === '60') {
            this.two = '00';
            this.cde = 0;
            if (this.efg + 1 <= 9) {
              this.efg++;
              this.one = '0' + this.efg;
            } else {
              this.efg++;
              this.one = this.efg;
            }
          } else {
            if (this.cde + 1 <= 9) {
              this.cde++;
              this.two = '0' + this.cde;
            } else {
              this.cde++;
              this.two = this.cde;
            }
          }
        } else {
          if (this.abc + 1 <= 9) {
            this.abc++;
            this.three = '0' + this.abc;
          } else {
            this.abc++;
            this.three = this.abc;
          }
        }
      }, 1000)
    },

    // 暂停计时
    endHandler() {
      this.flag = clearInterval(this.flag)
    },

  },
}

</script>

<style scoped lang="less">
.el-header {
  position: relative;
  background-color: bisque;
  height: 100%;
}

.video_page_container {
  position: relative;
  width: 100%;
  height: 100%;
}

.video {
  position: relative;
  width: 100%;
  background-color: #42b983;
}

.page_container {
  position: relative;
  width: 100%;
  height: 100%;
}

.homework {
  background-image: url('../../assets/img/hw_banner.jpg');
  align-content: center;
  position: relative;
  left: 18%;
  width: 1000px;
  height: 50px;
}

.upload_homework {
  background-image: url("../../assets/img/hw_banner.jpg");
  left: 18%;
  margin-top: 20px;
  position: relative;
  width: 1000px;
  height: 50px;
}


.letter {
  color: black;
  top: 15px;
  left: 435px;
  position: relative;
  align-content: center;
}


.player-btns {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  span {
    display: inline-block;
    padding: 5px 10px;
    width: 150px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #eee;
    background: #e1e1e1;
    border-radius: 10px;
    text-align: center;
    margin: 5px;
    cursor: pointer;
  }
}


.under_player {
  background-image: url("../../assets/img/player.jpg");
  height: 360px;
}

ul {
  background: white;
  margin: 50px;

  li {
    font-size: 20px;
    padding-top: 35px;
    padding-left: 37px;

    /deep/ .el-radio__inner:hover {
      border-color: #DD4A68;
    }

    /deep/ .el-radio__label {
      color: black;
    }

    /deep/ .el-radio__inner {
      width: 20px;
      height: 20px;
    }

    /deep/ .el-radio__input {
      vertical-align: sub;
    }

    /deep/ .el-radio__inner::after {
      width: 7px;
      height: 7px;
    }

    /deep/ .el-radio__input.is-checked + .el-radio__label {
      color: black;
    }

  }
}


</style>



