<template>
  <div class="qc-detail-wrap" :class="{ 'detail-wrap-2': prop.columns === 2 }">
    <div
      v-for="(item, index) in prop.form"
      :key="index"
      class="item-wrap"
      :class="[prop.align === 'right' ? 'item-right' : 'item-left']"
      :style="`width: calc(${100 / prop.columns}% - ${prop.space}px);`"
    >
      <div
        class="label"
        :style="[prop.align === 'left' ? `width: ${widthL}px` : '']"
      >
        {{ item.label }}
      </div>
      <div v-if="item.type === 'image'">
        <el-image
          class="img"
          v-if="prop.detail[item.prop]"
          fit="contain"
          :src="prop.detail[item.prop]"
          :preview-src-list="[prop.detail[item.prop]]"
        ></el-image>
        <div v-else>--</div>
      </div>
      <div v-else-if="item.comName === 'radio'">
        <el-radio-group
          v-model="prop.detail[item.prop]"
          v-for="(temp, index) in item.dic"
          :key="index"
          disabled
        >
          <el-radio :label="item.type ? item.type(temp.value) : temp.value">{{
            temp.label
          }}</el-radio>
        </el-radio-group>
      </div>
      <div v-else-if="item.comName === 'checkbox'" class="check-box">
        <div
          v-for="(temp, index) in getCheckBox(item)"
          :key="index"
          class="check-item"
        >
          {{ temp }}
        </div>
      </div>
      <div v-else-if="item.comName === 'textarea'">
        <el-input
          v-model="prop.detail[item.prop]"
          type="textarea"
          :rows="3"
          resize="none"
          disabled
        />
      </div>
      <div v-else-if="item.comName === 'tree'">
        <QcTree :data="item.dic" :showCheckbox="false"></QcTree>
      </div>
      <div
        v-else
        class="info"
        :class="{ 'info-right': prop.align === 'right' }"
        :style="[
          prop.align === 'right' ? `width: calc(100% - ${widthL}px)` : '',
        ]"
      >
        <div
          v-if="item.template"
          v-html="item.template(prop.detail)"
          @click="handlerClick"
        ></div>
        <div v-else>
          {{ (item.dic ? getLabel(item) : prop.detail[item.prop]) || '--'
          }}<span v-if="item.unit">{{ item.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElRadio } from 'element-plus';
import QcTree from '@/components/qcTree/index.vue';

interface Props {
  columns: number; // 几列
  align: string; // 对齐方式
  form: any; // 数据模板
  detail: any; // 数据
  labelWidth?: number; // labelwidth
  space?: number;
}
const prop = withDefaults(defineProps<Props>(), {
  columns: 1,
  align: 'right',
  form: [] as any,
  detail: {} as any,
  labelWidth: 0,
  space: 120,
});
let widthL = ref(48);
let num = 0;
prop.form.forEach((item: any) => {
  const len = item.label.length;
  if (num < len) {
    num = len;
  }
});
widthL.value = 12 * num;
if (prop.labelWidth > 0) {
  widthL.value = prop.labelWidth;
}

// 字典匹配
const getLabel = (column: any) => {
  if (column.type) {
    if (
      prop.detail[column.prop] &&
      String(prop.detail[column.prop]).includes(',')
    ) {
      let str = '';
      const arr = prop.detail[column.prop].split(',');
      arr.forEach((temp: any, index: number) => {
        const obj = column.dic.find((item: any) => {
          return column.type(item.value) === temp;
        });
        if (obj) {
          str += index === 0 ? obj.label : `，${obj.label}`;
        }
      });
      return str;
    } else {
      const obj = column.dic.find((item: any) => {
        return column.type(item.value) === prop.detail[column.prop];
      });
      return obj ? obj.label : '--';
    }
  } else {
    if (
      prop.detail[column.prop] &&
      String(prop.detail[column.prop]).includes(',')
    ) {
      let str = '';
      const arr = prop.detail[column.prop].split(',');
      arr.forEach((temp: any, index: number) => {
        const obj = column.dic.find((item: any) => {
          return item.value === temp;
        });
        if (obj) {
          str += index === 0 ? obj.label : `，${obj.label}`;
        }
      });
      return str;
    } else {
      const obj = column.dic.find((item: any) => {
        return item.value === prop.detail[column.prop];
      });
      return obj ? obj.label : '--';
    }
  }
};
const getCheckBox = (column: any) => {
  const arr = [] as any;
  if (!prop.detail[column.prop]) {
    return arr;
  }
  column.dic?.forEach((item: any) => {
    if (prop.detail[column.prop].includes(item.value)) {
      arr.push(item.label);
    }
  });
  return arr;
};

//下载模板
const handlerClick = async (e: any) => {
  console.log('e====', e);
  const classList = e.target.classList;
  if (classList.contains('download-click')) {
    //点击事件执行的逻辑
    console.log(e.target.dataset.url);
    console.log(e.target);
    const imgUrl = e.target.dataset.url;
    window.open(imgUrl);
  }
};
</script>

<style lang="scss">
.qc-detail-wrap {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: -12px;

  &.margin-line {
    margin-bottom: 0;
  }

  &.detail-wrap-2 {
    width: 90%;
  }

  .item-wrap {
    display: flex;
    padding: 0 60px;
    margin-bottom: 12px;
    font-size: 12px;
    color: #262626;

    .info {
      color: #555555;
      max-width: 600px;
      word-break: break-all;
      &.info-right {
        text-align: right;
      }
    }

    .img {
      width: 88px;
      height: 88px;
      border: 1px solid #c4c4c4;
    }
  }

  .item-right {
    justify-content: space-between;
  }

  .item-left .label {
    margin-right: 36px;
    text-align: right;
  }

  .el-radio {
    display: flex;
    align-items: start;
    height: 23.2px;
  }
  .qc-tree-wrap {
    width: 300px;
  }
  .check-box {
    display: flex;
    align-items: center;
    justify-content: center;
    .check-item {
      padding: 4px 10px;
      margin-right: 4px;
      margin-top: -4px;
      font-size: 12px;
      color: var(--el-color-primary);
      background-color: #e5e8f6;
      border-radius: 8px;
    }
  }
  .el-textarea {
    width: 300px;
  }
}
</style>
