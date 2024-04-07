<template>
  <div class="home-wrap">

    <div class="swiper-goods-box">
      <div class="title-box">
        <div class="text-box flex">
          <div class="text-bg"></div>
          <div class="text">NEWEST RELEASES</div>
        </div>
        <div class="more-text" @click="handleJumpUrl('goodsList')">SEE MORE <div class="iconfont icon-jiantou-you"></div></div>
      </div>
      <GoodsListSwiper></GoodsListSwiper>
    </div>

    <div class="experience-box">
      <div class="title">EXPERIENCE WHISKY IN ITS PUREST FORM</div>
      <div class="little-title">Membership starting at $99</div>
      <div class="opera-box flex">
        <div class="join-box flex justify-between">
          <span>JOIN</span>
          <div class="iconfont icon-jiantou-you"></div>
        </div>
        <div class="join-box flex justify-between">
          <span>GIFT</span>
          <div class="iconfont icon-jiantou-you"></div>
        </div>
      </div>
    </div>

    <div class="works">
      <div class="theme-title">HOW IT WORKS</div>
      <div class="row-box flex justify-between">
        <div class="item">
          <img class="item-icon" src="@/assets/images/home/key.png" alt="" />
          <div class="item-name">JOIN</div>
          <div class="item-desc">Become a member to unlock the world’s rarest collection of Scotch whisky</div>
        </div>
        <div class="item">
          <img class="item-icon" src="@/assets/images/home/bottle.png" alt="" />
          <div class="item-name">SHOP</div>
          <div class="item-desc">Explore a diverse spectrum of one-of-a-kind whiskies suited to your own palate</div>
        </div>
        <div class="item">
          <img class="item-icon" src="@/assets/images/home/cup.png" alt="" />
          <div class="item-name">EXPERIENCE</div>
          <div class="item-desc">Taste through the exciting world of pure whisky in the comfort of your own home or at our exclusive tasting events</div>
        </div>
      </div>
    </div>

    <div class="story-box">
      <div class="theme-title">OUR STORY</div>
      <div class="video-box">
        <iframe
          src="https://www.youtube.com/embed/SKJBQgIaRP4"
          width="100%"
          height="100%"
          frameborder="0"
          allowfullscreen="true"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          oallowfullscreen="true"
          msallowfullscreen="true"
        />
      </div>
    </div>

    <div class="whisky-box">
      <div class="theme-title">OUR WHISKY</div>
      <div class="introduce flex">
        <div class="introduce-left">
          <div class="desc-box">
            <div class="name">ONE OF A KIND</div>
            <div class="text">No two casks will ever produce the same flavour so we've assigned a code and title to each to represent the unique tasting experience offered.</div>
          </div>
          <div class="desc-box">
            <div class="name">TASTING NOTES</div>
            <div class="text">Every bottle includes suggested tasting notes. Think of them as creative inspiration for your own flavour experience!</div>
          </div>
          <div class="desc-box">
            <div class="name">TRANSPARENCY</div>
            <div class="text">We’ve included everything you need to know about our whisky including the true age, origin, and type of cask(s) used for maturation.</div>
          </div>
        </div>
        <div class="introduce-middle">
          <img class="goods-icon" src="@/assets/images/home/goods_8.png" alt="" />
          <img class="line-icon" src="@/assets/images/home/goods_line.png" alt="" />
        </div>
        <div class="introduce-right">
          <div class="desc-box">
            <div class="name">EXCEPTIONALLY RARE</div>
            <div class="text">A Society cask will yield an average of just 200 bottles, making every whisky a true limited edition.</div>
          </div>
          <div class="desc-box">
            <div class="name">FLAVOUR PROFILE</div>
            <div class="text">Every Society whisky is categorized into one of twelve color-coded Flavour Profiles, making it easier to explore new styles,regions, and distilleries with confidence.</div>
          </div>
          <div class="desc-box">
            <div class="name">NATURAL STRENGTH</div>
            <div class="text">Society whisky is bottled at cask strength so that it can be enjoyed just as nature intended.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="society-box">
      <div class="theme-title">SOCIETY LIFE</div>
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
                <div class="about-info flex">{{ item.link }} <div class="iconfont icon-jiantou-you"></div></div>
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

    <div class="society-box member-box">
      <div class="theme-title">FROM OUR MEMBERS</div>
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
          <swiper-slide v-for="(item, idex) in data.lifeData2" :key="idex" class="swiper-slide-life">
            <div class="life-info">
              <div class="life-info-left">
                <div class="life-title">{{ item.title }}</div>
                <div class="desc">{{ item.desc }}</div>
                <div class="about-info member-about-box flex">{{ item.link }} <div class="iconfont icon-jiantou-you"></div></div>
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

