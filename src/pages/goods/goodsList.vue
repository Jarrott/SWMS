<template>
  <div class="overview-bg">
    <div class="overview">
      <div class="header">
        <div class="header-left" @click="closeDialog"></div>
        <div class="header-middle">{{ title }}运营平台</div>
        <div class="header-right">{{ nowTime }}</div>
      </div>
      <div class="main">
        zhongjian
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';
const router = useRouter();
const winHeight = ref(937);

const title = import.meta.env.VITE_ENV_NAME;

const nowTime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'));

let timer = ref();
let requestTimer = ref();

const leftMaps = reactive({
  todayData: {},
  rankData: [],
  emissionData: {},
});

const middleMaps = reactive({
  stationData: {},
  orderData: {},
  pastTenData: {},
});

const rightMaps = reactive({
  historyData: {},
  terminalData: {},
  realtimeData: {},
});

const setScale = () => {
  let scaleW = window.innerWidth / 1920;
  const winw = window.innerWidth;
  const winh = window.innerHeight;
  winHeight.value = winh;
  if (winw <= 1366) {
    scaleW = 0.71;
  }
  const overviewWrap = document.querySelector('.overview');
  if (overviewWrap) {
    overviewWrap.setAttribute(
      'style',
      `transform: scale(${scaleW.toFixed(5)},${scaleW.toFixed(
        5
      )});transform-origin:left top;background-size:100% 100%;;
      `
    );
  }
};

// 关闭大屏
const closeDialog = () => {
  const channelId = window.localStorage.getItem('channelId');
  if (router.options.history.state.back) {
    router.go(-1);
  } else {
    router.replace({
      name: 'home',
      query: { channelId: channelId },
    });
  }
};

onMounted(() => {
  
  setScale();
  window.addEventListener('resize', setScale);
});
onUnmounted(() => {
  
  window.removeEventListener('resize', setScale);
});
</script>
<style lang="scss">
.overview-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-x: hidden;
  background-image: url('@/assets/images/overView/bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .overview {
    position: absolute;
    z-index: 1;
    width: 1920px;
    height: 1080px;
    display: flex;
    flex-direction: column;
    .header {
      width: 100%;
      height: 154px;
      background-image: url('@/assets/images/overView/header-bg.png');
      background-size: calc(100% - 16px) 100%;
      background-repeat: no-repeat;
      background-position: center center;
      display: flex;
      justify-content: space-between;
      position: relative;
      margin-bottom: -44px;
      &-left {
        margin-left: 39px;
        margin-top: 45px;
        width: 20px;
        height: 20px;
        background-image: url('@/assets/images/overView/close.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        cursor: pointer;
      }
      &-middle {
        position: absolute;
        top: 12px;
        left: 50%;
        transform: translateX(-50%);
        height: 56px;
        line-height: 56px;
        font-size: 43px;
        color: #ffffff;
        background: linear-gradient(0deg, #59c8ff 0%, #fafeff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      &-right {
        margin-top: 40px;
        margin-right: 33px;
        font-size: 15px;
        color: #eff7ff;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          top: 0px;
          left: -33px;
          width: 20px;
          height: 20px;
          background-image: url('@/assets/images/overView/header-time.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
    }
    .main {
      display: flex;
      justify-content: space-between;
      flex: 1;
      padding-bottom: 19px;
      color: #ffffff;
    }
  }
}
</style>