<template>
  <div id="kanban">
    <Header></Header>
    <div class="devices">
      <Device
        class="deviceBlock"
        :device="item"
        v-for="(item, index) in devices"
        :key="index"
      ></Device>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Device from "./DeviceBlock.vue";

var _self, getDevicesInterval, refreshInterval;
export default {
  components: { Header, Device },
  data() {
    return {
      devices: {
        deviceName: "Q18",
        devices: [],
      },
    };
  },
  methods: {
    getKanbanDevices() {
      this.$axios
        .get("/api/search")
        .then((response) => {
          const { recordset } = response.data;
          this.devices = recordset;

          console.log(this.devices);
          console.log("in function getKanbanDevices");
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
  },
  created() {
    _self = this;
    _self.getKanbanDevices();
  },
  mounted() {
    // getDevicesInterval = setInterval(function () {
    //   _self.devices = [];
    //   _self.getKanbanDevices();
    // }, 60000);
    _self.devices = [];
    _self.getKanbanDevices();
    refreshInterval = setInterval(function () {
      location.reload();
    }, 60000);
  },
  beforeDestroy() {
    // clearInterval(getDevicesInterval);
    clearInterval(refreshInterval);
  },
};
</script>

<style>
.devices {
  display: flex;
  flex-wrap: wrap;
}

.deviceBlock {
  margin-left: 30px;
  margin-top: 0px;
}
</style>
