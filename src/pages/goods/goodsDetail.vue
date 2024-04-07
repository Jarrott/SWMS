<template>
  <div class="goods-detail-page-wrap">
    <div class="single-info">
      <div class="single-info-left">

        <img class="new-icon" v-if="data.goodsDetailsInfo.isNew" src="@/assets/images/goods/new.png" alt="">

        <img class="right-icon" v-if="data.goodsDetailsInfo.isRightIcon" :src="data.goodsDetailsInfo.isRightIcon" alt="">
        <img class="sign-icon" v-if="data.goodsDetailsInfo.isSignIcon" :src="data.goodsDetailsInfo.isSignIcon" alt="">

        
        <template v-if="data.goodsDetailsInfo.type===1">
          <img v-if="data.goodsDetailsInfo.id===1" class="goods-img0" src="@/assets/images/goods/icon1.png" alt="">
          <img v-if="data.goodsDetailsInfo.id===2" class="goods-img0" src="@/assets/images/goods/icon1.png" alt="">
        </template>
        <template v-else>
          <img class="goods-img" :src="data.goodsDetailsInfo.img" alt="">
        </template>
        
      </div>
      <div class="single-info-right">
        <div class="no">{{ data.goodsDetailsInfo.no }}</div>
        <div class="title" :style="`color: ${data.goodsDetailsInfo.color};`">{{ data.goodsDetailsInfo.title }}</div>
        <div class="price flex">
          <span :style="`color: ${data.goodsDetailsInfo.color};`">{{ data.goodsDetailsInfo.price1 }}</span>
          <span class="unit">{{ data.goodsDetailsInfo.price2 }}</span>
        </div>


        <div class="btn-box flex">
          <div class="btn btn1 flex" v-if="data.goodsDetailsInfo.type===1">
            <span>ADD TO CART</span>
            <span class="iconfont icon-xiangyou"></span>
          </div>
          <template v-else>
            <div class="btn btn1 flex" 
            :style="[data.goodsDetailsInfo.hovered ? `border:1px solid ${data.goodsDetailsInfo.color};color: ${data.goodsDetailsInfo.color};background:#fff;`: `background: ${data.goodsDetailsInfo.color};border:1px solid ${data.goodsDetailsInfo.color};color:#fff;`]"
            @mouseover="data.goodsDetailsInfo.hovered = true"
            @mouseleave="data.goodsDetailsInfo.hovered = false"
            @click.stop="handleJump">
              <span>JOIN TODAY</span>
              <span class="iconfont icon-xiangyou" ></span>
            </div>

            <div class="btn btn2 flex"
            :style="[data.goodsDetailsInfo.hovered1 ? `background: ${data.goodsDetailsInfo.color};border:1px solid ${data.goodsDetailsInfo.color};color:#fff;` : `border:1px solid ${data.goodsDetailsInfo.color};color: ${data.goodsDetailsInfo.color};background:#fff;`]"
            @mouseover="data.goodsDetailsInfo.hovered1 = true"
            @mouseleave="data.goodsDetailsInfo.hovered1 = false">
              <span>SIGN IN</span>
              <span class="iconfont icon-xiangyou"></span>
            </div>
          </template>
        </div>

        <div class="info-row-box" v-if="data.goodsDetailsInfo.type!==1">
          <div class="row-item flex" v-show="data.goodsDetailsInfo.flavour">
            <span class="label">Flavour Profile:</span>
            <span class="value">{{ data.goodsDetailsInfo.flavour }}</span>
          </div>
          <div class="row-item flex">
            <span class="label">Spirit:</span>
            <span class="value">Armagnac</span>
          </div>
          <div class="row-item flex">
            <span class="label">age:</span>
            <span class="value">{{ data.goodsDetailsInfo.age }}</span>
          </div>
          <div class="row-item flex">
            <span class="label">Region:</span>
            <span class="value">{{ data.goodsDetailsInfo.region }}</span>
          </div>
          <div class="row-item flex">
            <span class="label">Cask:</span>
            <span class="value">{{ data.goodsDetailsInfo.cask }}</span>
          </div>
          <div class="row-item flex">
            <span class="label">ABV:</span>
            <span class="value">60.4%</span>
          </div>
           <div class="row-item flex">
            <span class="label">VOL:</span>
            <span class="value">700mL</span>
          </div>
        </div>
      </div>
    </div>

    <div class="notes-box">
      <div class="title">Notes</div>
      <div class="">
        A glorious aroma, riddled with classic aged Armagnac characteristics in beautiful harmony. Corinthian raisins, hessian, old style rancio, pipe
        tobacco, apricot jam, and fig chutney. Everything in its place and perfectly balanced. With water we got orange cocktail bitters, aniseed, red
        liquorice, strawberry wine, and old leather books. The palate was initially surprisingly rich and spicy with dark grained breads, rye spice,
        wormwood, long aged balsamic and menthol pipe tobaccos. Reduction brought blood orange marmalade, mint jelly, Darjeeling tea, toasted
        fennel seed and wood spices like cinnamon and clove. A long, lingering and wonderfully complex finish followed on...
        <br/> <br/>
        Grape Variety: Colombard
        <br/>
        USA Allocation: 96 bottles
      </div>
    </div>

    <div class="other-goods-box">
      <div class="title">
        <img src="@/assets/images/home/logo_bg.png" alt="">
        <span>you may also like</span>
      </div>
      <div class="goods-list-swiper-box">
        <GoodsListSwiper></GoodsListSwiper>
      </div>
    </div>

  </div>
