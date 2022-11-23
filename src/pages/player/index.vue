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

        <div class="function_area">
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

      <el-footer>Footer</el-footer>
    </el-container>


    <el-dialog title="来答题测试一下吧" :visible.sync="dialogFormVisible">

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


  </div>
</template>
<script>
// import AliPlayer from "../../components/AliPlayer";
import HeaderForPlayer from "@/components/HeaderForPlayer";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'index',
  components: {
    // "ali-player": AliPlayer,
    HeaderForPlayer
  },
  data() {
    return {
      source: "https://outin-71f4b58068c211ed9c8b00163e00b174.oss-cn-shanghai.aliyuncs.com/sv/588519ca-1849eed0a7b/588519ca-1849eed0a7b.mp4?Expires=1669206430&OSSAccessKeyId=LTAIwkKSLcUfI2u4&Signature=uA1JRRsF6zaWUzqKwwibPyDOUp4%3D",
      dialogFormVisible: true,
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

  methods: {
    submit_ans() {
      this.dialogFormVisible = false
    },

    getVideoData() {
      //1、调用后台接口获取视频vid,playAuth(鉴权地址),cover(视频封面)的逻辑
      // 2、将对应的值分别赋值
    }
    ,

    problem() {
      // todo
      // 给后端这个video的source，让后端把这个video的题目发过来，
      // 解析这个题目，然后弹出dialog
      this.dialogFormVisible = true;
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
  },
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
  position: fixed;
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
    margin: 0 auto;
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
  border: 1px solid #ffdc82;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  margin: 20px;

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
      border-color: #ffdc82;
      background: none;
      width: 20px;
      height: 20px;
    }
    /deep/.el-radio__input {
      vertical-align: sub;
    }
    /deep/ .el-radio__inner::after {
      width: 7px;
      height: 7px;
    }
    /deep/ .el-radio__input.is-checked + .el-radio__label {
      color: black;
    }
    /deep/ .el-radio__input.is-checked .el-radio__inner {
      border-color: #ffdc82;
      background: #ffdc82;
    }

  }
}



</style>

