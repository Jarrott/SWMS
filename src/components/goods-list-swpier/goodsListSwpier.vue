<template>
  <div class="goods-list-swiper-content">
    <div class="swiper-box">
      <swiper
        ref="interSwiper"
        navigation
        :modules="modules.modules"
        :loop="false"
        :slides-per-view="5"
        :space-between="20"
        :scrollbar="{ draggable: false }"
        class="custom-carousel-box">
        <swiper-slide v-for="(item, index) in data.goodsList" :key="index" class="swiper-slide">
          <div class="swiper-item" @click.stop="handleJumpDetails(item.id)">
            <div class="swiper-item-bg" :style="{ backgroundColor: data.hover&&data.swiperIndex===index ? item.color : '' }" @mouseover="data.hover = true;data.swiperIndex=index;" @mouseleave="data.hover = false">
              <img class="bg-img" :src="item.img" alt="" />
            </div>
            <div class="goods-info">
              <div class="title">{{ item.title }}</div>
              <div class="desc" v-if="index===0">{{ item.desc }}</div>
              <div class="desc" v-else :style="`color: ${item.color};}`">{{ item.desc }}</div>
            </div>
          </div>
        </swiper-slide>

        <!-- <div class="swiper-button-prev swiper-button-left">
          <div class="iconfont icon-jiantouzuo"></div>
        </div>

        <div class="swiper-button-next swiper-button-right">
          <div class="iconfont icon-jiantou-you"></div>
        </div> -->
        
      </swiper>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {Swiper, SwiperSlide} from 'swiper/vue'; // swiper所需组件
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import goodsImg0 from "@/assets/images/home/goods.png";
import goodsImg1 from "@/assets/images/home/goods_3.png";
import goodsImg2 from "@/assets/images/home/goods_4.png";
import goodsImg3 from "@/assets/images/home/goods_9.png";
import goodsImg4 from "@/assets/images/home/goods_5.png";
import goodsImg5 from "@/assets/images/home/goods_10.png";
import goodsImg6 from "@/assets/images/home/goods_7.png";
import goodsImg7 from "@/assets/images/home/goods_6.png";

interface Props {
  list?: any; // 轮播数据
}
const prop = withDefaults(defineProps<Props>(), {
  list: [] as any,
});

// 在modules加入要使用的模块
const modules = reactive({
  modules: [Navigation]
});

const router = useRouter();
const route = useRoute();

const data = reactive({
  goodsList: [
    {
      img: goodsImg0,
      title: 'BUNDLE',
      desc: 'EMBRACE THE EXTRAORDINARY',
      type: 0,
      color: '#c2c2c2',
      id: 15,
    },
    {
      img: goodsImg1,
      title: 'CASK NO. 19.94',
      desc: 'THE ROSE CARDEN',
      type: 1,
      color: '#71307C',
      id: 4,
    },
    {
      img: goodsImg2,
      title: 'CASK NO. 23.81',
      desc: 'FATBERG AHEAD!',
      type: 2,
      color: '#276B9A',
      id: 3,
    },
    {
      img: goodsImg3,
      title: 'CASK NO. 39.271',
      desc: 'A CASK OF PLENTY',
      type: 3,
      color: '#60A8D3',
      id: 12,
    },
    {
      img: goodsImg4,
      title: 'CASK NO. 44.145',
      desc: 'PILGRIMAGE TO ELROCIO',
      type: 4,
      color: '#E6782A',
      id: 13,
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
      id: 1,
    },
    {
      img: goodsImg7,
      title: 'CASK NO. 60.32',
      desc: 'SPRINGTIME EXTRAVAGANZA',
      type: 7,
      color: '#D298C4',
      id: 5,
    }
  ] as any,
});

watch(
  () => route,
  () => {
  },
  { immediate: true, deep: true }
);


const handleJumpDetails = (id: number) => {
  router.push({
    name: 'goodsDetail',
    query: {
      id
    }
  })
}
</script>
<style lang="scss" scoped>
.goods-list-swiper-content {
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
</style>

