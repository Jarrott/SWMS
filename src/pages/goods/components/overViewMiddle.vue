<template>
  <div class="overview-middle">
    overview-middle
  </div>
</template>
<script lang="ts" setup>

interface Props {
  data: any;
}
withDefaults(defineProps<Props>(), {
  data: () => {},
});

</script>
<style lang="scss" scoped>
.overview-middle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 19px;
}
</style>