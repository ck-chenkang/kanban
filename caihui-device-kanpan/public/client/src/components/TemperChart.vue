<template>
  <div>
    <div :id="id" :style="{width:'280px', height: '300px'}"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: ["id"],
  data(){
    return {
      option:{},
      chartInstance:{},
    }
  },
  methods : {
      initCharts(id, yData) {
        this.chartInstance = echarts.init(document.getElementById(id),null, {renderer: 'svg'});
          this.option = {
              xAxis: {
                type: "category",
                data: ["", "", "", "","",
                        "", "", "", "","",
                        "", "", "", "","",
                        "", "", "", "",""],
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  data: yData,
                  type: "line",
                  smooth: true,
                },
              ],
            };
          this.chartInstance.setOption(this.option);
      },
  },
  mounted() {
    // this.initCharts([100,200]);
  }
}
</script>

<style>

</style>
