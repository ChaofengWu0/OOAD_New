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
              :isLive="false"
              :showBuffer="true"
              :disableSeek="true"
              controlBarVisibility="always"
          />
        </div>

        <div class="player-btns">
          <span @click="play()">播放</span>
          <span @click="pause()">暂停</span>
          <span @click="getStatus()">获取播放器状态</span>
          <span @click="ended()">testEnded</span>
        </div>

        <el-button class="homework" @click="view_homework">
          查看作业
        </el-button>

      </el-main>

      <el-footer>Footer</el-footer>
    </el-container>
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
      source: "https://outin-71f4b58068c211ed9c8b00163e00b174.oss-cn-shanghai.aliyuncs.com/sv/588519ca-1849eed0a7b/588519ca-1849eed0a7b.mp4?Expires=1669182421&OSSAccessKeyId=LTAIwkKSLcUfI2u4&Signature=YmH%2FPN4zoTO1wQUz8y1CPhTxois%3D",
      status: ""
    }
  },
  created() {
    this.getVideoData()
  },

  methods: {
    getVideoData() {
      //1、调用后台接口获取视频vid,playAuth(鉴权地址),cover(视频封面)的逻辑
      // 2、将对应的值分别赋值
    },

    view_homework() {
      console.log("homework")
    },

    ended() {
      this.$refs.VueAliplayerV2.ended();
      console.log("ended")
    },

    play() {
      this.$refs.VueAliplayerV2.play();
    },

    pause() {
      this.$refs.VueAliplayerV2.pause();
    },

    getStatus() {
      const status = this.$refs.VueAliplayerV2.getStatus();
      console.log(`getStatus:`, status);
      this.status = status
    },
  },
  // watch: {
  //   status: {
  //     handler(newV) {
  //       console.log(newV)
  //
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
