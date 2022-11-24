<template>
  <div class="video_page_container">
    <el-container class="page_container">

      <el-header height="90px">
        <HeaderForPlayer></HeaderForPlayer>
      </el-header>

      <el-main>



        <div>
          <vue-aliplayer-v2
              class="multiple-player"
              ref="VueAliplayerV2"
              :encryptType="1"
              :source="source"
              :useFlashPrism="false"
              :isLive="true"
              :showBuffer="true"
              :disableSeek="true"
              controlBarVisibility="always"
              @ended="problem"
          />
        </div>

        <div>
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
        </div>
      </el-main>

      <el-footer>
        Footer

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
                    @change="getInputValue(i)"
                ></el-radio>
              </li>

            </ul>
          </div>
          <!-- 考试 -->
          <el-button @click="submit_ans">提交答案</el-button>
        </el-dialog>

      </el-footer>
    </el-container>
  </div>
</template>
<script>
import HeaderForPlayer from "@/components/HeaderForPlayer";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'index',
  components: {
    HeaderForPlayer
  },
  data() {
    return {
      source: "https://outin-71f4b58068c211ed9c8b00163e00b174.oss-cn-shanghai.aliyuncs.com/sv/588519ca-1849eed0a7b/588519ca-1849eed0a7b.mp4?Expires=1669257318&OSSAccessKeyId=LTAIwkKSLcUfI2u4&Signature=PmQbmwU3Z5OT8MvLd87we5JQiSo%3D",
      dialogFormVisible: false,
      flag: null,
      total_time: 10,
      one: '00', // 时
      two: '00', // 分
      three: '00', // 秒
      abc: 0, // 秒的计数
      cde: 0, // 分的计数
      efg: 0, // 时的计数

      examinationData: [
        {
          id: "1",
          question:
              "课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握",
          answer: [
            {value: "A.Python"},
            {value: "B.Vue"},
            {value: "C.Php"},
            {value: "D.Java"}
          ]
        },
        {
          id: "1",
          question:
              "课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握",
          answer: [
            {value: "A.问题一"},
            {value: "B.Vue2"},
            {value: "C.Php2"},
            {value: "D.Java2"}
          ]
        },
        {
          id: "1",
          name: "three",
          question:
              "课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握",
          answer: [
            {value: "A.问题二"},
            {value: "B.Vue3"},
            {value: "C.Php3"},
            {value: "D.Java3"}
          ]
        },
        {
          id: "1",
          question:
              "课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握",
          answer: [
            {value: "A.课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握"},
            {value: "B.Vue4"},
            {value: "C.Php4"},
            {value: "D.Java4"}
          ]
        },
        {
          id: "1",
          question: "How about your in skills?",
          answer: [
            {value: "A.问题四"},
            {value: "B.Vue5"},
            {value: "C.Php5"},
            {value: "D.Java5"}
          ]
        }
      ],
      allRadio: [],//提交给后台的真题数据
      radio: []//单选真题答案
    }
  },
  created() {
    this.getVideoData()
  },

  mounted() {
    // this.dialogFormVisible = true
  },

  methods: {
    submit_ans() {
      this.dialogFormVisible = false
      this.endHandler()


    },

    getVideoData() {
      //1、调用后台接口获取视频vid,playAuth(鉴权地址),cover(视频封面)的逻辑
      // 2、将对应的值分别赋值
    },

    problem() {
      // todo
      // 给后端这个video的source，让后端把这个video的题目发过来，
      // 解析这个题目，然后弹出dialog
      this.dialogFormVisible = true;
      this.startHandler()
      this.initial_time()
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
    }
    ,

    pause() {
      this.$refs.VueAliplayerV2.pause();
    },

    handleVodUploadSuccess() {

    },
    getInputValue(index) {
      this.allRadio[index] = this.radio[index]; // 将数据存入提交给后台的数据中
      console.log(this.allRadio);
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
  // watch: {
  //   dialogFormVisible: {
  //     handler(newV) {
  //       console.log(newV)
  //       this.startHandler();
  //     }
  //   }
  // }
}

</script>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
  border: 0;
}

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
  position: absolute;
  left: 18%;
  width: 1000px;
  height: 50px;
}

.upload_homework {
  background-image: url("../../assets/img/hw_banner.jpg");
  left: 18%;
  top: 72%;
  position: absolute;
  width: 1000px;
  height: 50px;
}


.letter {
  left: 43%;
  position: absolute;
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

