<template>
  <div class="shopping-address-box">
    <div class="name">SELECT SHIPPING METHOD</div>
    <div class="text">送料</div>
    <div class="ship-item">
      <img src="@/assets/images/common/radio_active.png" alt="" />
      <span>Shipping ¥1,000</span>
    </div>
    <div class="address-item">
      <div class="label">Delivery Date</div>
      <div class="custom-select">
        <el-select v-model="data.delivery" placeholder="Select State">
          <el-option
            v-for="item in data.deliveryList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="address-item">
      <div class="label">Delivery Time</div>
      <div class="custom-select">
        <el-select v-model="data.deliveryTime" placeholder="Select State">
          <el-option
            v-for="item in data.deliveryTimeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
     <div class="btn-box flex" >
      <div class="btn" @click="handleNext">PROCEED</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DELIVERY_DATE, DELIVERY_TIME } from "@/utils/simulatedData";

const router = useRouter();

const data = reactive({
  checked: false,
  delivery: '0',
  deliveryList: DELIVERY_DATE,
  deliveryTime: '0',
  deliveryTimeList: DELIVERY_TIME,
});

const emit = defineEmits(['next-step']);
// 下一步
const handleNext = async () => {
  // 添加新地址时 才会有的校验
  emit('next-step', 2)
};


</script>

<style lang="scss" scoped>
.shopping-address-box {
  width: 50%;
  margin: 72px auto 0;

  .name {
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.32px;
    text-transform: uppercase;
  }

  .text {
    font-family: 'Oswald-Regular';
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.32px;
    text-transform: uppercase;
    margin-top: 36px;
  }

  .ship-item {
    cursor: pointer;
    padding-bottom: 32px;
    padding-top: 30px;
    padding-left: 65px;
    border-bottom: 1px solid #D4D4D4;
    margin-bottom: 44px;

    img {
      width: 14px;
      height: 14px;
      margin-right: 8px;
      vertical-align: middle;
    }
  }

  .address-item {
    margin-bottom: 24px;

    .label {
      font-size: 16px;
      font-family: 'Oswald-Regular';
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.32px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

     :deep(.el-select__wrapper) {
      height: 45px;
      background-color: #fff;
      border-radius: 0;
      border: 1px solid #2E2E2D;
    }

    :deep(.el-input__inner) {
      color: #2E2E2D;
      font-family: 'Oswald-Regular';
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.32px;
    }
  }

  .btn-box {
    justify-content: flex-end;
    margin-top: 44px;

    .btn {
      width: 130px;
      height: 64px;
      background-color: #2099A3;
      text-align: center;
      line-height: 64px;
      color: #fff;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      letter-spacing: 0.54px;
      text-transform: uppercase;
      cursor: pointer;
    }
  }
  
}
</style>
