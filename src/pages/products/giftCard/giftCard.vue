<template>
  <div class="goods-detail-page-wrap">
    <div class="single-info">
      <div class="single-info-left">
        <img class="goods-img0" src="@/assets/images/goods/icon2.png" alt="">
      </div>
      <div class="single-info-right">
        <div class="no">GIFT</div>
        <div class="title">{{ 'GIFT CARD' }}</div>
        <div class="btn-box flex">
          <div class="select-box">
            <el-select v-model="data.giftValue" class="gift-select" placeholder="请选择">
              <el-option
                v-for="item in data.giftOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="btn btn1 flex">
            <span>ADD TO CART</span>
            <span class="iconfont icon-xiangyou"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="notes-box">
      <div class="title">Notes</div>
      <div class="">
        Shopping for someone else but not sure what to give them? Give them the gift of choice with a The Scotch Malt Whisky gift card!
        <br/> <br/>
        Gift cards are delivered to purchaser by email, so you can forward the email to the intended recipient or print it out and give it to them. They will have a unique code that can be used at check out while valid. 
        <br/><br/>
        Please note: the gift card is only valid towards non-membership products, and membership is required to order from the shop. For more information about memberships, please visit the Join page.
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

const router = useRouter();
const route = useRoute();

const {
  query: { id },
} = route;

const data = reactive({
  goodsDetailsInfo: {} as any,
  giftValue: '150',
  giftOptions: [
    {
      value: '150',
      label: '$150.00'
    },
    {
      value: '50',
      label: '$50.00'
    },
    {
      value: '75',
      label: '$75.00'
    },
    {
      value: '100',
      label: '$100.00'
    },
    {
      value: '200',
      label: '$200.00'
    },
    {
      value: '300',
      label: '$300.00'
    },
    {
      value: '500',
      label: '$500.00'
    },
    {
      value: '1000',
      label: '$1000.00'
    },
    {
      value: '50',
      label: '$50.00'
    }
  ] as any,
});

const handleJump = () => {
  router.push({
    name: 'cart'
  })
};

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
      height: 580px;
      text-align: center;
      margin-left: 114px;
      margin-right: 128px;
      position: relative;
      border: 1px solid #C1C1C1;
      box-sizing: border-box;

      .goods-img0 {
        width: 532px;
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

      .btn-box {
        width: 100%;
        margin-top: 60px;

        .select-box {
           width: 50%;
           margin-right: 32px;
           height: 64px;
        }

        .gift-select {
          height: 64px;
          background: #f2f2f2;
          border: 0;

          :deep(.el-select__wrapper) {
            height: 64px;
            background: #f2f2f2;
            font-size: 23px;
            font-weight: 600;
            color: rgba(0,0,0,.25);
          }

          :deep(.el-select__placeholder) {
            color: rgba(0,0,0,.25);
          }
        }

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