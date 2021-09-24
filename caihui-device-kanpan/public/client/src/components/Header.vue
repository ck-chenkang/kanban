<template>
  <div id="Header">
    <img class="kanban-head-" src="../assets/Header.png" />
    <div class="company-name">KEYENLINK技研智联</div>
    <div class="title">设备实时状态</div>
    <div class="localDateTime-c">{{ localDateTime }}</div>
  </div>
</template>
<script>
var _self, setNowTime;
export default {
  data: function () {
    return {
      localDateTime: "2021-9-23 14:14",
    };
  },
  methods: {
    //获取当前时间
    nowTime() {
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var minute =
        now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
      var second =
        now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
      this.localDateTime =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
    },
  },
  created() {
    _self = this;
    _self.nowTime();
  },
  mounted() {
    setNowTime = setInterval(function () {
      _self.nowTime();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(setNowTime);
  },
};
</script>

<style>
.Header {
  width: 1920px;
  height: 50px;
  /* background-image: url(../assets/Header.png); */
  z-index: 1;
  position: relative;
}
.company-name {
  font-family: MicrosoftYaHei;
  color: rgba(255, 255, 255, 1);
  font-size: 20px;

  position: absolute;
  top: 35px;
  left: 0px;
}

.title {
  font-family: MicrosoftYaHei;
  color: rgba(255, 255, 255, 1);
  font-size: 36px;

  position: absolute;
  top: 35px;
  left: 825px;
}

.localDateTime-c {
  font-family: MicrosoftYaHei;
  color: rgba(255, 255, 255, 1);
  font-size: 20px;

  position: absolute;
  top: 35px;
  right: 65px;
}
</style>
