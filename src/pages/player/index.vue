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
            <span @click="play">播放</span>
            <span @click="pause">暂停</span>
            <!--          <span @click="getStatus_test()">获取播放器状态</span>-->
          </div>

          <el-button class="homework" @click="view_homework">
            查看作业并下载作业
          </el-button>

          <div class="upload_homework">
            <el-upload
                class="upload-demo"
                ref="upload"
                action="' '"
                :on-success="handleVodUploadSuccess"
                :auto-upload="false"
                :limit="1"
            >
              <span class="letter">点击此处上传作业</span>
            </el-upload>
          </div>
          <el-button class="homework" @click="do_problem" style="margin-top: 20px">
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

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'index',
  components: {
    HeaderForPlayer
  },
  data() {
    return {
      source: "https://outin-71f4b58068c211ed9c8b00163e00b174.oss-cn-shanghai.aliyuncs.com/sv/588519ca-1849eed0a7b/588519ca-1849eed0a7b.mp4?Expires=1669363641&OSSAccessKeyId=LTAIwkKSLcUfI2u4&Signature=oioz9Fp%2FNnUZkBbGMCXxqioTVLo%3D",
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
    sessionStorage.removeItem('problems' + this.chapter_ID)
  },

  watch: {
    current_time: {
      handler(newV) {
        if (newV > this.check_time) {
          this.$refs.VueAliplayerV2.pause()
          this.endCheckHandler()
          this.windowVisible = true
        }
      }
    },
  },

  methods: {
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
      console.log(returnForm)
      const {data: res} = await requestUtil.put('/eduservice/t-chapter-student/pro/', returnForm)
      console.log(res)
      this.endHandler()
    },

    async getProblemData() {
      const problems = this.$store.getters.getInfo('problems' + this.chapter_ID)
      if (problems === null) {
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
        const info = {
          'infoName': 'problems' + this.chapter_ID,
          'infoBody': this.examinationData
        }
        this.$store.commit("setInfo", info)
      } else {
        this.examinationData = this.$store.getters.getInfo('problems' + this.chapter_ID)
      }
    },

    end() {
      // todo
      // 告诉后端视频看完了，要记录完成度
      this.check_time_flag = null
      this.current_time = null
    },

    async do_problem() {
      this.dialogFormVisible = true;
      await this.getProblemData()
      this.initial_time()
      this.startHandler()
    },

    async getVideoID() {
      if (this.$route.params && this.$route.params.id) {
        this.video_id = this.$route.params.id
        const {data: res} = await requestUtil.get('http://localhost:8003/edu-vod/video/getAutoPlayUrl/' + this.video_id)
        this.source = res.data.autoUrl
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

    view_homework() {
      console.log("homework")
    },


    play() {
      this.$refs.VueAliplayerV2.play();
      this.video_time = this.$refs.VueAliplayerV2.getDuration();
      if (this.check_time_flag == null && this.current_time == null) {
        this.setCheckHandler()
      }
      this.check_time = 2 * this.video_time / 3
    },

    pause() {
      this.$refs.VueAliplayerV2.pause();
    },

    handleVodUploadSuccess() {

    },

    getInputValue(index) {
      this.allRadio[index] = this.radio[index]; // 将数据存入提交给后台的数据中
      console.log(this.allRadio);
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
    }
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
  height: 315px;
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

