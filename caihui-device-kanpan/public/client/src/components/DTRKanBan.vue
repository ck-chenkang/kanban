<template>
  <div class="kanban-container">
    <div class="kanban-head">
      <div class="kanban-head__left">
        <img class="kanban-head__left-logo" src="../assets/itex.png" />
      </div>
      <div class="kanban-head__right">
        <div class="kanban-head__right-time" id="currentDate">
          <div>{{ nowDate }}</div>
        </div>
        <div class="kanban-head__right-alarm hide" id="call_board">
          <!--           <ul id="call_board_ul" v-for="(item,index) in devices" v-bind:key="index">
            <li>{{ item.AlarmText }}</li>
          </ul> -->
        </div>
      </div>
    </div>

    <div class="kanban-content">
      <div class="kanban-warning" v-if="errFlag">
        <h1>
          数据库连接失败，请检查中控系统电源或网络情况！！
        </h1>
      </div>
      <swiper :options="swiperOption" ref="mySwiper" v-else>
        <swiper-slide
          class="swiper-slide kanban-content__devices"
          v-for="(item1, index1) in devices"
          :key="index1"
        >
          <div
            class="kanban-content__devices-card"
            v-for="(item2, index2) in devices[index1][0]"
            :key="index2"
          >
            <div class="devices-card__head">
              <div class="devices-card__name">{{ item2.MachineName }}</div>
              <div
                :class="[
                  item2.MachineStateInt == '1'
                    ? 'devics-card__status-online'
                    : item2.OnLine == '0'
                    ? 'devics-card__status-offline'
                    : 'devics-card__status-standby',
                ]"
              ></div>
            </div>
            <div class="interval"></div>
            <div class="devices-card__content">
              <div class="devices-card__top">
                <div class="devices-card__top-left">
                  <div class="devices-card__current-name">当前批次</div>
                  <div class="devices-card__current-step">
                    {{ item2.BatchName}}
                  </div>
                </div>
                <div class="devices-card__top-right">
                  <div class="devices-card__current-name">批次开始时间</div>
                  <div class="devices-card__current-step">
                    {{ item2.BatchStartTime}}
                  </div>
                </div>
              </div>
              <div class="devices-card__bottom">
                <div class="devices-card__bottom-left">
                  <div class="devices-card__current-name">当前步骤</div>
                  <div class="devices-card__current-step">
                    {{ item2.zhuzhiling }}
                  </div>
                </div>
              </div>
            </div>
            <!-- 现场用 -->
            <!-- <div :class="[item2.Main_Alarm != '' ? '' :'hide']"> -->
            <!-- 测试用 -->
            <div :class="[item2.Main_Alarm != null ? '' : 'hide']">
              <div class="devices-alarm">
                <img class="devices-alarm__img" src="../assets/alarm-pop.png" />
                <div class="devices-alarm__text">{{ item2.Main_Alarm }}</div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
var _self,
  setNowTime,
  getDevicesInterval,
  callBoardCount = 0;

