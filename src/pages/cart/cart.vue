<template>
  <div class="cart-page-wrap">
    <div class="cart-box">
      <div class="title flex">
        <span>Cart</span>
        <span class="shop" @click="handleJump">Continue Shopping</span>
      </div>
      <div class="table-title flex">
        <div class="table-title-1">product</div>
        <div class="table-title-2">price</div>
        <div class="table-title-3">quantity</div>
        <div class="table-title-4">total</div>
      </div>

      <template v-if="data.cartList.length > 0">
        <div class="table-box">
          <div class="table-row" v-for="(item, index) in data.cartList" :key="index">
            <div class="product-box">
              <div class="imgbox">
                <!-- <img v-if="index===0" src="@/assets/images/home/vector.png" alt="" />
                <img v-else src="@/assets/images/goods/goods_2.png" alt="" /> -->
                <img :src="item.img" alt="" />
              </div>
              <div class="title">{{ item.title }}</div>
            </div>
            <div class="price-box">${{ item.price1 }}</div>
            <div class="quantity-box">
              <el-input-number v-model="item.productNum" @change="handleChange(item)" :min="1" :max="9999"></el-input-number>
            </div>
            <div class="total-box">
              <div>${{ (Number(item.price1) * item.productNum).toFixed(2) }}</div>
              <div class="remove" @click.stop="handleRemoveItem(item, index)">remove</div>
            </div>
          </div>
        </div>
        
        <div class="other-info">
          <div class="other-info-left">
            <div class="name">ORDER/GIFT NOTES</div>
            <el-input
              type="textarea"
              v-model="data.remarks"
              maxlength="200"
              :rows="5"
            >
            </el-input>
          </div>
          <div class="other-info-right">
            <div class="totle-price">${{ actualMoneyComputed }}</div>
            <div class="desc">
              Shipping and taxes calculated at checkout
              Please note, these items are not reserved until 
              your order has been completed.
            </div>
            <div class="agree">
              <el-checkbox v-model="data.checked"></el-checkbox>
              <span>I AGREE WITH THE </span>
              <span class="text">TERMS AND CONDITIONS.</span>
            </div>
            <div class="error-text" v-if="data.isError">You must agree to the terms and conditions.</div>
            <div class="flex">
              <!-- <div class="btn updateBtn" :class="data.checked?'':'disabled-btn'" @click="handleUpdate">
                <span>update cart</span>
                <span class="iconfont icon-xiangyou"></span>
              </div> -->
              <div class="btn flex translate-btn" @click="handleCheckout">
                <span>checkout</span>
                <span class="iconfont icon-xiangyou"></span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div class="no-data-box" v-else>
        <div class="iconfont icon-zanwushuju"></div>
        <div class="no-text">There is currently no data available</div>
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
import {cartGoodsStore} from '@/store/cart';
const cartStore = cartGoodsStore();

const router = useRouter();

const data = reactive({
  checked: false,
  remarks: '',
  actualAccountsMoney: 0, // 实际收
  cartList: [
    {
      productName: 'smws membership',
      productPrice: 99,
      productNum: 1,
      productTotal: 99.00,
      id: 1,
    },
    {
      productName: 'gift card',
      productPrice: 150,
      productNum: 1,
      productTotal: 99.00,
      id: 2,
    }
  ] as any,
  isError: false,
});

// 合计
const actualMoneyComputed = computed(() => {
  let total: any = 0;
  if (data.cartList.length > 0) {
    data.cartList.map((item: any) => {
      total += Number(item.price1) * item.productNum;
    });
    return total.toFixed(2);
  }
  return '0.00';
});

// 商品价格计算
const handleChange = (item: any) => {
  // item.price1 = (item.productNum * Number(item.price1));
};

// 单个商品删除
const handleRemoveItem = (item: any, index: number) => {
  ElMessageBox.confirm('Are you sure you want to delete it', 'Tip', {
    confirmButtonText: 'confirm',
    cancelButtonText: 'cancel',
    type: 'warning',
  }).then(() => {
    // data.cartList.splice(index, 1);
    cartStore.$patch((state: any) => {
      state.carGoodsList = [];
    })
  });

};

// 更新购物车
const handleUpdate = () => {
  if (!data.checked) {
    return
  }
};

const handleCheckout = () => {
  if (!data.checked) {
    data.isError = true;
    return
  }
  data.isError = false;
  if (window.localStorage.getItem('token')) {
    // 进行订单流程
  } else {
    router.push({
      name: 'checkout', // createAccount
    });
  }
}

const handleJump = () => {
  router.push({
    name: 'goodsList',
  });
};
onMounted(() => {
  data.cartList = cartStore.carGoodsList;
  console.log('data.cartList', data.cartList);
  
});
</script>

