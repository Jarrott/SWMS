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
          <span :style="`color: ${data.goodsDetailsInfo.color};`">${{ data.goodsDetailsInfo.price1 }}</span>
          <span class="unit">{{ data.goodsDetailsInfo.price2 }} left</span>
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
            @click.stop="handleAddCart">
              <!-- <span>JOIN TODAY</span> -->
              <span>ADD TO CART</span>
              <span class="iconfont icon-xiangyou" ></span>
            </div>

            <div class="btn btn2 flex"
            :style="[data.goodsDetailsInfo.hovered1 ? `background: ${data.goodsDetailsInfo.color};border:1px solid ${data.goodsDetailsInfo.color};color:#fff;` : `border:1px solid ${data.goodsDetailsInfo.color};color: ${data.goodsDetailsInfo.color};background:#fff;`]"
            @mouseover="data.goodsDetailsInfo.hovered1 = true"
            @mouseleave="data.goodsDetailsInfo.hovered1 = false"
            @click.stop="handleLogin">
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
import { GOOD_LIST } from "@/utils/simulatedData";
import {cartGoodsStore} from '@/store/cart';
const cartStore = cartGoodsStore();
import {useUserStore} from '@/store/user';
const useStore = useUserStore();

const router = useRouter();
const route = useRoute();

const {
  query: { id },
} = route;

const data = reactive({
  tagsList: ['Old & dignified', 'Oily & coastal', 'Deep rich & dried fruits'] as any,
  express: 16,
  drawerFilter: false,
  goodsListData: GOOD_LIST as any,
  goodsDetailsInfo: {} as any,
});

// 加入购物车
const handleAddCart = () => {
  // let num = cartStore.cartNum;
  // let token = useStore.userInfo
  // console.log(token, 'token');
  // console.log(num, 'num');
  cartStore.$patch((state: any) => {
    state.carGoodsList.push(data.goodsDetailsInfo);
  })
  
  setTimeout(() => {
    router.push({
      name: 'cart'
    })
  }, 500);
};

const handleLogin = () => {
  router.push({
    name: 'login'
  })
}

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
            font-size: 28px;
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
              transform: translate(10px);
              transition: all .2s linear;
            }
          }

          &.btn2:hover {
            .icon-xiangyou {
              transform: translate(10px);
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
      font-family: 'Oswald-Medium';
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