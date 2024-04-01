<template>
  <div class="qc-tree-box">
    <div class="qc-tree-wrap">
      <el-input
        v-model.trim="query"
        :suffix-icon="Search"
        placeholder="请输入关键字查找"
        @input="onQueryChanged"
      />
      <el-tree-v2
        ref="treeRef"
        :data="data"
        :node-key="treeProps.value"
        :show-checkbox="showCheckbox"
        :check-strictly="!treeData.flagStrictly"
        :filter-method="filterMethod"
        :height="208"
        :props="treeProps"
        @node-click="handleNodeClick"
        @check="handleCheck"
        @check-change="handleCheckChange"
      />
    </div>
    <el-checkbox v-if="checkStrictly" v-model="treeData.flagStrictly"
      ><text style="color: #000">父子关联&nbsp;&nbsp;&nbsp;</text>
      选中（去选）父节点，其所有子节点会同步选中（去选）</el-checkbox
    >
  </div>
</template>
  <script lang="ts" setup>
import { ref } from 'vue';
import { ElTreeV2 } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import type { TreeNode } from 'element-plus/es/components/tree-v2/src/types';

interface Props {
  data?: any; // 树数据
  showCheckbox?: boolean; // 列表是否多选
  checkStrictly?: boolean; // 是否关联父子
  nodeKey?: string;
  setCheckedKeys?: any;
}
const prop = withDefaults(defineProps<Props>(), {
  // treeProps: {
  //   type: Object,
  //   default() {
  //     return {
  //       value: 'id',
  //       label: 'label',
  //       children: 'children',
  //     };
  //   }
  // },
  showCheckbox: false, // 是否可多选，默认单选
  checkStrictly: false, // 显示复选框情况下，是否严格遵循父子不互相关联
  data: [] as any,
  nodeKey: 'id',
  setChecked: [] as any,
  setCheckedKeys: [] as any,
});

const treeData = reactive({
  flagStrictly: !prop.checkStrictly,
});

// 监听基础树和回填数据，回填展示
watch(
  () => [prop.data, prop.setCheckedKeys],
  (newVal, oldVal) => {
    if (prop.data?.length > 0 && prop.setCheckedKeys?.length > 0) {
      nextTick(() => {
        setCheckedKeys(prop.setCheckedKeys);
      });
    }
  },
  { immediate: true, deep: true }
);
const treeProps = {
  value: 'id',
  label: 'label',
  children: 'children',
};

const emit = defineEmits([
  'handleCheck',
  'handleNodeClick',
  'handleCheckChange',
]);

/**
 * @description: [事件] - 节点被点击时的回调
 * @param {*} data         该节点所对应的数据对象
 * @param {*} node         节点对应的Node对象
 * @param {*} vueComponent 节点组件本身
 * @return {*}
 */
const handleNodeClick = (data: any, node: any, vueComponent: any) => {
  emit('handleNodeClick', data);
};
/**
 * @description: [事件] - 当复选框被点击的时候触发
 * @param {*} checkedNodes      该节点所对应的对象
 * @param {*} checkedKeys       树目前的选中状态对象
 * @param {*} halfCheckedNodes
 * @param {*} halfCheckedKeys
 * @return {*}
 */
const treeRef = ref();
const handleCheck = (node: any, checkedData: any) => {
  // let checkedChildData;
  // 判断父子不关联
  // if (prop.checkStrictly) {
  //   let selected = checkedData.checkedKeys.indexOf(node.id); // -1未选中,>=0为选中
  //   let currentNode = treeRef.value!.getNode(node);
  //   const setChecked = (arr: any[], ifChecked: boolean) => {
  //     if (arr.length > 0) {
  //       arr?.map((item) => {
  //         treeRef.value.setChecked(item.key, ifChecked);
  //         if (!!item?.children?.length) {
  //           setChecked(item?.children, ifChecked);
  //         }
  //       });
  //     }
  //   };
  //   // 如果为取消
  //   if (selected === -1) {
  //     setChecked(currentNode ?? [], false);
  //   } else {
  //     // 如果为选中
  //     setChecked(currentNode.children ?? [], true);
  //   }
  //   // 父节点和子节点数据都给传输
  //   checkedChildData = treeRef.value.getCheckedKeys(false, true);
  // } else {
  //   checkedChildData = treeRef.value.getCheckedKeys(true);
  // }
  const checkedChildData = prop.checkStrictly
    ? treeRef.value.getCheckedKeys(false, false)
    : treeRef.value.getCheckedKeys(true);
  emit('handleCheck', node, checkedData, checkedChildData);
};

/**
 * @description: 事件 - 节点选中状态发生变化时的回调
 * @param {*}
 * @return {*}
 */

const handleCheckChange = (data: any, checked: any) => {
  emit('handleCheckChange', data, checked);
};

// 统一处理子节点为不选中
const childNodeChange = (node: any) => {
  if (node?.children) {
    for (let i = 0; i < node?.children.length; i++) {
      node.children[i].checked = false;
      childNodeChange(node.children[i]);
    }
  }
};
// 统一处理父节点为选中
const parentNodeChange = (node: any) => {
  if (node?.parent?.key !== undefined) {
    node.parent.checked = true;
    childNodeChange(node.parent);
  }
};
const query = ref('');
// const treeRef = ref<InstanceType<typeof ElTreeV2>>()
// const data = createData(4, 30, 5)
// console.log(data.node)
// const data = {
//   id: '0',
//   label: '全选',
//   children: []
// }
// for(let key of Object.keys(data)){
//   if (key === 'children') {
//     data[key] = createData(4, 30, 5)
//   }
// }
// data.children = createData(4, 30, 5)
// console.log(data)

// console.log('fatherData======', Object.keys(fatherData))
// const data = Object.keys(fatherData)
/**
 * @description: 通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性
 * @param {*} keys     勾选节点的 key 的数组
 * @return {*}
 */
const setCheckedKeys = (keys: any) => {
  nextTick(() => {
    return treeRef.value!.setCheckedKeys(keys);
  });
};
/**
 * @description: 通过 key / data 设置某个节点的勾选状态，使用此方法必须设置 node-key 属性
 * @param {*} val       勾选节点的 key 或者 data
 * @param {*} checked   boolean 类型，节点是否选中
 * @param {*} deep      boolean 类型，是否设置子节点 ，默认为 false
 * @return {*}
 */
const setChecked = (val: any, checked: any, deep: any) => {
  nextTick(() => {
    return treeRef.value!.setChecked(val, checked);
  });
};

const onQueryChanged = (query: string) => {
  treeRef.value!.filter(query);
};
const filterMethod = (query: string, node: TreeNode | any) => {
  return node?.label!.includes(query);
};

const getCheckedNodes = () => {
  return treeRef.value.getCheckedNodes();
};
defineExpose({
  setCheckedKeys,
  setChecked,
  getCheckedNodes,
});
</script>
  
<style lang="scss">
@import './index.scss';
</style>