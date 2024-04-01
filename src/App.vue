<template>
  <el-scrollbar class="scroll-box">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </el-scrollbar>
</template>

<script setup lang="ts">
// import locale from 'element-plus/lib/locale/lang/zh-cn';
import locale from 'element-plus/es/locale/lang/zh-cn'

// 移动端整体缩放
const setScale = () => {
  const scaleW = window.innerWidth / 1920;
  const viewport: any = document.querySelector('meta[name=viewport]');
  viewport.content = `width=device-width, initial-scale=${scaleW}, maximum-scale=${scaleW}, minimum-scale=${scaleW},user-scalable=yes`;
};
onMounted(() => {
  setScale();
});
</script>

<style lang="scss">
@import '@/assets/iconfont/iconfont.css';
.scroll-box {
  position: relative;
  width: 100%;
  height: 100%;
}
.el-scrollbar__view {
  height: 100%;
}
</style>
