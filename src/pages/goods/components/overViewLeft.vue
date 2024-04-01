<template>
  <div class="overview-left">
    overview-left
  </div>
</template>
<script lang="ts" setup>
import { formatNumberDigit } from '@/utils/utils';

interface Props {
  data: any;
}
withDefaults(defineProps<Props>(), {
  data: () => {},
});
</script>
<style lang="scss" scoped>
.overview-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 23px;
  position: relative;
  z-index: 2;
 
}
</style>