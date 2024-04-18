<template>
  <div class="custom-select-content">
    <div class="selected-box" @click="handleSelect">
      {{ data.selectedName || prop.placeholder }}
      <img class="arrow-down" :class="{'arrowTransform': data.isOpen}" src="@/assets/images/home/arrow-down.png" alt="">
    </div>
    <div class="select-drop-down-box" v-if="data.isOpen">
      <div class="select-item" v-for="(item, index) in prop.options" :key="index" @click="handleItem(item,index)">
        <div class="select-icon">
          <span v-if="index===data.currentIndex" class="iconfont icon-duihao"></span>
        </div>
        <div class="text">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  value?: any;
  disabled?: boolean;
  placeholder?: string;
  options?: any;
  isWidth?: boolean;
}
const prop = withDefaults(defineProps<Props>(), {
  value: undefined as unknown,
  disabled: false,
  placeholder: 'Please Select One',
  options: [] as any,
  isWidth: false,
});
const data = reactive({
  isOpen: false,
  selectedName: '',
  currentIndex: 0,
});

const handleSelect = () => {
  data.isOpen = !data.isOpen;
};
const emit = defineEmits(['changeSelect']);
const handleItem = (item: any, index: number) => {
  data.currentIndex = index;
  data.isOpen = false;
  emit('changeSelect', item);
};
const show = () => {
  data.isOpen = false;
}

onMounted(() => {
  prop.options?.map((item: any) => {
    if (item.value === prop.value) {
      data.selectedName = item.label;
    }
  })
});
defineExpose({
  show,
});
</script>
<style lang="scss" scoped>
.custom-select-content {
  position: relative;

  .selected-box {
    width: 100%;
    height: 45px;
    background-color: #fff;
    border: 1px solid #2E2E2D;
    padding: 0 16px;
    line-height: 45px;
    color: #2E2E2D;
    font-family: 'Oswald-Medium';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.32px;
    cursor: pointer;
    position: relative;

    .arrow-down {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 6px;
      transition: transform 0.3s ease-in-out;
    }

    .arrowTransform {
      transform: rotate(180deg);
      top: 48%;
    }
  }

  .select-drop-down-box {
    background-color: #6a6968;
    position: absolute;
    top: 2px;
    width: 100%;
    border-radius: 8px;
    color: #fff;
    padding: 12px;
    z-index: 99;
    padding-top: 24px;
    padding-left: 20px;
    box-sizing: border-box;

    .select-item {
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      cursor: pointer;

      .select-icon {
        width: 18px;
      }

      .icon-duihao {
        font-weight: 700;
      }
      .text {
        font-size: 16px;
        margin-left: 8px;
        font-family: "Oswald-Medium";
      }
    }
  }
}
</style>