</template>
<script lang="ts" setup>
import GoodsListSwiper from "@/components/goods-list-swpier/goodsListSwpier.vue";

import goods_2 from "@/assets/images/goods/goods_2.png";
import goods_3 from "@/assets/images/goods/goods_3.png";
import goods_4 from "@/assets/images/goods/goods_4.png";
import goods_5 from "@/assets/images/goods/goods_5.png";
import goods_6 from "@/assets/images/goods/goods_6.png";
import goods_7 from "@/assets/images/goods/goods_7.png";
import goods_8 from "@/assets/images/goods/goods_8.png";
import goods_9 from "@/assets/images/goods/goods_9.png";
import goods_10 from "@/assets/images/goods/goods_10.png";
import goods_11 from "@/assets/images/goods/goods_11.png";
import goods_12 from "@/assets/images/goods/goods_12.png";
import goods_13 from "@/assets/images/goods/goods_13.png";
import goods_14 from "@/assets/images/goods/goods_14.png";
import goods_15 from "@/assets/images/goods/goods_15.png";
import goods_16 from "@/assets/images/goods/goods_16.png";
import goods_17 from "@/assets/images/goods/goods_17.png";

import goods_icon_5 from "@/assets/images/goods/goods_icon_5.png";
import goods_icon_8 from "@/assets/images/goods/goods_icon_8.png";
import goods_icon_9 from "@/assets/images/goods/goods_icon_9.png";
import goods_icon_10 from "@/assets/images/goods/goods_icon_10.png";
import goods_icon_11 from "@/assets/images/goods/goods_icon_11.png";
import goods_icon_12 from "@/assets/images/goods/goods_icon_12.png";
import goods_icon_13 from "@/assets/images/goods/goods_icon_13.png";
import goods_icon_16 from "@/assets/images/goods/goods_icon_16.png";
import goods_icon_17 from "@/assets/images/goods/goods_icon_17.png";

import goods_sign_13 from "@/assets/images/goods/goods_sign_13.png";
import goods_sign_17 from "@/assets/images/goods/goods_sign_17.png";

const router = useRouter();
const route = useRoute();

const {
  query: { id },
} = route;

