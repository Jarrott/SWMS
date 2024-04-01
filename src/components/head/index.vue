<template>
  <div class="qc-head-wrap">
    <div class="title-wrap" :class="{ 'title-absolute': prop.isAbsolute }">
      <div class="title">{{ prop.title }}</div>
    </div>
    <el-button
      class="head-btn"
      :class="{ 'btn-absolute': prop.isAbsolute }"
      v-if="prop.isBack"
      type="primary"
      @click.stop="back"
      >返回</el-button
    >
    <slot name="tip"></slot>
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title: string; // 标题
  isBack?: boolean; // 是否返回按钮
  isAbsolute?: boolean; // 是否面包屑行返回
}
const prop = withDefaults(defineProps<Props>(), {
  title: '',
  isBack: false,
  isAbsolute: false,
});

const router = useRouter();
const back = () => {
  router.back();
};
</script>

<style lang="scss">
.qc-head-wrap {
  position: relative;
  // margin-bottom: 12px;
  padding-bottom: 2px;
  background-color: #fff;
  border-radius: 12px;

  .title-wrap {
    padding: 12px 0;
  }
  .title {
    padding-left: 12px;
    color: var(--el-color-primary);
    font-size: 12px;
    box-sizing: border-box;
    border-left: 4px solid var(--el-color-primary);
  }
  .title-absolute {
    display: none;
  }
  .head-btn {
    position: absolute;
    right: 20px;
    top: 6px;
  }
  .btn-absolute {
    position: fixed;
    top: 70px;
  }
  .head-tip {
    display: flex;
    margin: 20px 0;
    font-size: 10px;
    color: var(--el-color-primary);
    .icon {
      width: 16px;
      height: 16px;
      margin-right: 6px;
      background-image: url(@/assets/images/head-tip.png);
      background-repeat: no-repeat;
      background-size: 16px;
    }
    &.left-8 {
      margin-left: 40px;
    }
  }
  .el-form-item__content {
    color: #262626;
  }
}
.edit-line {
  width: 100%;
  height: 1px;
  background-color: #f0f0f0;
}
</style>