import GoodsListSwiper from "@/components/goods-list-swpier/goodsListSwpier.vue";

import goodsImg0 from "@/assets/images/home/goods.png";
import goodsImg1 from "@/assets/images/home/goods_3.png";
import goodsImg2 from "@/assets/images/home/goods_4.png";
import goodsImg3 from "@/assets/images/home/goods_9.png";
import goodsImg4 from "@/assets/images/home/goods_5.png";
import goodsImg5 from "@/assets/images/home/goods_10.png";
import goodsImg6 from "@/assets/images/home/goods_7.png";
import goodsImg7 from "@/assets/images/home/goods_6.png";
import swiperImg1 from "@/assets/images/home/swiper_2.png";
import swiperImg2 from "@/assets/images/home/swiper_1.png";
import swiperImg3 from "@/assets/images/home/swiper_3.png";
import swiperImg4 from "@/assets/images/home/swiper_4.png";


const proxy: any = getCurrentInstance()?.proxy;

const route = useRoute();
const router = useRouter();
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
  goodsList: [
    {
      img: goodsImg0,
      title: 'BUNDLE',
      desc: 'EMBRACE THE EXTRAORDINARY',
      type: 0,
      color: '#c2c2c2',
    },
    {
      img: goodsImg1,
      title: 'CASK NO. 19.94',
      desc: 'THE ROSE CARDEN',
      type: 1,
      color: '#71307C',
    },
    {
      img: goodsImg2,
      title: 'CASK NO. 23.81',
      desc: 'FATBERG AHEAD!',
      type: 2,
      color: '#276B9A',
    },
    {
      img: goodsImg3,
      title: 'CASK NO. 39.271',
      desc: 'A CASK OF PLENTY',
      type: 3,
      color: '#60A8D3',
    },
    {
      img: goodsImg4,
      title: 'CASK NO. 44.145',
      desc: 'PILGRIMAGE TO ELROCIO',
      type: 4,
      color: '#E6782A',
    },
    {
      img: goodsImg5,
      title: 'CASK NO. 53.458',
      desc: 'TRULY A GEM',
      type: 5,
      color: '#74AF3E',
    },
    {
      img: goodsImg6,
      title: 'CASK NO. 55.82',
      desc: 'THE GATHERING STILLNESS',
      type: 6,
      color: '#F8AE53',
    },
    {
      img: goodsImg7,
      title: 'CASK NO. 60.32',
      desc: 'SPRINGTIME EXTRAVAGANZA',
      type: 7,
      color: '#D298C4',
    }
  ] as any,
  carouselTotal: 8,
  hover: false,
  swiperIndex: null,
  lifeData: [
    {
      title: 'A TRIP TO SCOTLAND WITH NEIL PATRICK HARRIS',
      desc: 'Fellow Society member Neil Patrick Harris takes a bucket-list trip to our spiritual home in Scotland. Read more about his unforgettable travels and an experience all Society members can look forward to.',
      link: 'READ MORE ABOUT IT',
      pic: swiperImg1
    },
    {
      title: 'SMWS takes home 10 medals from SFWSC!',
      desc: 'The Scotch Malt Whisky Society has claims a historic 10 medals at the 2023 San Francisco World Spirits Competition. All winning whiskies will be released to members this year.',
      link: 'See what got their attention',
      pic: swiperImg2
    },
    {
      title: 'SMWS takes home 10 medals from SFWSC!',
      desc: 'The Scotch Malt Whisky Society has claims a historic 10 medals at the 2023 San Francisco World Spirits Competition. All winning whiskies will be released to members this year.',
      link: 'See what got their attention',
      pic: swiperImg3
    },
    {
      title: 'SMWS takes home 10 medals from SFWSC!',
      desc: 'The Scotch Malt Whisky Society has claims a historic 10 medals at the 2023 San Francisco World Spirits Competition. All winning whiskies will be released to members this year.',
      link: 'See what got their attention',
      pic: swiperImg4
    }
  ] as any,
  lifeIndex: 0,
  lifeData2: [
    {
      title: '"The best way to get rare single malt Scotch"',
      desc: '– JEREMY SIERS',
      link: 'WATCH VIDEO',
      pic: swiperImg3
    },
    {
      title: '"They keep it fun, they keep it reverent, it’s awesome!"',
      desc: '– WHISKEY VAULT',
      link: 'WATCH VIDEO',
      pic: swiperImg4
    },
    {
      title: '"Once you put this ring on, you’re turning into Smeagol and you’re never getting out of it!"',
      desc: '– THE BOURBON JUNKIES',
      link: 'WATCH VIDEO',
      pic: swiperImg1
    },
    {
      title: '"The process is set up perfectly for someone to explore the intricacies of Scotch whisky. The quality is second to none."',
      desc: '– SCOTCH 4 DUMMIES',
      link: 'WATCH VIDEO',
      pic: swiperImg2
    }
  ] as any,
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

