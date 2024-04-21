<template>
  <div class="checkout-page-wrap">
    <div class="time-text" v-if="data.downTime=='over'">
      <div class="empty-text">Shopping Cart is Empty</div>
      <div class="over-text" @click="handleJump">Click here to continue shopping.</div>
    </div>
    <template v-else>
      <div class="step-box">
        <el-steps :active="data.active" :align-center="true" finish-status="process">
          <el-step title="BILLING ADDRESS"></el-step>
          <el-step title="SHIPPING ADDRESS"></el-step>
          <el-step title="SHIPPING METHOD"></el-step>
          <el-step title="PAYMENT METHOD"></el-step>
        </el-steps>
      </div>
      <div class="time-text">
        Time Remaining: {{ data.downTime }}
      </div>
      <BillingAddress v-if="data.active==0" @next-step="handleNextStep"></BillingAddress>
      <ShoppingAddress v-if="data.active==1" @next-step="handleNextStep"></ShoppingAddress>
      <ShoppingMethod v-if="data.active==2" @next-step="handleNextStep"></ShoppingMethod>
      <ShoppingSuccess v-if="data.active==3"></ShoppingSuccess>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { FormRules, FormInstance, ElIcon } from 'element-plus';
import { STATETYPE, ABOUTTYPE } from "@/utils/simulatedData";
import BillingAddress from "./components/step-1.vue";
import ShoppingAddress from "./components/step-2.vue";
import ShoppingMethod from "./components/step-3.vue";
import ShoppingSuccess from "./components/step-4.vue";

const ruleFormRef = ref<FormInstance>();
const router = useRouter();

const data = reactive({
  active: 0, // 步骤条
  downTime: '', // 剩余支付时间
});
const timer = ref();

// const lastTime = computed(() => {
//   return `${Number(data.downTime.day) ? data.downTime.day + data.i18n['天'] : '' }${Number(data.downTime.hours) ? data.downTime.hours + 'HOURS':''}${Number(data.downTime.minutes) ? data.downTime.minutes+'MINUTES':''}${Number(data.downTime.seconds) ? this.downTime.seconds +this.i18n['秒']:''}`;
// });

const handleNextStep = (val: any) => {
  data.active = val;
}

const handleJump = () => {
  router.push({
    name: 'goodsList',
  });
};

const initDownTime = (targetTime: any ) => {
  let showTime="";
  let nowTime = new Date().getTime();
  let distance = targetTime - nowTime;
  let days = Math.floor(distance / (1000 * 60 * 60 * 24)); //向下取整
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.ceil((distance % (1000 * 60)) / 1000); //向上取整
  // 显示倒计时
  
  showTime = (hours == 0 ? '00' : hours) + ' HOURS ' + minutes + ':' + seconds + " MINUTES";
  data.downTime = showTime;
  
  if (distance > 0) {
    setTimeout(function() {
      initDownTime(targetTime);
    }, 1000);
  } else {
    showTime = "over";
    data.downTime = showTime;
  }
};
initDownTime(new Date().getTime() + 15 * 60 * 1000)

</script>

<style lang="scss" scoped>
.checkout-page-wrap {
  padding: 0 4.5%;
  box-sizing: border-box;
  font-style: normal;
  font-weight: 500;
  font-family: 'Oswald-Medium';
  color: #2E2E2D;

  :deep(.el-step__icon.is-text) {
    color: #909399;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.01px;
    border-color: #909399;
  }

  :deep(.el-step.is-center .el-step__line) {
    margin: 0 20px;
    background-color: #E4E7ED;
    top: 10px;
  }

  :deep(.el-step__head.is-process) {
    border-color: #2099A3;

    .el-step__line {
      background-color: #2099A3;
    }

    .el-step__icon.is-text {
      background: #2099A3;
      color: #ffffff;
      border: none;
    }
  }
  
  :deep(.el-step__title.is-process) {
    color: #2099A3;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.01px;
    margin-top: 16px;
  }

  :deep(.el-step__title.is-wait) {
    color: #909399;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.01px;
    margin-top: 16px;
  }

  .step-box {
    margin-top: 80px;
  }

  .time-text {
    color: #C91B1B;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.54px;
    text-transform: uppercase;
    text-align: center;
    margin-top: 72px;
  }

  .empty-text {
    color: #2E2E2D;
    font-size: 26px;
    margin-top: 14%;
  }

  .over-text {
    color: #1e9aa4;
    font-size: 22px;
    margin-top: 24px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  
}
</style>