export default {
  // name: "Hello",
  data() {
    return {
      nowDate: "",
      devices: [],
      err: "", //存放数据库未连接报警
      errFlag: "false", //数据库未连接报警的标志位
      swiperOption: {
        // 分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-bullet__active",
          clickableClass: "custom-pagination__clickable",
        },
        // 默认显示第几个
        initialSlide: 1,
        // 轮播间隔
        autoplay:false,
        // autoplay: {
        //   delay: 5000,
        //   stopOnLastSlide: false,
        //   disableOnInteraction: false,
        // },
        // 切换速度
        speed: 100,
        // 用户手动操作swiper后，自动切换不停止  true：停止 false：不会停止
        autoplayDisableOnInteraction: false,
        // 无缝链接
        loop: true,
      },
    };
  },
  created() {
    _self = this;
    _self.nowTime();
    _self.getKanbanDevices();
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  filters: {

  },
  methods: {
    getKanbanDevices() {
      this.$axios
        .get("/api/search")
        .then((response) => {

          console.log("response.data.err: " +  response.data.err);
          if (response.data.err != undefined) {
            this.errFlag = true;
            console.log("this.errFlag: " + this.errFlag);
            this.err = "DTR中控未打开";
          } else {
            const { recordset } = response.data;
            console.log(recordset);
            let swiperLen = Math.ceil(recordset.length / 16);
            this.errFlag = false;
            for (var i = 0; i < swiperLen; i++) {
              let list = [];
              if (i == 0) {
                list.unshift(recordset.slice(0, 16));
                this.devices.push(list);
              } else {
                let begin = i * 16,
                  end = (i + 1) * 16;
                list.unshift(recordset.slice(begin, end));
                this.devices.push(list);
              }
            }
          }
          console.log('------------------',this.devices);
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    //获取当天日期
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
      this.nowDate =
        year +
        "/" +
        month +
        "/" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
    },
  },
  mounted() {
    setNowTime = setInterval(function () {
      _self.nowTime();
    }, 1000);
    getDevicesInterval = setInterval(function () {
      _self.devices = [];
      _self.getKanbanDevices();
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(setNowTime);
    clearInterval(getDevicesInterval);
  },
};
</script>

<style scoped>
.kanban-container {
  height: 1080px;
  width: 1920px;
}
/*看板头部*/
.kanban-head {
  height: 115px;
  width: 100%;
  background: rgba(34, 53, 98, 1);
  box-shadow: 0px 2px 12px 0px rgba(8, 28, 73, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.kanban-head__left {
  margin-left: 24px;
}
.kanban-head__right {
  margin-right: 24px;
  width: 74%;
  text-align: right;
}
.kanban-head__right-time {
  font-size: 36px;
  font-weight: 500;
  font-family: Arial-BoldMT, Arial;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/*报警公告栏*/
.kanban-head__right-alarm {
  font-size: 36px;
  font-family: MicrosoftYaHei;
  color: rgba(255, 218, 43, 1);
  letter-spacing: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 47px;
  line-height: 47px;
}
li {
  list-style: none;
}

/*看板主体内容*/
.kanban-content {
  box-sizing: border-box;
  padding: 0 0 16px 16px;
}
.kanban-content__devices {
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}
/*设备卡片*/
.kanban-content__devices-card {
  width: 460px;
  height: 214px;
  background: rgba(34, 53, 98, 1);
  border-radius: 12px;
  margin: 16px 16px 0 0;
  position: relative;
}

/*设备卡片-头部*/
.devices-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  line-height: 34px;
}
.devices-card__name {
  margin-left: 16px;
  font-size: 30px;
  font-family: Arial-BoldMT, Arial;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
}

/*设备状态*/
/*在线*/
.devics-card__status-online {
  margin-right: 24px;
  width: 24px;
  height: 24px;
  background: rgba(82, 196, 26, 1);
  box-shadow: 0px 0px 20px 0px rgba(82, 196, 26, 1);
  border-radius: 50%;
  animation-name: online;
  animation-duration: 1.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
@keyframes online {
  from {
    /*opacity: 1;*/
    box-shadow: 0px 0px 20px 5px rgba(82, 196, 26, 1);
  }
  to {
    /*opacity: 0.8;*/
    box-shadow: 0px 0px 0px 0px rgba(82, 196, 26, 0.4);
  }
}
/*待机*/
.devics-card__status-standby {
  margin-right: 24px;
  width: 24px;
  height: 24px;
  background: rgba(45, 126, 255, 1);
  /*box-shadow:0px 0px 20px 0px rgba(45,126,255,1);*/
  border-radius: 50%;
}
/*离线*/
.devics-card__status-offline {
  margin-right: 24px;
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 1);
  border-radius: 50%;
  opacity: 0.25;
}

/*设备卡片-内容*/
.devices-card__content {
  margin: 12px 16px;
}
.devices-card__top {
  display: flex;
  margin-bottom: 12px;
}
.devices-card__top-left {
  width: 60%;
}

.devices-card__top-right {
  width: 40%;
}
.devices-card__bottom {
  display: flex;
}
.devices-card__bottom-left {
  width: 100%;
}
.devices-card__current-name {
  margin-bottom: 6px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: #7f90a3;
  line-height: 21px;
}
.devices-card__current-step {
  font-size: 24px;
  font-family: ArialMT;
  color: rgba(255, 255, 255, 0.85);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 28px;
}

/*间隔线*/
.interval {
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
}

/*发生报警*/
.devices-alarm {
  height: 78px;
  width: 100%;
  bottom: 0;
  background: rgba(209, 42, 42, 1);
  border-radius: 0px 0px 12px 12px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  /*animation-name: alarm;*/
  /*animation-duration: 0.2s;*/
  /*animation-timing-function: linear;*/
  /*animation-iteration-count: infinite;*/
  /*animation-direction: alternate;*/
}
@keyframes alarm {
  from {
    opacity: 1;
    /*box-shadow:0px 0px 20px 10px rgba(209,42,42,1);*/
  }
  to {
    opacity: 0.1;
    /*box-shadow:0px 0px 0px 0px rgba(209,42,42,0.4);*/
  }
}
.devices-alarm__img {
  height: 38px;
  width: 38px;
  color: #ffffff;
  margin: 0 10px 3px 0;
  animation-name: alarm;
  animation-duration: 0.2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.devices-alarm__text {
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-right: 25px;
  animation-name: alarm;
  animation-duration: 0.2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

#nowDate {
  font-family: ArialMT;
  font-size: 36px;
}
/*隐藏*/
.hide {
  display: none;
}
</style>

<style>
/* 自定义分页器样式 */
.custom-bullet {
  display: inline-block;
  position: relative;
  width: 16px;
  height: 16px;
  margin: 0 18px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
}
.custom-bullet__active {
  background: rgba(255, 255, 255, 0.85);
  opacity: 1;
}
.custom-pagination__clickable {
  position: fixed;
}

.kanban-warning {
  text-align: center;
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 0, 0, 1);
  margin-right: 25px;
}
</style>