const data = reactive({
  tagsList: ['Old & dignified', 'Oily & coastal', 'Deep rich & dried fruits'] as any,
  express: 16,
  drawerFilter: false,
  goodsListData: [
    {
      img: '',
      no: 'GIFT',
      title: 'GIFT MEMBERSHIP',
      type: 1,
      color: '#2E2E2D',
      hovered: false,
      hovered1: false,
      id: 1,
    },
    {
      img: '',
      no: 'GIFT',
      title: 'GIFT CARD',
      type: 1,
      color: '#2E2E2D',
      hovered: false,
      hovered1: false,
      id: 2,
    },
    {
      img: goods_2,
      no: 'CASK NO. 4.294',
      title: 'AN AURA OF RESPECTABILITY',
      type: 2,
      flavour: 'Lightly Peated',
      age: '18 years',
      region: 'Highland, Island',
      cask: 'First Fill Pedro Ximenez barrique STR',
      price1: '$325',
      price2: '41 left',
      color: '#BDD78D',
      hovered: false,
      hovered1: false,
      id: 3,
    },
    {
      img: goods_3,
      no: 'CASK NO. 4.303',
      title: 'A nocturne sipper',
      type: 2,
      flavour: 'Oily & Coastal',
      age: '16 years',
      region: 'Highland, Island',
      cask: 'First Fill Pedro Ximenez barrique STR',
      price1: '$250',
      price2: '56 left',
      color: '#276B9A',
      isNew: true,
      hovered: false,
      hovered1: false,
      id: 4,
    },
    {
      img: goods_4,
      no: 'CASK NO. 6.69',
      title: 'Tyrant, show thy face!',
      type: 2,
      flavour: 'Spicy & Sweet',
      age: '10 years',
      region: 'Highland Southern',
      cask: 'Second-fill Sherry butt',
      price1: '$125',
      price2: '58 left',
      color: '#71307C',
      hovered: false,
      hovered1: false,
      id: 5,
    },
    {
      img: goods_5,
      no: 'CASK NO. 9.291',
      title: 'Roll on a happy hay bale',
      type: 2,
      flavour: 'Oily & Coastal',
      age: '20 years',
      region: 'Speyside Spey',
      cask: 'First-fill barrel',
      price1: '$290',
      price2: '36 left',
      color: '#AC599E',
      isNew: true,
      isRightIcon: goods_icon_5,
      hovered: false,
      hovered1: false,
      id: 6,
    },
    {
      img: goods_6,
      no: 'CASK NO. 12.80',
      title: 'Heaven in a leather hammock',
      type: 2,
      flavour: 'Spicy & Dry',
      age: '34 years',
      region: 'Speyside, Lossie',
      cask: 'First-fill Spanish oak Pedro Ximenez butt',
      price1: '$1,195',
      price2: '13 left',
      color: '#F8AE53',
      hovered: false,
      hovered1: false,
      id: 7,
    },
    {
      img: goods_7,
      no: 'CASK NO. 6.69',
      title: 'The rose garden',
      type: 2,
      flavour: 'Spicy & Sweet',
      age: '19 years',
      region: 'Highland Eastern',
      cask: 'First-fill barrel',
      price1: '$240',
      price2: '40 left',
      color: '#71307C',
      hovered: false,
      hovered1: false,
      id: 8,
    },
    {
      img: goods_8,
      no: 'CASK NO. 35.331',
      title: 'Ultra hoggie',
      type: 2,
      flavour: 'Spicy & Sweet',
      age: '27 years',
      region: 'Speyside, Lossie',
      cask: 'First-fill toasted oak hogshead',
      price1: '$445',
      price2: '27 left',
      color: '#BC3434',
      isRightIcon: goods_icon_8,
      hovered: false,
      hovered1: false,
      id: 9,
    },
    {
      img: goods_9,
      no: 'CASK NO. 53.430',
      title: "Doesn't hold back",
      type: 2,
      flavour: 'Peated',
      age: '10 years',
      region: 'Islay',
      cask: 'Refill hogshead',
      price1: '$150',
      price2: '78 left',
      color: '#74AF3E',
      isNew: true,
      isRightIcon: goods_icon_9,
      hovered: false,
      hovered1: false,
      id: 10,
    },
    {
      img: goods_10,
      no: 'CASK NO. 146.2',
      title: "Join the great tumult",
      type: 2,
      flavour: 'Spicy & Sweet',
      age: '6 years',
      region: 'England',
      cask: 'First-fill barrique, shaved/toasted/re-charred',
      price1: '$145',
      price2: '44 left',
      color: '#71307C',
      isRightIcon: goods_icon_10,
      hovered: false,
      hovered1: false,
      id: 11,
    },
    {
      img: goods_11,
      no: 'CASK NO. G8.27',
      title: "Looks good in leather",
      type: 2,
      flavour: 'Spicy & Dry',
      age: '32 years',
      region: 'Lowland',
      cask: 'First-fill barrel',
      price1: '$295',
      price2: '31 left',
      color: '#F8AE53',
      isNew: true,
      isRightIcon: goods_icon_11,
      hovered: false,
      hovered1: false,
      id: 12,
    },
    {
      img: goods_12,
      no: 'CASK NO. 41.176',
      title: "Baristaliscious",
      type: 2,
      flavour: 'Juicy Oak & Vanilla',
      age: '17 years',
      region: 'Speyside Spey',
      cask: 'First-fill Chinkapin oak barrel, HTMC',
      price1: '$185',
      price2: '4 left',
      color: '#60A8D3',
      isRightIcon: goods_icon_12,
      hovered: false,
      hovered1: false,
      id: 13,
    },
    {
      img: goods_13,
      no: 'CASK NO. 44.145',
      title: "Pilgrimage to El Rocio",
      type: 2,
      flavour: 'Deep Rich & Dried Fruits',
      age: '13 years',
      region: 'Speyside Spey',
      cask: 'First-fill American oak Pedro Ximenez hogshead',
      price1: '$155',
      price2: '14 left',
      color: '#E6782A',
      isRightIcon: goods_icon_13,
      isSignIcon: goods_sign_13,
      hovered: false,
      hovered1: false,
      id: 14,
    },
    {
      img: goods_14,
      no: 'BUNDLE',
      title: "March into Spring!",
      type: 3,
      flavour: "Deep Rich & Dried Fruits,Juicy Oak & Vanilla,Spicy & Sweet",
      age: '8 years, 10 years, 16 years',
      region: 'Speyside, Highland, Speyside',
      cask: 'First-fill barrel, Second-fill Sherry butt, First-fill Chinkapin oak barrel HTMC',
      desc: 'Our March into Spring! bundle is sure to stoke some cask-strength conversation with a trio of tantalizing malts, each representing a unique flavour profile in indyllic fashion. Kick off the season right with this first-class flight!',
      price1: '$375',
      price2: '16 left',
      color: '#2E2E2D',
      isNew: true,
      hovered: false,
      hovered1: false,
      id: 15,
    },
    {
      img: goods_15,
      no: 'BUNDLE',
      title: "Embrace the Extraordinary",
      type: 3,
      desc: 'Embrace the extraordinary when discovering these unique Society casks from the Speyside and Highlands! This selection provides a rare opportunity to learn about the nuances between varied oak protocols.',
      price1: '$645',
      price2: '14 left',
      color: '#2E2E2D',
      hovered: false,
      hovered1: false,
      id: 16,
    },
    {
      img: goods_16,
      no: 'BUNDLE',
      title: "International Women’s Day Duo",
      type: 3,
      desc: 'Celebrate International Women’s Day with two extraordinary casks chosen by an all-female tasting panel! In celebration of last year’s International Women’s Day, this tasting panel of exceptional palates carefully selected a handful of different casks for this year’s celebration. Today, a remarkable duo of 20-year-old malts is ready for your collection!',
      price1: '$560',
      price2: '36 left',
      color: '#2E2E2D',
      isNew: true,
      isRightIcon: goods_icon_16,
      hovered: false,
      hovered1: false,
      id: 17,
    },
    {
      img: goods_17,
      no: 'CASK NO. B7.13',
      title: "C’est si bon!",
      type: 2,
      flavour: 'Bourbon',
      age: '4 years',
      region: 'Indiana, USA',
      cask: 'First-fill American oak #4 charred barrel, #2 charred heads',
      price1: '$65',
      price2: '32 left',
      color: '#202448',
      isRightIcon: goods_icon_17,
      isSignIcon: goods_sign_17,
      hovered: false,
      hovered1: false,
      id: 18,
    }
  ] as any,
  goodsDetailsInfo: {} as any,
});

