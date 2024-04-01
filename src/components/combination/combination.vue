<!-- 通用组合组件 -->
<template>
  <el-form
    :model="ruleForm"
    ref="combination"
    :hide-required-asterisk="prop.hideRequired"
    class="combination-wrap edit-form-wrap"
  >
    <template v-for="(item, index) in ruleForm.data" :key="`com${index}`">
      <div class="item-wrap">
        <el-form-item
          class="item-box"
          :class="{ 'has-tips': isTips }"
          v-for="(sitem, subIndex) in ruleForm.items[index]"
          :prop="`data.[${index}][${sitem.prop}]`"
          :rules="prop.rules[`${sitem.prop}`]"
          :key="`sub${subIndex}`"
          :label="sitem.labels ? sitem.labels[index] : sitem.label"
          :label-width="sitem.labelWidth"
        >
          <component
            :class="sitem.className"
            :style="`width: ${componentWidth(sitem)}`"
            v-model.trim="item[`${sitem.prop}`]"
            :value="item[`${sitem.prop}`]"
            :options="sitem.props?.options"
            :is="dom[sitem.comName]"
            v-bind="sitem.props"
            @click="sitem.props?.click && sitem.props?.click(index, ruleForm)"
            @change="
              sitem.props?.change && sitem.props?.change(index, ruleForm)
            "
            @focus="sitem.props?.focus && sitem.props?.focus(index, ruleForm)"
            @visible-change="visibleChange($event, index, ruleForm, sitem)"
            @input="sitem.props?.input && sitem.props?.input(index, ruleForm)"
            :clearable="sitem.props?.clearable === false ? false : true"
          >
            <span v-if="sitem.comName === 'button'">{{
              item[`${sitem.prop}`]
            }}</span>
            <template v-if="sitem.props?.prepend" #prepend>{{
              sitem.props.prepend
            }}</template>
            <template v-if="sitem.props?.append" #append>{{
              sitem.props.append
            }}</template>
          </component>
          <div
            v-if="
              sitem.tips &&
              ((sitem.tipKey && item[sitem.tipKey]) || !sitem.tipKey)
            "
            class="tip"
          >
            <div class="icon"></div>
            {{ sitem.tips }}{{ item[sitem.tipKey] }}
          </div>
        </el-form-item>
        <!-- 加减按钮 -->
        <div
          v-if="!ishidePM"
          class="btn-wrap btn-plus"
          :class="{
            'btn-wrap-disabled': !flagPlus(index),
          }"
          @click="handlePlus(index, combination)"
        >
          <el-icon><Plus /></el-icon>
        </div>
        <div
          v-if="!ishidePM"
          class="btn-wrap btn-minus"
          :class="{
            'btn-wrap-disabled': getDelet(),
          }"
          @click="handleMinus(index)"
        >
          <el-icon><Minus /></el-icon>
        </div>
      </div>
    </template>
  </el-form>
</template>

<script lang="ts" setup>
import {
  ElButton,
  ElCascader,
  ElDatePicker,
  ElInput,
  ElTimePicker,
  FormInstance,
  FormItemProp,
} from 'element-plus';
import { cloneDeep } from 'lodash';

const dom = shallowReactive({
  input: ElInput,
  select: 'qc-select',
  cascader: ElCascader,
  date: ElDatePicker,
  time: ElTimePicker,
  button: ElButton,
} as any);

interface Props {
  items?: any; // 组件格式
  rules?: any; // 组件校验
  comData?: any; // 组件回填数据
  size?: number; // 最大数量
  btnDisabled?: boolean; // 是否有按钮置灰
  keyBtn?: string; // 置灰按钮key
  hideRequired?: boolean; // 是否隐藏必填*
  ishidePM?: boolean; //是否有加减按钮
  isEndAdd?: boolean; // 是否只有最后一个有加按钮
  isAllDelete?: boolean; // 是否可以全部删除
  isTips?: boolean; // 是否有提示
}

const prop = withDefaults(defineProps<Props>(), {
  items: [] as any,
  rules: [] as any,
  comData: [] as any,
  size: -1,
  btnDisabled: false,
  hideRequired: false,
  ishidePM: false,
  isEndAdd: false,
  isAllDelete: false,
  isTips: false,
});

const combination = ref<FormInstance>();

const ruleForm = reactive({
  data: [] as any,
  items: [] as any,
});

// 组件宽度
const componentWidth = (item: any) => {
  return item.width
    ? `${item.width}px`
    : item.comName === 'button'
    ? 'auto'
    : '300px';
};

