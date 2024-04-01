<template>
  <div class="overview-right">
    overview-right
  </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';

interface Props {
  data: any;
  time: string;
}
const prop = withDefaults(defineProps<Props>(), {
  data: () => {},
  time: dayjs().format('YYYY-MM-DD'),
});
const nowTime = ref(dayjs().format('YYYY-MM-DD'));

watch(
  () => prop.time,
  (newVal, oldVal) => {
    nowTime.value = dayjs(newVal).format('YYYY-MM-DD');
  }
);
</script>
<style lang="scss" scoped>
.overview-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 23px;
  position: relative;
  z-index: 2;
}
</style>