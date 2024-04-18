<template>
  <div class="shopping-address-box">
    <div class="name">Payment method</div>
    <div class="text">What points do you use?</div>
    <div class="text">(maximum 165510 points are available).</div>
    

    <el-checkbox v-model="data.checked">
      <div class="agree-tip">Use points</div>
    </el-checkbox>

    <div class="ship-box">
      <div class="ship-item" v-for="(r, index) in data.radioList" :key="index" @click="handleRadio(index)">
        <div>
          <img v-if="index===data.currentIndex" src="@/assets/images/common/radio_active.png" alt="" />
          <img v-else src="@/assets/images/common/radio.png" alt="" />
        </div>
        <div>
          <div>{{ r.name }}</div>
          <div class="tip">{{ r.tip }}</div>
        </div>
      </div>
    </div>

    <div class="btn-box flex" >
      <div class="btn" @click="handleNext">PROCEED</div>
    </div>

     <div class="copyright">
      <span class="dot"></span>
      <span>Copyright (c) 2007 Scotch Malt Whisky Society All Rights Reserved</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { STATETYPE, ABOUTTYPE } from "@/utils/simulatedData";

const data = reactive({
  active: 0, // 步骤条
  checked: false,
  currentIndex: 1,
  radioList: [
    {
      name: 'Send to another address',
      isSelect: false,
      tip: '',
    },
    {
      name: 'Cash exchange / cash on delivery',
      tip: 'The transfer fee is 660 yen.',
      isSelect: true,
    },
    {
      name: 'Bank transfer / bank transfer payment',
      tip: '',
      isSelect: false,
    }
  ]
  
});

const handleRadio = (index: number) => {
  data.currentIndex = index;
}

const emit = defineEmits(['next-step']);

// 下一步
const handleNext = async () => {
  emit('next-step', 3)
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
    margin-bottom: 36px;
  }

  .text {
    font-family: 'Oswald-Regular';
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: 0.32px;
    text-transform: uppercase;
  }

  .agree-tip {
    font-family: 'Oswald-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.32px;
    text-transform: uppercase;
  }

  .ship-box {
    border-top: 1px solid#D4D4D4;
    padding-top: 36px;
    font-family: 'Oswald-Regular';

    .ship-item {
      margin-bottom: 14px;
      cursor: pointer;
      display: flex;

      img {
        width: 14px;
        height: 14px;
        margin-right: 8px;
      }

      .tip {
        color: rgba(46, 46, 45, 0.60);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0.32px;
        text-transform: uppercase;
        margin-top: 10px;
      }
    }
  }

  .copyright {
    border: 1px solid #2099A3;
    width: 100%;
    height: 64px;
    line-height: 64px;
    color: #2099A3;
    font-family: irohakakuC;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    margin-top: 24px;

    .dot {
      width: 12px;
      height: 12px;
      background-color: #828281;
      border-radius: 6px;
      margin-right: 12px;
      margin-left: 16px;
      display: inline-block;
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
