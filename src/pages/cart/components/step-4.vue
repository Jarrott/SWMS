<template>
  <div class="cart-page-wrap">
    <div class="cart-box">
      <div class="table-title flex">
        <div class="table-title-1">product</div>
        <div class="table-title-2">price</div>
        <div class="table-title-4">quantity</div>
      </div>

      <div class="table-box">
        <div class="table-row" v-for="(item, index) in data.cartList" :key="index">
          <div class="product-box">
            <div class="imgbox">
              <img v-if="index===0" src="@/assets/images/home/vector.png" alt="" />
              <img v-else src="@/assets/images/goods/goods_2.png" alt="" />
            </div>
            <div class="title">{{ item.productName }}</div>
          </div>
          <div class="total-box">
            <div>${{ (item.productTotal).toFixed(2) }}</div>
          </div>
          <div class="quantity">1</div>
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
          <div class="totle-price">
            <span class="label">Subtotal</span>
            <span class="value">${{ actualMoneyComputed }}</span>
          </div>
          <div class="totle-price">
            <span class="label">Shipping & Handling</span>
            <span class="value">${{ '0' }}</span>
          </div>
          <div class="totle-price">
            <span class="label">Sales Tax</span>
            <span class="value">${{ '0' }}</span>
          </div>
          <div class="totle-price">
            <span class="label grand">grand total</span>
            <span class="value grand">${{ '438.9' }}</span>
          </div>
          <div class="totle-price">
            <span class="label">Points earned for this order</span>
            <span class="value">${{ '219 points' }}</span>
          </div>
          
         
        </div>
      </div>

      <div class="btn-box flex">
        <div class="back" @click="handleBack">
          <span>back</span>
        </div>
        <div class="btn" @click="handleCheckout">
          <span>confirm</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import GoodsListSwiper from "@/components/goods-list-swpier/goodsListSwpier.vue";

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

const actualMoneyComputed = computed(() => {
  let total: any = 0;
  if (data.cartList.length > 0) {
    data.cartList.map((item: any) => {
      total += item.productTotal;
    });
    return total.toFixed(2);
  }
  return '0.00';
});

// 商品价格计算
const handleChange = (item: any) => {
  item.productTotal = (item.productNum * item.productPrice);
};

// 返回
const handleBack = () => {
  router.back();
};

// 下单成功
const handleCheckout = () => {
  router.push({
    name: 'paySuccess',
  });
}

const handleJump = () => {
  router.push({
    name: 'goodsList',
  });
}
</script>

<style lang="scss" scoped>
.cart-page-wrap {
  box-sizing: border-box;
  font-style: normal;
  font-weight: 500;
  font-family: 'Oswald-Medium';
  color: #2E2E2D;

  .cart-box {
    padding: 72px 0px 0;

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

        .total-box {
          margin-top: 18px;
          font-size: 26px;
          font-weight: 400;
          line-height: 30px;
          letter-spacing: 1px;
          text-transform: uppercase;
          width: 18%;
          text-align: right;
        }

        .quantity {
          font-size: 26px;
          font-weight: 400;
          line-height: 30px;
          width: 32%;
          text-align: right;
          box-sizing: border-box;
          margin-top: 18px;
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
          font-family: 'Oswald-Regular';
          font-size: 16px;
          font-weight: 400;
          line-height: 30px;
          letter-spacing: 1px;
          text-transform: capitalize;
          margin-top: 24px;

          &:first-child {
            margin-top: 44px;
          }

          .label {
            width: 360px;
            display: inline-block;
            text-align: right;
          }

          .grand {
            font-family: 'Oswald-Medium';
          }

          .value {
            width: 220px;
            display: inline-block;
            text-align: right;
          }
        }
        
      }
    }

    .btn-box {
      justify-content: space-between;
      box-sizing: border-box;
      margin-top: 44px;

      .back {
        height: 64px;
        width: 108px;
        text-align: center;
        line-height: 64px;
        color: #2099A3;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        letter-spacing: 0.54px;
        text-transform: uppercase;
        border: 2px solid #2099A3;
        cursor: pointer;
      }
      .btn {
        width: 123px;
        height: 64px;
        text-align: center;
        line-height: 64px;
        background-color: #2099A3;
        font-size: 24px;
        font-weight: 600;
        letter-spacing: 0.54px;
        text-transform: uppercase;
        cursor: pointer;
        color: #fff;
      }

    }
  }

}
</style>
