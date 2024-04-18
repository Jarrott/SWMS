<template>
  <!-- <div class="qc-select-wrap"> -->
  <el-select-v2
    ref="qcSelectRef"
    :style="`padding: 0 ${selectRight}px 0 ${selectLeft}px; width: ${
      prop.isWidth ? '100%' : `${selectWidth}px`
    }`"
    :class="{
      'prepend-radius': prop.prepend,
      'append-radius': prop.append,
      'multiple-wrap': prop.multiple,
      'icon-space': prop.icon,
    }"
    :popper-class="'qc-select'"
    v-model="prop.value"
    :multiple="prop.multiple"
    :multiple-limit="prop.multipleLimit"
    :disabled="prop.disabled"
    :placeholder="prop.placeholder"
    :filterable="prop.filterable"
    :options="options.data"
    :item-height="24"
    :clearable="prop.clearable"
    :remote="prop.remote"
    :remote-method="remoteMethod"
    :height="styleHeight"
    @change="handlechange"
    @visible-change="handleVisible"
    @focus="handleFocus"
  >
    <template #default="{ item }">
      <span :title="item.label">
        {{ item.label }}111
      </span>
    </template>
    <template #suffix>
      <!-- 这里使用自定义图标替换默认图标 -->
      <i class="el-icon-s-home"></i>
      yuan
    </template>
    
  </el-select-v2>
</template>

<script lang="ts" setup name="qc-select">
import { useNamespace } from 'element-plus';
const nsInput = useNamespace('input');

interface Props {
  value?: any;
  multiple?: boolean;
  multipleLimit?: number;
  disabled?: boolean;
  placeholder?: string;
  filterable?: boolean;
  remote?: boolean;
  prepend?: string; //前缀
  append?: string; //后缀
  options?: any;
  icon?: any; //前缀-图标
  clearable?: boolean;
  isWidth?: boolean;
}
let prop = withDefaults(defineProps<Props>(), {
  value: undefined as unknown,
  multiple: false,
  multipleLimit: 0,
  disabled: false,
  filterable: false,
  remote: false,
  placeholder: '请选择',
  append: '',
  options: [] as any,
  icon: '',
  clearable: true,
  isWidth: false,
});

const emit = defineEmits([
  'input',
  'update:nameValue',
  'change',
  'visible-change',
]);

// let selectValue = computed({
//   get() {
//     console.log('get---', prop.value);
//     return prop.value || null;
//   },
//   set(val) {
//     // emit('input', val || null);
//     emit('update:nameValue', val);
//     // qcSelectRef.value.states.selectedLabel = '企业名称2';
//     console.log('input---', val);
//   },
// });

// watch(
//   () => prop.value,
//   (newVal, oldVal) => {
//     remoteMethod(newVal);
//     console.log('qselect---', newVal, oldVal, prop.options, options.data);
//   }
// );

const handlechange = (e: any) => {
  emit('change', e);
};
const handleVisible = (e: any) => {
  if (e && prop.prepend) {
    nextTick(() => {
      const pw = prependRef.value ? prependRef.value.clientWidth : 0;
      qcSelectRef.value.popper.popperRef.contentRef.style.marginLeft = `-${pw}px`;
    });
  }
  emit('visible-change', e);
};

// 有前缀和后缀时的样式
const qcSelectRef = ref();
const prependRef = ref();
const appendRef = ref();
let selectLeft = ref(0);
let selectRight = ref(0);
let prependWidth = ref(0);
let appendWidth = ref(0);
let selectWidth = ref(300);
nextTick(() => {
  let sw = 300;
  const pw = prependRef.value ? prependRef.value.clientWidth : 0;
  const aw = appendRef.value ? appendRef.value.clientWidth : 0;
  const iw = prop.icon ? 34 : 0;
  selectLeft.value = prop.prepend ? pw : 0;
  selectRight.value = prop.append ? aw : 0;
  prependWidth.value = prop.prepend ? pw : 0;
  appendWidth.value = prop.append ? aw : 0;
  if (prop.prepend) {
    sw -= pw;
  }
  if (prop.append) {
    sw -= aw;
  }
  selectWidth.value = sw;
});

let len = prop.options.length;
let styleHeight = len >= 7 ? 170 : len * 24 + 2;

// 搜索
let options = reactive({
  data: [] as any,
});
const loading = ref(false);
watch(
  () => prop.options,
  (newVal, oldVal) => {
    options.data = newVal;
    if (newVal?.length > 0) {
      len = options.data.length;
      styleHeight = len >= 7 ? 170 : len * 24 + 2;
    }
  },
  { immediate: true, deep: true }
);
let remoteQuery = ref('');
const remoteMethod = (query: string) => {
  remoteQuery.value = query || '';
  console.log('rrrrr------------', query);
  if (query !== '') {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      options.data = prop.options.filter((item: any) => {
        return item.label.toLowerCase().includes(query.toLowerCase());
      });
      len = options.data.length;
      styleHeight = len >= 7 ? 170 : len * 24 + 2;
    }, 200);
    emit('update:nameValue', prop.value);
  } else {
    options.data = prop.options;
    len = options.data.length;
    styleHeight = len >= 7 ? 170 : len * 24 + 2;
  }
};

const handleFocus = () => {
  if (qcSelectRef.value?.states.previousQuery !== remoteQuery.value) {
    remoteMethod('');
  }
};
</script>

<style lang="scss">
.qc-prepend {
  position: absolute;
  height: 32px;
  line-height: 32px;
  top: 0;
  background-color: #f6f8ff;
  padding: 0 8px;
  color: #262626;
  box-shadow: 0 1px 0 0 var(--el-input-border-color) inset,
    0 -1px 0 0 var(--el-input-border-color) inset,
    1px 0 0 0 var(--el-input-border-color) inset;
  border-top-left-radius: var(--el-input-border-radius);
  border-bottom-left-radius: var(--el-input-border-radius);
  box-sizing: border-box;
}
.qc-append {
  position: absolute;
  height: 32px;
  line-height: 32px;
  right: 0;
  top: 0;
  background-color: #f6f8ff;
  padding: 0 8px;
  color: #262626;
  box-shadow: -1px 0 0 0 var(--el-input-border-color) inset,
    0 1px 0 0 var(--el-input-border-color) inset,
    0 -1px 0 0 var(--el-input-border-color) inset;
  border-top-right-radius: var(--el-input-border-radius);
  border-bottom-right-radius: var(--el-input-border-radius);
  box-sizing: border-box;
}

.el-select-v2 {
  --el-input-border-color: #c4c4c4;
  --el-input-border-radius: 8px;
  height: 32px;

  .el-select-v2__wrapper {
    min-height: 32px;
    border: 0;
    box-shadow: -1px 0 0 0 var(--el-input-border-color) inset,
      0 1px 0 0 var(--el-input-border-color) inset,
      0 -1px 0 0 var(--el-input-border-color) inset,
      1px 0 0 0 var(--el-input-border-color) inset;
    border-radius: var(--el-input-border-radius);
    box-sizing: border-box;

    &.is-focused {
      box-shadow: -1px 0 0 0 var(--el-color-primary) inset,
        0 1px 0 0 var(--el-color-primary) inset,
        0 -1px 0 0 var(--el-color-primary) inset,
        1px 0 0 0 var(--el-color-primary) inset;
    }
  }

  &.prepend-radius {
    .el-select-v2__wrapper {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  &.append-radius {
    .el-select-v2__wrapper {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  &.icon-space {
    .el-select-v2__placeholder {
      margin-left: 34px;
    }
  }
}

.el-select-v2__popper.qc-select {
  .el-select-dropdown__option-item.is-disabled {
    color: rgba(0, 0, 0, 0.4);
  }
}

.multiple-wrap {
  height: auto;
}
.multiple-wrap .el-select-v2__wrapper {
  max-height: 86px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
.qc-select-icon {
  position: absolute;
  display: flex;
  justify-content: center;
  height: 30px;
  left: 11px;
}
</style>