const handleJumpUrl = (pathName: string) => {
  router.push({
    name: pathName
  });
};
</script>

<style lang="scss" scoped>
.home-wrap {
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

  .swiper-goods-box {
    margin-top: 44px;

    .title-box {
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.54px;
      text-transform: uppercase;
      color: #2E2E2D;
      position: relative;

      .text-box {
        font-size: 54px;
        font-weight: 500;

        .text-bg {
          background: url("@/assets/images/home/logo_bg.png") no-repeat;
          background-size: 100%;
          width: 325px;
          height: 327px;
        }

        .text {
          position: absolute;
          left: 150px;
          font-family: 'Oswald-Medium';
        }
      }
      .more-text {
        display: flex;
        width: 182px;
        height: 64px;
        justify-content: center;
        align-items: center;
        font-size: 23px;
        font-weight: 600;
        border: 4px solid #000;
        position: absolute;
        right: 240px;
        top: 50%;
        transform: translateY(-50%);
        font-family: 'Oswald-Medium';
        cursor: pointer;

        .icon-jiantou-you {
          font-size: 18px;
          margin-left: 12px;
        }
      }
    }

    .swiper-box {
      position: relative;
      top: -57px;

      .custom-carousel-box {
        padding-left: 60px;
        box-sizing: border-box;
        padding-top: 60px;
        height: 560px;
      }

      .swiper-item, .swiper-slide {
        box-sizing: border-box;
        color: #2E2E2D;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: 0.36px;
        cursor: pointer;
        margin-right: 20px;
        width: 318px;

        .swiper-item-bg {
          background: #F2F2F2;
          width: 318px;
          height: 380px;
          padding: 0px 20px;
          box-sizing: border-box;

          .bg-img {
            width: 278px;
            height: 400px;
            position: relative;
            top: -40px;
            z-index: 9999;
          }
        }

        .title {
          margin-top: 18px;
          font-family: 'Oswald-Regular';
        }

        .desc {
          font-size: 30px;
          width: 318px;
          word-break: break-all;
          white-space: pre-wrap;
          font-family: 'Oswald-Medium';
          line-height: 33px;
          margin-top: 6px;
        }
      }
    }
  }

  .experience-box {
    background: url('@/assets/images/home/icon6.png') no-repeat;
    background-size: 100%;
    width: 100%;
    height: 983px;
    padding-top: 1px;

    .title {
      font-size: 82px;
      font-style: normal;
      font-weight: 500;
      line-height: 90px;
      letter-spacing: 0.82px;
      text-transform: uppercase;
      width: 590px;
      margin: 276px 0 0 100px;
      font-family: 'Oswald-Medium';
    }

    .little-title {
      color: #FFF;
      font-family: 'Georgia-Italic';
      font-size: 18px;
      font-style: italic;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.48px;
      margin: 35px 0 25px 100px;
    }

    .join-box {
      border: 2px solid #FFF;
      width: 245px;
      height: 64px;
      font-size: 23px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      padding: 0 24px;
      margin-right: 10px;
      cursor: pointer;
      font-family: 'Oswald-Regular';

      &:first-child {
        margin-left: 100px;
      }

      &:hover {
        background-color: #fff;
        color: #2E2E2D;
      }

      .icon-jiantou-you {
        font-size: 24px;
      }
    }
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
    font-family: 'Oswald-Medium'
  }

  .works {
    margin-top: 84px;

    .row-box {
      margin-top: 44px;
      align-items: flex-start;
      .item {
        flex: 1;
        text-align: center;

        &-icon {
          width: 115px;
          height: 115px;
        }

        &-name {
          color: #2E2E2D;
          text-align: center;
          font-size: 54px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          letter-spacing: 0.54px;
          text-transform: uppercase;
          font-family: 'Oswald-Medium';
          margin: 10px 0 10px;
        }

        &-desc {
          color: #2E2E2D;
          text-align: center;
          font-family: 'Georgia-Italic';
          font-size: 18px;
          font-style: italic;
          font-weight: 400;
          line-height: 24px;
          letter-spacing: 0.4px;
          padding: 12px 12px 0;
        }
      }
    }
  }

  .story-box {
    margin-top: 87px;

    .video-box {
      background: url('@/assets/images/home/story_bg.png') no-repeat;
      background-size: contain;
      width: 100%;
      height: 500px;
      padding: 25px 35px;
      box-sizing: border-box;
    }
  }

  .whisky-box {
    width: 100%;
    margin-top: 100px;

    .introduce {
      align-items: flex-start;
      margin-top: 64px;
      padding: 0 32px;
      box-sizing: border-box;

      .goods-icon {
        width: 213px;
      }

      .name {
        font-family: 'Oswald-Medium';
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.72px;
      }

      .desc-box {
        margin-top: 62px;

        &:first-child {
          margin-top: 128px;
        }
      }

      &-left, &-right {
        color: #2E2E2D;
        font-family: 'Georgia-Regular';
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 32px;
        letter-spacing: 0.4px;
        text-align: right;
        width: 40%;
      }

      &-right {
        text-align: left;
      }

      &-middle {
        position: relative;
        margin: 0 134px 0 114px;

        .line-icon {
          position: absolute;
          width: 456px;
          height: 453px;
          left: -112px;
          top: 160px;
        }
      }
    }
  }

  .society-box {
    background: #F2F2F2;
    padding: 120px 4.5% 120px 4.5%;
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
        font-size: 60px;
        font-style: normal;
        font-weight: 500;
        line-height: 64px;
        letter-spacing: 0.54px;
        text-transform: uppercase;
        width: 568px;

        .desc {
          font-family: 'Georgia-Regular';
          font-size: 20px;
          line-height: 32px;
          font-weight: 400;
          width: 568px;
          margin-top: 44px;
          text-transform: none;
        }

        .about-info {
          font-size: 20px;
          line-height: 23px;
          font-weight: 500;
          width: 36%;
          border-bottom: 3px solid #2E2E2D;
          margin-top: 36px;
          cursor: pointer;
          font-family: 'Oswald-Medium';

          .icon-jiantou-you {
            margin-left: 8px;
            color: #000;
          }
        }
      }

      .life-info-right {
        margin-left: 180px;

        img {
          width: 100%;
        }
      }

      .next-img {
        position: absolute;
        z-index: 9999;
        right: -600px;
        top: 58px;
        height: 475px;
      }
      
    }
  }

  .member-box {
    margin-top: 120px;

    .life-swiper-box {
      .life-info-left {
        color: #2E2E2D;
        font-family: 'Georgia-Italic';
        font-size: 60px;
        font-style: italic;
        font-weight: 400;
        line-height: 74px;
        letter-spacing: 0.48px;
        width: 568px;

        .life-title {
          text-transform: none;
        }

        .desc {
          font-family: 'Georgia-Regular';
          font-size: 22px;
          line-height: 32px;
          font-weight: 500;
          width: 568px;
          margin-top: 36px;
          text-transform: none;
        }

        .about-info {
          font-size: 20px;
          line-height: 23px;
          font-weight: 500;
          width: 26%;
          border-bottom: 3px solid #2E2E2D;
          margin-top: 36px;
          cursor: pointer;
        }
      }
    }

    
  }
}
</style>