<style lang="scss" scoped>
.cart-page-wrap {
  padding: 0 4.5%;
  box-sizing: border-box;
  font-style: normal;
  font-weight: 500;
  font-family: 'Oswald-Medium';
  color: #2E2E2D;

  :deep(.el-checkbox__input) {
    margin-right: 6px;

    .el-checkbox__inner {
      width: 16px;
      height: 16px;
      border: 1px solid #000;
      font-size: 89px;
    }

    &.is-checked .el-checkbox__inner {
      background-color: #F7F7F7;
    }

    .el-checkbox__inner::after {
      border: 3px solid #000;
      border-left: 0;
      border-top: 0;
      left: 5px;
      top: 2px;
    }

  }

  .cart-box {
    padding: 120px 174px 0;

    .title {
      font-size: 54px;
      line-height: 60px;
      letter-spacing: 0.54px;
      text-transform: uppercase;
      justify-content: space-between;

      .shop {
        font-family: 'Georgia-Regular';
        font-size: 20px;
        font-weight: 400;
        line-height: 32px;
        letter-spacing: 0.4px;
        text-decoration-line: underline;
        text-transform: capitalize;
        cursor: pointer;
      }
    }

    .table-title {
      font-size: 15px;
      font-weight: 500;
      line-height: normal;
      text-transform: uppercase;
      margin-top: 42px;
      justify-content: space-between;
      border-bottom: 1px solid #707070;
      padding-bottom: 5px;
      box-sizing: border-box;

      &-1 {
        width: 50%;
      }
      &-2 {
        width: 10%;
      }
      &-3 {
        width: 30%;
        padding-left: 100px;
        box-sizing: border-box;
      }
      &-4 {
        width: 10%;
        text-align: right;
      }
    }

    .table-box {
      .table-row {
        height: 182px;
        display: flex;
        padding: 10px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #707070;

        .product-box {
          display: flex;
          width: 50%;

          .imgbox {
            width: 160px;
            height: 160px;
            margin-right: 42px;
            text-align: center;
            background-color: #F2F2F2;
          }

          img {
            margin-top: 10px;
            height: 140px;
          }

          .title {
            margin-top: 18px;
            font-size: 26px;
            font-weight: 400;
            line-height: 30px;
            letter-spacing: 1px;
            text-decoration-line: underline;
            text-transform: uppercase;
            cursor: pointer;
          }
        }

        .price-box {
          font-size: 26px;
          font-weight: 400;
          line-height: 30px;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-top: 18px;
          width: 10%;
        }

        .quantity-box {
          margin-top: 18px;
          font-size: 13px;
          font-weight: 400;
          line-height: 22px;
          width: 30%;
          padding-left: 100px;
          box-sizing: border-box;
        }

        .total-box {
          margin-top: 18px;
          font-size: 26px;
          font-weight: 400;
          line-height: 30px;
          letter-spacing: 1px;
          text-transform: uppercase;
          width: 10%;
          text-align: right;

          .remove {
            font-family: 'Oswald-Regular';
            font-size: 20px;
            font-style: normal;
            font-weight: 300;
            line-height: 30px;
            letter-spacing: 1px;
            text-decoration-line: underline;
            text-transform: capitalize;
            margin-top: 62px;
            cursor: pointer;
          }
        }
      }
    }

    .other-info {
      display: flex;
      justify-content: space-between;

      &-left {
        width: 40%;

        .name {
          margin-bottom: 12px;
          font-size: 15px;
          font-weight: 500;
          line-height: normal;
          text-transform: uppercase;
          margin-top: 72px;
        }
      }

      &-right {
        .totle-price {
          font-size: 26px;
          font-weight: 400;
          line-height: 30px;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-top: 64px;
          text-align: right;
        }

        .desc {
          width: 354px;
          font-family: 'Georgia-Italic';
          font-size: 16px;
          font-style: italic;
          font-weight: 400;
          line-height: 26px;
          letter-spacing: 0.48px;
          margin-top: 24px;
          text-align: right;
        }

        .agree {
          font-size: 16px;
          font-weight: 400;
          letter-spacing: 0.3px;
          text-transform: capitalize;
          margin-top: 24px;
          text-align: right;

          .text {
            letter-spacing: 0.3px;
            text-decoration-line: underline;
          }
        }

        .error-text {
          text-align: right;
          color: #F00;
          font-family: 'Georgia-Regular';
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: 0.4px;
        }

        .btn {
          width: 218px;
          height: 64px;
          text-align: center;
          line-height: 64px;
          border: 4px solid #000;
          font-size: 23px;
          font-weight: 600;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          margin-top: 64px;
          position: relative;
          right: -124px;
          cursor: pointer;
          justify-content: center;

          &:hover {
            background-color: #000;
            color: #fff;
          }

          .icon-xiangyou {
            font-size: 26px;
            margin-left: 4px;
          }

          &.updateBtn {
            margin-right: 12px;
          }
        }

        .disabled-btn {
          border: 1px solid rgba(0,0,0,.25);
          pointer-events: none;
          color: rgba(0,0,0,.25);
        }
      }
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
        font-size: 20px;
      }

      &:hover {
        background: #000;
      }
    }

  }
  
  .no-data-box {
    text-align: center;

    .icon-zanwushuju {
      font-size: 220px;
    }

    .no-text {
      font-size: 32px;
      font-weight: 500;
    }
  }
}
</style>
