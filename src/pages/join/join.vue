<template>
  <div class="join-wrap">
    <div class="experience-box">
      <div class="title">YOUR JOURNEY STARTS HERE</div>
      <div class="little-title">Memberships starting at $99</div>
      <div class="opera-box flex">
        <div class="join-box flex justify-between" ref="scrollContainer" @click="handleScroll">
          <span>JOIN NOW</span>
          <div class="iconfont icon-jiantou-you"></div>
        </div>
      </div>
    </div>

    <div class="works">
      <div class="member-title" >SELECT YOUR MEMBERSHIP</div>

      <div class="have-selected-box" v-if="data.currentSelectItem">
        
        <div class="tab-title flex">
          <div class="bottle" :class="{'active': data.currentSelectItem==='bottle'}" @click="changeTab('bottle')">Bottle</div>
          <div :class="{'active2': data.currentSelectItem==='kit'}" @click="changeTab('kit')">tasting kit</div>
        </div>
        <div class="select-main-content" v-if="data.currentSelectItem==='bottle'">
          <div class="intro">one year Membership + Bottle</div>
          <div class="list-box">
            <div class="row-item"
              v-for="(goodsItem, index) in data.goodsListData" :key="index">

                <div class="img-box" @click.stop="handleJumpDetails(goodsItem.id)">
                  <img class="goods-icon" :src="goodsItem.img" alt="" />
                </div>
                <div class="info-box">
                  <div class="text1">{{ goodsItem.no }}</div>
                  <div class="title bottom-title">{{ goodsItem.title }}</div>
                  <div class="btn-box flex">
                    <div class="btn btn1 flex translate-btn"
                    :style="[goodsItem.hovered ? `background: ${goodsItem.color};border:1px solid ${goodsItem.color};color:#fff;`: `border:1px solid ${goodsItem.color};color: ${goodsItem.color};background:#fff;`]"
                    @mouseover="goodsItem.hovered = true"
                    @mouseleave="goodsItem.hovered = false" @click.stop="handleJumpName('join')">
                      <span>JOIN</span>
                      <span class="iconfont icon-xiangyou" ></span>
                    </div>
                    <div class="btn btn2 flex translate-btn"
                    :style="[goodsItem.hovered1 ? `background: ${goodsItem.color};border:1px solid ${goodsItem.color};color:#fff;` : `border:1px solid ${goodsItem.color};color: ${goodsItem.color};background:#fff;`]"
                    @mouseover="goodsItem.hovered1 = true"
                    @mouseleave="goodsItem.hovered1 = false"
                    @click.stop="handleJumpDetails(goodsItem.id)">
                      <span>GIFT</span>
                      <span class="iconfont icon-xiangyou"></span>
                    </div>
                  </div>
                  <div class="info-item flavour">
                    <span class="label">FLAVOUR:</span>
                    <span class="value">{{ goodsItem.flavour }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">AGE:</span>
                    <span class="value">{{ goodsItem.age }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">REGION:</span>
                    <span class="value">{{ goodsItem.region }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">CASK:</span>
                    <span class="value">{{ goodsItem.cask }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">ABV:</span>
                    <span class="value">{{ goodsItem.abv }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">BOTTLES PRODUCED:</span>
                    <span class="value">{{ goodsItem.produced }}</span>
                  </div>
                </div>
                <div class="tips">{{ goodsItem.tip }}</div>
            </div>
          </div>
        </div>
        <div class="select-kit-main-content flex" v-else>
          <div class="kit-left-box">
            <div class="intro">one year Membership + tasting kit</div>
            <div class="price">$195</div>
            <div class="introduction">The perfect introduction to the rare and exciting world ofsingle cask whisky! Experience the diverse spectrum ofunique styles, regions and flavours that Scotch whiskyhas to offer in a beautiful presentation box.</div>
            <div class="includes">Each Tasting Kit includes:</div>
            <div class="includes-item">
              <span class="dot"></span>Three 1ooml single cask whisky bottles
            </div>
            <div class="includes-item">
              <span class="dot"></span>Two SMWS tasting snifter glasses
            </div>
            <div class="includes-item">
              <span class="dot"></span>One glass SMWS water pitcher
            </div>
            <div class="includes-item">
              <span class="dot"></span>One SMWS notebook for note taking
            </div>
            <div class="includes-item">
              <span class="dot"></span>One SMWS water dropper
            </div>
            <div class="tasting-kit-btn-box flex">
              <div class="btn translate-btn" @click="handleBack">JOIN <div class="iconfont icon-jiantou-you"></div></div>
              <div class="btn translate-btn" @click="handleJump('gift', '2')">GIFT <div class="iconfont icon-jiantou-you"></div></div>
            </div>
          </div>
          <div class="kit-right-box">
            <img src="@/assets/images/join/icon6.png" alt="">
          </div>
        </div>
      </div>

      <div class="row-box flex justify-between" v-else>
        <div class="item">
          <div class="item-left">
            <img class="item-icon" src="@/assets/images/join/icon2.png" alt="" />
          </div>
          <div class="item-right">
            <div class="item-name">JOIN</div>
            <div class="item-type">BOTTLE</div>
            <div class="money">Starting at $170</div>
            <div class="select translate-btn" @click="handleJump('', '3')">SELECT <div class="iconfont icon-jiantou-you"></div></div>
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
            <div class="select kit translate-btn" @click="handleJump('', '4')">SELECT <div class="iconfont icon-jiantou-you"></div></div>
          </div>
        </div>
      </div>

      <div class="row-box only-row-box">
        <div class="middle-box" v-if="!data.currentSelectItem">OR</div>

        <div class="item only-item-box" ref="targetElement">
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
            <div class="select only-select translate-btn" @click="handleJump('join', '1')">JOIN <div class="iconfont icon-jiantou-you"></div></div>
            <div class="select only-select translate-btn" @click="handleJump('gift', '2')">GIFT <div class="iconfont icon-jiantou-you"></div></div>
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

import { JOIN_GOODS_LIST } from "@/utils/simulatedData";


const proxy: any = getCurrentInstance()?.proxy;

const router = useRouter();
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
  currentSelectItem: '', // 当前的选项
  goodsListData: JOIN_GOODS_LIST,
});

const targetElement = ref();
const scrollContainer = ref();

const onLifeSlideChange = (swiper: any) => {
  if (swiper.realIndex === data.lifeData.length - 1) {
    data.lifeIndex = 0;
  } else {
    data.lifeIndex = swiper.realIndex + 1;
  }
}

const handleScroll = () => {
  // 获取目标元素的相对位置（相对于滚动容器）
  const rect: any = targetElement.value?.getBoundingClientRect().top;
  console.log('rect', rect);
  
  (window as any).scrollTo({ top: rect, behavior: 'smooth' })
};

const handleJump = (name?: string, type: string) => {
  if (type === '1') {
    router.push({name})
  } else if (type ==='2') {
    // 这里要把此条数据存储到store，更新购物车
    router.push({name})
  } else if (type === '3') {
    data.currentSelectItem = 'bottle'
  } else if (type === '4') {
    data.currentSelectItem = 'kit'
  }
};

// tab切换
const changeTab = (name: string) => {
  data.currentSelectItem = name;
};

const handleBack = () => {
  
  data.currentSelectItem = '';
  (window as any).scrollTo({ top: 0, behavior: 'smooth' });

}
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
        font-size: 28px;
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

          &:hover {
            background: #74AF3E;
            color: #fff;
          }

          .icon-jiantou-you {
            font-size: 28px;
            font-weight: 700;
          }
        }

        .kit {
          border: 4px solid #202448;
          color: #202448;
          &:hover {
            background: #202448;
            color: #fff;
          }
        }

        .only-select {
          border: 4px solid #71307C;
          color: #71307C;
          margin-right: 10px;
          &:hover {
            background: #71307C;
            color: #fff;
          }
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

    .have-selected-box {
      color: #202448;
      padding: 0 176px;
      box-sizing: border-box;
      width: 100%;
      margin-top: 60px;

      .select-main-content {
        border: 1px solid #74AF3E;
      }

      .select-kit-main-content {
        border: 1px solid #202448;
        box-sizing: border-box;
        padding: 0 44px 80px;

        .kit-left-box {
          color: #2E2E2D;
          font-family: 'Georgia-Regular';
          font-size: 24px;
          font-style: normal;
          font-weight: 400;
          line-height: 38px;
          letter-spacing: 0.48px;

          .price {
            color: #202448;
            font-family: 'Oswald-Medium';
            font-size: 54px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            letter-spacing: 0.25px;
            text-transform: uppercase;
          }

          .intro {
            margin-left: 0;
          }

          .introduction {
            margin-top: 24px;
            margin-bottom: 32px;
          }

          .includes-item {
            .dot {
              width: 4px;
              height: 4px;
              background-color: #2E2E2D;
              border-right: 50%;
              display: inline-block;
              vertical-align: middle;
              margin: 0 12px;
            }
          }

          .btn {
            width: 230px;
            height: 64px;
            text-align: center;
            display: flex;
            justify-content: space-between;
            line-height: 64px;
            border: 4px solid #202448;
            color: #202448;
            font-family: Oswald;
            font-size: 23px;
            font-style: normal;
            font-weight: 700;
            letter-spacing: 0.4px;
            text-transform: uppercase;
            padding: 0 20px;
            margin-right: 20px;
            margin-top: 42px;
            cursor: pointer;

            &:hover {
              background-color: #202448;
              color: #fff;
            }

            .icon-jiantou-you {
              font-size: 28px;
            }
          }
        }

        .kit-right-box {
          img {
            width: 654px;
            height: 654px;
            margin-top: 84px;
          }
        }
      }

      .tab-title {
        text-align: center;
        font-family: 'Oswald-Medium';
        font-size: 44px;
        font-style: normal;
        font-weight: 500;
        letter-spacing: 0.54px;
        text-transform: uppercase;

        div {
          background: #F2F2F2;
          flex: 1;
          height: 90px;
          line-height: 90px;
          border: 10px solid #fff;
          border-top: none;
          box-sizing: border-box;
          cursor: pointer;
          transition: padding .4s ease,font-size .4s ease,line-height .4s ease,color .4s ease,background .4s ease;
        }

        .bottle {
          color: #74AF3E;
          margin-right: 10px;
          
        }

        .bottle::before {
            color: red;
          }

        .active {
          color: #74AF3E;
          font-size: 54px;
          background-color: #fff;
          border: 1px solid #81ac6d;
          border-bottom: 0;
          position: relative;
          top: 2px;
          transition: opacity .4s ease;
        }

        .active2 {
          color: #202448;
          font-size: 54px;
          background-color: #fff;
          border: 1px solid #202448;
          border-bottom: 0;
          position: relative;
          top: 2px;
          transition: opacity .4s ease;
        }
      }

      .intro {
        font-family: 'Oswald-Medium';
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 18px; /* 90% */
        letter-spacing: 0.36px;
        text-transform: uppercase;
        margin: 70px 0 36px 44px;
      }

      .list-box {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        padding: 0 44px;
        box-sizing: border-box;

        .row-item {
          background: #FFF;
          display: inline-flex;
          width: calc(33.33% - 28px);
          box-sizing: border-box;
          flex-direction: column;
          color: #2E2E2D;
          font-family: 'Oswald-Regular';
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 21px;
          letter-spacing: 1.4px;
          margin-right: 40px;
          margin-bottom: 120px;
          position: relative;

          &:nth-child(3n) {
            margin-right: 0;
          }

          .img-box {
            width: 100%;
            text-align: center;
            cursor: pointer;
            background: #F2F2F2;
            box-sizing: border-box;
            padding: 40px 45px;
          }

          .goods-icon {
            height: 460px;
            position: relative;
          }

          .text1 {
            font-size: 20px;
            margin-top: 24px;
            margin-bottom: 6px;
          }

          .title {
            color: #202448;
            font-family: 'Oswald-Medium';
            font-size: 25px;
            font-weight: 500;
            line-height: 25px;
            letter-spacing: 0.25px;
            margin: 6px 0 16px;
            text-transform: uppercase;
          }

          .btn-box {
            width: 100%;
            margin-bottom: 30px;

            .btn {
              flex: 1;
              border: 1px solid #2E2E2D;
              height: 64px;
              line-height: 64px;
              font-size: 23px;
              font-weight: 700;
              font-family: 'Oswald-Medium';
              justify-content: space-between;
              box-sizing: border-box;
              padding: 0 20px;
              cursor: pointer;

              .icon-xiangyou {
                font-size: 28px;
              }

              &.btn1 {
                margin-right: 22px;
              }

            }
          }

          .info-item {
            font-family: 'Oswald-Medium';
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 30px;
            letter-spacing: 0.4px;
            border-bottom: 1px solid #707070;
            box-sizing: border-box;
            padding-bottom: 6px;
            padding-top: 6px;
            display: flex;
            align-items: center;

            &.flavour {
              border-top: 1px solid #707070;
            }

            .label {
              width: 180px;
              display: inline-block;
            }

            .value {
              font-family: 'Oswald-Regular';
              font-weight: 400;
              margin-left: 30px;
              white-space: nowrap;
              // width: calc(100% - 230px);
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          .tips {
            color: #2E2E2D;
            font-family: 'Georgia-Italic';
            font-size: 24px;
            font-style: italic;
            font-weight: 400;
            line-height: 38px;
            letter-spacing: 0.48px;
            margin-top: 36px;
          }
        }
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