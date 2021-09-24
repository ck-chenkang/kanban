<template>
  <div class="Deive">
    <img class="deviceBlockImag" src="../assets/DeviceBlock.png" alt="" />
    <div class="deviceName">{{ device.MachineName }}</div>
    <img
      v-show="device.MachineStateInt == 1 ? true : false"
      class="run"
      src="../assets/run.png"
    />

    <div class="table-left">
      <div class="batchName-word">当前批次:</div>
      <div class="zhuzhiling-word">主指令:</div>
      <div class="mainTemp-word">主缸温度:</div>
      <div class="machineAOut5-word">提升速度:</div>
      <div class="MachineAOut8-word">主泵速度:</div>
    </div>

    <img class="contentImag" src="../assets/subTitleImag2.png" />

    <div class="paramerters">
      <div class="batchName-content">
        {{ device.BatchName | stringFilter }}
      </div>
      <div class="zhuzhiling-content">
        {{ device.zhuzhiling | stringFilter }}
      </div>
      <div class="mainTemp-content">
        {{ device.machinemaintemp | numberFilter }} ℃
      </div>
      <div class="machineAOut5-content">
        {{ device.MachineAOut5 | numberFilter }} m/min
      </div>
      <div class="machineAOut8-content">
        {{ device.MachineAOut8 | numberFilter }} %
      </div>
    </div>

    <TemperChart
      class="chart"
      ref="chart_one"
      :id="device.machinenumber"
    ></TemperChart>
  </div>
</template>

<script>
import TemperChart from "./TemperChart.vue";
var refreshchart;
export default {
  components: { TemperChart },
  props: ["device", "index"],
  data() {
    return {
      deviceName: "Q18",
      deviceStatus: true,
      batchName: "A6666",
      mainTemp: 66.66,
      machineAOut5: 150, //提升速度
      machineAOut8: 80, //主泵速度
      zhuzhiling: "流量入水 方式 入水1 总量00007",
      yData1: [
        200, 932, 901, 800, 888, 820, 932, 901, 934, 888, 200, 932, 901, 800,
        888, 200, 932, 901, 800, 888,
      ],
    };
  },
  filters: {
    numberFilter: function (value) {
      if (!value) return "";
      return Number(value).toFixed(2).valueOf();
    },
    stringFilter: function (value) {
      if (!value) return "";
      return value.trim().substr(0, value.length > 19 ? 19 : value.length);
    },
  },
  mounted() {
    console.log("---------");
    console.log(this.$refs);
    this.$refs.chart_one.initCharts(this.device.machinenumber, this.device.tempList);
  },
  beforeDestroy() {
    clearInterval(refreshchart);
  },
};
</script>

<style>
.Deive {
  z-index: 7;
  width: 600px;
  height: 320px;
  position: relative;

  margin-bottom: 0px;
  /* border-color: rgba(255, 255, 255, 1); */
}

.deviceBlockImag {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 600px;
  height: 280px;
  margin-bottom: 0px;
}

.deviceName {
  font-family: MicrosoftYaHei;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  position: absolute;
  top: 20px;
  left: 20px;
}

.run {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 10px;
  left: 500px;
}

.table-left {
  font-family: MicrosoftYaHei;
  color: #ccdae9;
  font-size: 15px;
}

.batchName-word {
  position: absolute;
  top: 70px;
  left: 20px;
}
.zhuzhiling-word {
  position: absolute;
  top: 110px;
  left: 20px;
}
.mainTemp-word {
  position: absolute;
  top: 150px;
  left: 20px;
}

.machineAOut5-word {
  position: absolute;
  top: 190px;
  left: 20px;
}

.MachineAOut8-word {
  position: absolute;
  top: 230px;
  left: 20px;
}

.contentImag {
  width: 320px;
  height: 220px;
  position: absolute;
  top: 55px;
  left: 10px;

  opacity: 0.2;
}

.paramerters {
  font-family: MicrosoftYaHei;
  color: rgba(255, 255, 255, 1);
  font-size: 15px;
}

.batchName-content {
  position: absolute;
  top: 70px;
  left: 98px;
}

.zhuzhiling-content {
  position: absolute;
  top: 110px;
  left: 98px;
}

.mainTemp-content {
  position: absolute;
  top: 150px;
  left: 98px;
}

.machineAOut5-content {
  position: absolute;
  top: 190px;
  left: 98px;
}

.machineAOut8-content {
  position: absolute;
  top: 230px;
  left: 98px;
}

.chart {
  position: absolute;
  top: 20px;
  left: 360px;
}
</style>
