<template>
  <div class="join-wrap">
    <div class="experience-box">
      <div class="title">YOUR JOURNEY STARTS HERE</div>
      <div class="little-title">Memberships starting at $99</div>
      <div class="opera-box flex">
        <div class="join-box flex justify-between">
          <span>JOIN NOW</span>
          <div class="iconfont icon-jiantou-you"></div>
        </div>
      </div>
    </div>

    <div class="works">
      <div class="member-title">SELECT YOUR MEMBERSHIP</div>
      <div class="row-box flex justify-between">
        <div class="item">
          <div class="item-left">
            <img class="item-icon" src="@/assets/images/join/icon2.png" alt="" />
          </div>
          <div class="item-right">
            <div class="item-name">JOIN</div>
            <div class="item-type">BOTTLE</div>
            <div class="money">Starting at $170</div>
            <div class="select">SELECT <div class="iconfont icon-jiantou-you"></div></div>
          </div>
        </div>
        <div class="item">
          <div class="item-left">
            <img class="item-icon" src="@/assets/images/join/icon3.png" alt="" />
          </div>
          <div class="item-right">
            <div class="item-name">MEMBERSHIP + TASTING KIT</div>
            <div class="item-type kit-type">TASTING KIT</div>
            <div class="money">$195</div>
            <div class="select kit">SELECT <div class="iconfont icon-jiantou-you"></div></div>
          </div>
        </div>
      </div>

      <div class="row-box only-row-box">
        <div class="middle-box">OR</div>

        <div class="item only-item-box">
          <div class="only-row-top">
            <div class="item-left">
              <img class="item-icon only-icon" src="@/assets/images/home/vector.png" alt="" />
            </div>
            <div class="item-right">
              <div class="item-name">MEMBERSHIP ONLY</div>
              <div class="item-type only-type">MEMBERSHIP ONLY</div>
              <div class="money">$99</div>
            </div>
          </div>
          <div class="only-btn-box flex">
            <div class="select only-select">JOIN <div class="iconfont icon-jiantou-you"></div></div>
            <div class="select only-select">GIFT <div class="iconfont icon-jiantou-you"></div></div>
          </div>
        </div>
      </div>
    </div>

    <div class="society-box">
      <div class="theme-title">MEMBER BENEFITS</div>
      <div class="line"></div>
      <div class="life-swiper-box">
        <swiper
          navigation
          :modules="modules.modules"
          :loop="true"
          :slides-per-view="1"
          :space-between="20"
          :scrollbar="{ draggable: false }"
          class="custom-carousel-life-box"
          @slideChange="onLifeSlideChange"
        >
          <swiper-slide v-for="(item, idex) in data.lifeData" :key="idex" class="swiper-slide-life">
            <div class="life-info">
              <div class="life-info-left">
                <div class="life-title">{{ item.title }}</div>
                <div class="desc">{{ item.desc }}</div>
              </div>
              <div class="life-info-right">
                <img :src="item.pic" alt="" />
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <img class="next-img" :src="data.lifeData[data.lifeIndex].pic" alt="" />
        
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {Swiper, SwiperSlide} from 'swiper/vue'; // swiper所需组件
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import goodsImg7 from "@/assets/images/home/goods_6.png";
import swiperImg1 from "@/assets/images/join/icon4.png";
import swiperImg2 from "@/assets/images/join/icon5.png";
import swiperImg3 from "@/assets/images/home/swiper_3.png";


const proxy: any = getCurrentInstance()?.proxy;

const route = useRoute();
const interSwiper = ref();

// const navigation = ref({
//   nextEl: ".swiper-button-next",
//   prevEl: ".swiper-button-prev",
// });
const navigationLife = ref({
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
});
// 在modules加入要使用的模块
const modules = reactive({
  modules: [Navigation]
})
const prevEl = () => {
  console.log('prevEl', modules, Navigation);
};
const nextEl = () => {
  console.log('nextEl', modules);
  // interSwiper.value?.$swiper.slideNext()
};
// 更改当前活动swiper
const onSlideChange = (swiper: any) => {
// swiper是当前轮播的对象，里面可以获取到当前swiper的所有信息，当前索引是activeIndex
  console.log(swiper.activeIndex)
};

