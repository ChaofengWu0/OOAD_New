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
      <!--      <el-button></el-button>-->
      <!--      <div slot="footer" class="dialog-footer" style="font-size: 50px">-->
      <el-button @click="submit_ans">提交答案</el-button>
      <!--      </div>-->
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
      source: "https://outin-71f4b58068c211ed9c8b00163e00b174.oss-cn-shanghai.aliyuncs.com/sv/588519ca-1849eed0a7b/588519ca-1849eed0a7b.mp4?Expires=1669194778&OSSAccessKeyId=LTAIwkKSLcUfI2u4&Signature=gQG5LB758aAy5kX68KJBr0RjvZU%3D",
      dialogFormVisible: false,
    }
  },
  created() {
    this.getVideoData()
  },

  methods: {
    submit_ans() {
      console.log("test")
    },

    getVideoData() {
      //1、调用后台接口获取视频vid,playAuth(鉴权地址),cover(视频封面)的逻辑
      // 2、将对应的值分别赋值
    }
    ,

    problem() {
      console.log("ended")
      // todo
      // 给后端这个video的source，让后端把这个video的题目发过来，
      // 解析这个题目，然后弹出dialog

      this.dialogFormVisible = true;

    }
    ,

    view_homework() {
      console.log("homework")
    }
    ,


    play() {
      this.$refs.VueAliplayerV2.play();
    }
    ,

    pause() {
      this.$refs.VueAliplayerV2.pause();
    },

    handleVodUploadSuccess(){

    }
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
  background-image: url("../../assets/img/upload_hw_banner.png");
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


</style>