const handleJump = () => {
  router.push({
    name: 'cart'
  })
};

if (id) {
  data.goodsListData.map((item: any) => {
    if (item.id == id) {
      data.goodsDetailsInfo = item;
    }
  })
}

onMounted(() => {
  
});
onUnmounted(() => {
  
});
</script>

<style lang="scss" scoped>
.goods-detail-page-wrap {
  padding: 0 4.5%;
  box-sizing: border-box;
  font-style: normal;
  font-family: 'Oswald-Medium';
  flex-shrink: 0;
  color: #2E2E2D;

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

  .single-info {
    display: flex;
    margin-top: 100px;

    &-left {
      width: 736px;
      height: 736px;
      text-align: center;
      margin-left: 114px;
      margin-right: 128px;
      position: relative;
      border: 1px solid #C1C1C1;
      box-sizing: border-box;

      .goods-img{
        // width: 196px;
        height: 780px;
        position: relative;
        top: -40px;
      }

      .goods-img0 {
        width: 587px;
      }

      .new-icon {
        position: absolute;
        top: 20px;
        left: -1px;
        width: 75px;
      }

      .right-icon {
        width: 80px;
        height: 80px;
        position: absolute;
        top: 20px;
        right: 16px;
      }

      .sign-icon {
        width: 80px;
        height: 80px;
        position: absolute;
        top: 114px;
        right: 16px;
      }
    }

    &-right {
      font-size: 20px;
      font-weight: 500;
      line-height: 30px;
      letter-spacing: 2px;
      text-transform: uppercase;
      width: calc(100% - 978px);

      .title {
        font-size: 54px;
        line-height: 60px;
        letter-spacing: 0.54px;
        margin-top: 8px;
      }

      .price {
        font-size: 46px;
        line-height: 50px;
        letter-spacing: 0.46px;
        justify-content: space-between;
        margin: 40px 0 50px;

        .unit {
          font-size: 25px;
        }
      }

      .btn-box {
        width: 100%;

        .btn {
          width: 50%;
          border: 1px solid #2E2E2D;
          height: 64px;
          line-height: 64px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Oswald-Medium';
          justify-content: space-between;
          box-sizing: border-box;
          padding: 0 20px;
          cursor: pointer;
          font-size: 23px;
          font-weight: 600;
          letter-spacing: 0.4px;

          .icon-xiangyou {
            font-size: 22px;
          }

          &.btn1 {
            background: #2E2E2D;
            color: #fff;
            margin-right: 20px;
          }

          &.btn1:hover {
            background: #fff;
            color: #2E2E2D;

            .icon-xiangyou {
              transform: translate(5px);
              transition: all .2s linear;
            }
          }

          &.btn2:hover {
            .icon-xiangyou {
              transform: translate(5px);
              transition: all .2s linear;
            }
          }
        }
      }

      .info-row-box {
        margin-top: 60px;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 30px;
        letter-spacing: 0.4px;
        width: 100%;

        .row-item {
          padding: 6px 0;
          width: 100%;
          border-bottom: 1px solid #707070;
          box-sizing: border-box;

          &:first-child {
            border-top: 1px solid #707070;
          }

          span{
            flex: 1;
          }

          .value {
            text-transform: capitalize;
            font-family: 'Oswald-Regular';
          }
        }
      }
    }
  }

  .notes-box {
    font-family: 'Georgia-Regular';
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: 0.4px;
    margin-top: 98px;
    box-sizing: border-box;
    padding-left: 228px;

    .title {
      font-size: 54px;
      line-height: 60px;
      letter-spacing: 0.54px;
      text-transform: uppercase;
      margin-bottom: 36px;
    }
  }

  .other-goods-box {
    margin-top: 120px;

    .title {
      color: #2E2E2D;
      font-size: 54px;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.54px;
      text-transform: uppercase;
      position: relative;
      height: 327px;
      line-height: 327px;
      padding-left: 150px;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 325px;
        height: 327px;
      }
    }

  }
  
}
</style>