const data = reactive({
  lifeData: [
    {
      title: 'DISCOVER',
      desc: 'Experience the world’s most sought-after expressions of single malt whisky from over 150 unique distilleries released each month.',
      pic: swiperImg1
    },
    {
      title: 'SMWS takes home 10 medals from SFWSC!',
      desc: 'Experience the world’s most sought-after expressions of single malt whisky from over 150 unique distilleries released each month.',
      pic: swiperImg2
    },
    {
      title: 'SMWS takes home 10 medals from SFWSC!',
      desc: 'Experience the world’s most sought-after expressions of single malt whisky from over 150 unique distilleries released each month.',
      pic: swiperImg3
    },
  ] as any,
  lifeIndex: 0,
});

const onLifeSlideChange = (swiper: any) => {
  if (swiper.realIndex === data.lifeData.length - 1) {
    data.lifeIndex = 0;
  } else {
    data.lifeIndex = swiper.realIndex + 1;
  }
}

watch(
  () => route,
  () => {
    
  },
  { immediate: true, deep: true }
);
</script>

<style lang="scss" scoped>
.join-wrap {
  padding: 0 4.5%;
  box-sizing: border-box;
  color: #FFF;
  overflow: hidden;

  :deep(.swiper-button-prev), :deep(.swiper-button-next) {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    text-align: center;
    line-height: 50px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2024;
    color: #fff;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.25);
    

    &::after{
      // content: "";
      font-size: 20px;
    }

    &:hover {
      background: #000;
    }
  }

  .swiper-button-left {
    .iconfont {
      font-size: 20px;
    }
  }

  .swiper-button-right {
    background: url('@/assets/images/home/swiper-right-icon.png') no-repeat;
  }

  .experience-box {
    background: url('@/assets/images/join/icon1.png') no-repeat;
    background-size: 100%;
    width: 100%;
    height: 643px;
    padding-top: 1px;
    margin-top: 64px;

    .title {
      font-size: 82px;
      font-style: normal;
      font-weight: 500;
      line-height: 90px;
      letter-spacing: 0.82px;
      text-transform: uppercase;
      width: 590px;
      margin: 150px 0 0 80px;
      font-family: 'Oswald-Medium';
    }

    .little-title {
      color: #FFF;
      font-family: 'Georgia-Italic';
      font-size: 24px;
      font-style: italic;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.48px;
      margin: 35px 0 25px 100px;
    }

    .join-box {
      border: 2px solid #FFF;
      width: 156px;
      height: 64px;
      font-size: 23px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      padding: 0px 24px;
      margin-right: 10px;
      cursor: pointer;
      font-family: 'Oswald-Medium';

      &:first-child {
        margin-left: 100px;
      }

      .icon-jiantou-you {
        font-size: 24px;
      }
    }
  }

  .member-title {
    color: #2E2E2D;
    text-align: center;
    font-family: 'Oswald-Medium';
    font-size: 54px;
    font-style: normal;
    font-weight: 500;
    line-height: 60px;
    letter-spacing: 0.54px;
    text-transform: uppercase;
  }

  .theme-title {
    width: 100%;
    color: #2E2E2D;
    text-align: center;
    font-size: 82px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.82px;
    text-transform: uppercase;
    margin-bottom: 32px;
  }

  .works {
    margin-top: 90px;
    margin-bottom: 120px;

    .row-box {
      margin-top: 60px;
      align-items: flex-start;
      padding: 0 170px;
      position: relative;

      .middle-box {
        position: absolute;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 80px;
        line-height: 80px;
        border-radius: 40px;
        background: #FFF;
        color: #2E2E2D;
        text-align: center;
        font-family: 'Oswald-Regular';
        font-size: 23px;
        font-style: normal;
        font-weight: 600;
        text-transform: uppercase;
      }

      .item {
        flex: 1;
        background: #F2F2F2;
        padding: 30px 0;
        box-sizing: border-box;
        display: flex;

        &:first-child {
          margin-right: 30px;
        }

        .item-left {
          padding: 0 45px;
          border-right: 1px solid #C1C1C1;
          box-sizing: border-box;
          margin-right: 40px;
        }

        .item-icon {
          width: 100px;
          height: 244px;
        }

        .only-icon {
          width: 149px;
          height: 149px;
        }

        .item-name {
          color: #2E2E2D;
          font-family: 'Oswald-Regular';
          font-size: 18px;
          font-style: normal;
          font-weight: 500;
          line-height: 18px;
          letter-spacing: 0.36px;
          text-transform: uppercase;
        }

        .item-type {
          color: #74AF3E;
          font-family: 'Oswald-Medium';
          font-size: 54px;
          font-style: normal;
          font-weight: 500;
          line-height: 60px;
          letter-spacing: 0.54px;
          text-transform: uppercase;
          margin: 10px 0 22px;

          &.kit-type {
            color: #202448;
          }

          &.only-type {
            color: #71307C;
          }
        }

        .money {
          color: #2E2E2D;
          font-family: 'Georgia-Italic';
          font-size: 24px;
          font-style: italic;
          font-weight: 400;
          line-height: 28px;
          letter-spacing: 0.48px;
        }

        .select {
          display: flex;
          width: 168px;
          height: 64px;
          padding: 0px 20px;
          align-items: center;
          border: 4px solid #74AF3E;
          box-sizing: border-box;
          margin-top: 18px;
          color: #74AF3E;
          font-family: 'Oswald-Medium';
          font-size: 23px;
          font-style: normal;
          font-weight: 600;
          line-height: 26px;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          justify-content: space-between;
          cursor: pointer;

          .icon-jiantou-you {
            font-size: 24px;
            font-weight: 700;
          }
        }

        .kit {
          border: 4px solid #202448;
          color: #202448;
        }

        .only-select {
          border: 4px solid #71307C;
          color: #71307C;
          margin-right: 10px;
        }
      }
    }

    .only-row-box {
      width: 840px;
      border: 1px solid;
      margin: 20px auto;

      .only-item-box {
        display: block;
        padding: 50px 0;
      }

      .only-row-top {
        display: flex;
      }

      .only-btn-box {
        margin-left: 34.4%;
      }
    }
  }

  .society-box {
    background: #F2F2F2;
    padding: 150px 4.5% 150px 4.5%;
    width: 100%;
    box-sizing: border-box;
    position: relative;

    .theme-title {
      text-align: left;
    }

    .line {
      background: #2E2E2D;
      width: 90%;
      height: 1px;
      margin-top: 75px;
    }

    .life-swiper-box {
      position: relative;

      :deep(.swiper-button-prev) {
        position: absolute;
        top: 50px;
        left: 91%;
      }

      :deep(.swiper-button-next) {
        position: absolute;
        top: 50px;
        left: 96%;
      }

      .custom-carousel-life-box {
        padding-top: 68px;
        position: relative;
        top: -30px;
      }

      .swiper-slide-life {
        width: 100%;
        overflow: hidden;
        margin-top: 20px;

        .life-info {
          display: flex;
        }
      }

      .life-info-left {
        color: #2E2E2D;
        font-family: 'Oswald-Medium';
        font-size: 54px;
        font-style: normal;
        font-weight: 500;
        line-height: 60px;
        letter-spacing: 0.54px;
        text-transform: uppercase;
        width: 568px;

        .desc {
          width: 528px;
          margin-top: 44px;
          font-family: 'Georgia-Italic';
          font-size: 24px;
          font-style: italic;
          font-weight: 400;
          line-height: 38px;
          letter-spacing: 0.48px;
          text-transform: none;
        }
      }

      .life-info-right {
        margin-left: 280px;

        img {
          width: 100%;
        }
      }

      .next-img {
        position: absolute;
        z-index: 9999;
        right: -600px;
        top: 58px;
        // width: 120px;
        height: 475px;
      }
      
    }
  }
}
</style>