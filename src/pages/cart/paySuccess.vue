<template>
  <div class="checkout-page-wrap">
    <div class="name">Thank you for your purchase.</div>
    <div class="order-info">Order number is <span>100056298</span>.</div>
    <div class="text">Please confirm the details of your order by email.</div>
    <div class="text">If the email does not reach <span>InfoJapan@smws.com</span> Contact us. Field</div>
    <div class="text2" @click="handleShop">Keep on shopping.</div>
  </div>
</template>

<script lang="ts" setup>

const router = useRouter();
// 下一步
const handleShop = async () => {
  router.push({
    name: 'goodsList',
  });
};
</script>

<style lang="scss" scoped>
.checkout-page-wrap {
  padding: 0 4.5%;
  box-sizing: border-box;
  font-style: normal;
  font-weight: 500;
  font-family: 'Oswald-Regular';
  color: #2E2E2D;

  .name {
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.54px;
    text-transform: uppercase;
    height: 146px;
    line-height: 146px;
    text-align: center;
    border-bottom: 1px solid #D4D4D4;
  }

  .order-info {
    color: rgba(46, 46, 45, 0.80);
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.54px;
    text-transform: uppercase;
    margin-top: 44px;
    margin-bottom: 72px;

    span {
      color: #2099A3;
    }
  }

  .text {
    color: rgba(46, 46, 45, 0.80);
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.54px;

    span {
      color: #2099A3;
    }
  }

  .text2 {
    color: #2099A3;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.54px;
    text-transform: uppercase;
    margin-top: 44px;
    cursor: pointer;
  }
}
</style>