// 初始化form数据
const obj = reactive({} as any);
let itemsData = cloneDeep(prop.items);
prop.items.forEach((item: any) => {
  if (item.comName === 'button') {
    obj[item.prop] = item.props.value;
  } else if (item.comName === 'select') {
    obj[item.prop] = undefined as unknown;
  } else {
    obj[item.prop] = '';
  }
});
ruleForm.data.push(cloneDeep(obj));
ruleForm.items.push(cloneDeep(itemsData));
// console.log('ruleForm.data=-11-', ruleForm.data);
// console.log('prop.comData=-11-', prop.comData);
const setForm = () => {
  if (prop.comData && prop.comData.length > 0) {
    // console.log('setForm--');
    // ruleForm.data = [];
    // ruleForm.items = [];
    // console.log('ruleForm.data=--', ruleForm.data);
    // console.log('prop.comData=--', prop.comData);
    prop.comData.forEach((item: any, inx: number) => {
      const o1 = {} as any;
      prop.items.forEach((it: any) => {
        if (it.comName === 'button') {
          o1[it.prop] = ruleForm.data[inx][it.prop] || it.props.value;
          if (prop.btnDisabled && prop.keyBtn === it.prop) {
            if (item[it.prop] || typeof item[it.prop] === 'boolean') {
              it.props.disabled = item[it.prop];
            } else {
              const o2 = ruleForm.items[inx].find(
                (t: any) => t.prop === it.prop
              );
              it.props.disabled = o2 ? o2.props.disabled : item[it.prop];
            }
          }
        } else {
          o1[it.prop] = item[it.prop];
        }
      });
      // ruleForm.data.push(cloneDeep(o1));
      // ruleForm.items.push(cloneDeep(prop.items));

      if (ruleForm.data.length < prop.comData.length) {
        ruleForm.data.push(cloneDeep(o1));
        ruleForm.items.push(cloneDeep(prop.items));
      }
      ruleForm.data[inx] = cloneDeep(o1);
      ruleForm.items[inx] = cloneDeep(prop.items);
    });
  }
};
watch(
  () => prop.comData,
  (newVal, oldVal) => {
    setForm();
  },
  { immediate: true, deep: true }
);
watch(
  () => ruleForm.data,
  (newVal, oldVal) => {
    emit('updatas', newVal);
  },
  { immediate: true, deep: true }
);

const flagPlus = (index: number) => {
  if ((prop.size > -1 && ruleForm.data.length === prop.size) || flagAdd.value) {
    return false;
  }
  if (prop.isEndAdd && index != ruleForm.data.length - 1) {
    return false;
  }
  return true;
};

const emit = defineEmits(['data-plus', 'data-minus', 'updatas']);
// 加数据
let flagAdd = ref(false);
const handlePlus = (index: number, formEl: FormInstance | undefined) => {
  if (!flagPlus(index)) {
    return;
  }
  if (!formEl) return;

  formEl.validate((valid: any) => {
    if (valid) {
      ruleForm.data.splice(index + 1, 0, cloneDeep(obj));
      ruleForm.items.splice(index + 1, 0, cloneDeep(itemsData));
      emit('data-plus', index, ruleForm.data);
    }
  });
};

// 减数据
const getDelet = () => {
  if (prop.isAllDelete && ruleForm.data.length === 0) return true;
  if (!prop.isAllDelete && ruleForm.data.length === 1) return true;
  return false;
};
const handleMinus = (index: number) => {
  if (getDelet()) {
    return;
  }
  // ruleForm.items[index].forEach((item: any, inx: number) => {
  //   if (item.comName === 'button' && item.props.disabled) {
  //     if (index > 0) {
  //       ruleForm.items[index - 1][inx].props.disabled = true;
  //     } else {
  //       ruleForm.items[index + 1][inx].props.disabled = true;
  //     }
  //   }
  // });
  flagAdd.value = false;
  emit('data-minus', index, ruleForm.data[index]);
  ruleForm.data.splice(index, 1);
  ruleForm.items.splice(index, 1);
};

const visibleChange = (e: any, index: number, form: any, sitem: any) => {
  if (sitem.isOnly && sitem.comName === 'select' && e) {
    sitem.props.options.forEach((it: any) => {
      const obj = form.data.find((val: any) => val[sitem.prop] === it.value);
      it.disabled = Boolean(obj);
    });
  } else {
    sitem.props?.visibleChange &&
      sitem.props?.visibleChange(e, index, ruleForm);
  }
};

const validateField = (prop: FormItemProp, callback: any) => {
  combination?.value?.validateField(prop, callback);
};
const validate = async (callback: any) => {
  return await combination?.value?.validate(callback);
};
const scrollToField = (prop: FormItemProp) => {
  combination?.value?.scrollToField(prop);
};

const setOptions = (i: number, j: number, list: any, ref?: any) => {
  ruleForm.items[i][j].props.options = list;
};
const getData = () => {
  return ruleForm.data;
};
const getItems = () => {
  return ruleForm.items;
};
const setFlagAdd = (flag: boolean) => {
  flagAdd.value = flag;
};
const setItemDatas = (data: any) => {
  itemsData = cloneDeep(prop.items);
};
const setItemOption = (data: any, index: number) => {
  itemsData[index].props.options = data;
};
const setLabel = (index: number, subInx: number, name: string) => {
  ruleForm.items[index][subInx].label = name;
};
const setValue = (index: number, key: string, val: string) => {
  ruleForm.data[index][key] = val;
};
const clearData = () => {
  ruleForm.data = [];
  ruleForm.items = [];
};
defineExpose({
  validateField,
  validate,
  scrollToField,
  setOptions,
  getData,
  getItems,
  setFlagAdd,
  setItemDatas,
  setItemOption,
  setLabel,
  setValue,
  clearData,
});
</script>

<style lang="scss">
.bottom-wrap .item-wrap {
  margin-bottom: 18px;
  &:last-child {
    margin-bottom: 0;
  }
}
.combination-wrap {
  display: flex;
  flex-direction: column;

  .item-wrap {
    display: flex;

    .el-form-item__content {
      padding-left: 0 !important;
      .el-form-item__error {
        padding-left: 0 !important;
      }
    }

    .item-box {
      margin-left: 12px;
      &:first-child {
        margin-left: 0px;
      }

      .button-wrap {
        width: 80px;
      }
    }
    .btn-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18px;
      height: 18px;
      margin: 7px 0 0 12px;
      background-color: #d9d9d9;
      border-radius: 3px;
      font-size: 10px;
      color: #000;
      cursor: pointer;

      &.btn-wrap-disabled {
        background-color: #eee;
        color: #999;
        cursor: not-allowed;
      }
    }
  }
}
</style>