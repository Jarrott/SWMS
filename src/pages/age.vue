<template>
  <div class="age-page-wrap">
    <div class="logo-box">
      <img src="@/assets/images/home/vector.png" alt="" />
      <div>THE SCOTCH MALT</div>
      <div>WHISKY SCOIETY</div>
      <div class="bottom-line"></div>
      <div class="text">Are you at least 21 years old?</div>
      <div class="btn-box flex">
        <div class="yes btn">YES</div>
        <div class="no btn">NO</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';
const router = useRouter();
const winHeight = ref(937);

const nowTime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'));

let timer = ref();

const setScale = () => {
  let scaleW = window.innerWidth / 1920;
  const winw = window.innerWidth;
  const winh = window.innerHeight;
  winHeight.value = winh;
  if (winw <= 1366) {
    scaleW = 0.71;
  }
  const overviewWrap = document.querySelector('.ageContent');
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


onMounted(() => {
  setScale();
  window.addEventListener('resize', setScale);
});
onUnmounted(() => {
  
  window.removeEventListener('resize', setScale);
});
</script>
<style lang="scss" scoped>
.age-page-wrap {
  width: 100%;
  min-height: 100%;
  background: url("@/assets/images/home/age-gate-bg1.png") no-repeat;
  background-size: 100%;
  text-align: center;
  padding-top: 1px;
  padding: 1px 250px 50px;
  box-sizing: border-box;

  .logo-box {
    margin-top: 120px;
    text-align: center;
    color: #2E2E2D;
    font-family: Oswald;
    font-size: 54px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.54px;
    text-transform: uppercase;

    img {
      width: 250px;
      height: 250px;
    }

    .bottom-line {
      width: 100%;
      height: 7px;
      margin-top: 80px;
      margin-bottom: 86px;
      background: linear-gradient(90deg, #70442F 0%, #FFE9CD 32%, #603622 65%, #C48D71 85%, #EAB497 100%);
    }

    .text {
      color: #2E2E2D;
      text-align: center;
      font-family: Georgia;
      font-size: 42px;
      font-style: italic;
      font-weight: 400;
      line-height: normal;
    }

    .btn-box {
      width: 100%;
      justify-content: center;
      margin-top: 84px;

      .btn {
        width: 200px;
        height: 84px;
        text-align: center;
        line-height: 84px;
        border: 3px solid #2E2E2D;
        box-sizing: border-box;
        margin-right: 30px;
        color: #2E2E2D;
        font-family: Oswald;
        font-size: 32px;
        font-style: normal;
        font-weight: 500;
        cursor: pointer;
        box-sizing: border-box;

        &:hover {
          border: 3px solid #2E2E2D;
          background: #000;
          color: #fff;
        }
      }
    }
  }
}
</style>