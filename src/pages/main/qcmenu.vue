<template>
  <div
    class="qc-menu-wrap"
    :class="{
      'qc-menu-wrap1 qc-menu-wrap2': prop.type === 2,
      'qc-menu-wrap1 qc-menu-wrap3': prop.type === 3,
    }"
    @click.stop="clickMenuWrap"
  >
    <el-menu
      ref="menuRef"
      class="menu-wrap"
      :default-active="data.selectId"
      :router="true"
      :unique-opened="true"
      @click.stop="() => {}"
      @select="selectMenu"
      @open="openSub"
      @close="closeSub"
    >
      <div v-for="item in menus" :key="item.id">
        <el-menu-item
          v-if="!item.children || item.children.length == 0"
          :index="item.id"
          :class="{ 'select-item': item.id === data.selectId }"
        >
          <div class="iconfont" :class="`icon-menu-${getIcon(item)}`"></div>
          <span>{{ item.label }}</span></el-menu-item
        >
        <el-sub-menu v-else :index="item.id">
          <template #title>
            <div class="iconfont" :class="`icon-menu-${getIcon(item)}`"></div>
            <span>{{ item.label }}</span>
          </template>
          <div v-for="subItem in item.children" :key="subItem.id">
            <el-menu-item
              v-if="!subItem.children || subItem.children.length == 0"
              :index="subItem.id"
              :class="{ 'select-item': subItem.id === data.selectId }"
            >
              <span>{{ subItem.label }}</span>
            </el-menu-item>
            <el-sub-menu
              v-else
              :index="subItem.id"
              :class="{ 'select-item': subItem.id === data.selectId }"
              @click.stop="clickSub(subItem)"
            >
              <template #title>
                <span>{{ subItem.label }}</span>
              </template>
            </el-sub-menu>
          </div>
        </el-sub-menu>
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { getIcon } from './menu';
const router = useRouter();

const menuRef = ref();

interface Props {
  menus: any; // 全部菜单数据
  type?: number; // 1-2级菜单   3-4级浮框菜单  2-4级浮框菜单
  parentId?: string; // 浮框才是使用，浮框的菜单父id
}
const prop = withDefaults(defineProps<Props>(), {
  menus: [] as any,
  type: 1,
  parentId: '',
});

const data = reactive({
  selectId: '', // 选中子菜单
  isOpen: false, // 浮框菜单是否显示
  clickId: '', // 弹浮框菜单时，选中的菜单id
});

// 关闭弹框
const clickMenuWrap = () => {
  if (prop.type !== 1) {
    emit('hide-submenu');
    emit('close-menu');
  }
};

const emit = defineEmits([
  'select-menu',
  'close-menu',
  'show-submenu',
  'hide-submenu',
  'select-sub',
  // 'clear-cache',
]);
// 选中菜单事件
const selectMenu = (key: string, keys: any) => {
  let item = {} as any;
  if (keys.length === 1) {
    item = prop.menus.find((temp: any) => temp.id === key);
  }
  if (keys.length === 2) {
    const temp1 = prop.menus.find((temp: any) => temp.id === keys[0]).children;
    item = temp1.find((temp: any) => temp.id === keys[1]);
  }
  if (item && (!item.children || item.children.length === 0)) {
    data.selectId = key;
    if (prop.type === 1) {
      closeMenuId();
      emit('select-menu', keys);
    } else {
      emit('select-menu', keys, 2);
      emit('close-menu');
      if (prop.type === 3) {
        emit('select-sub', keys);
      }
    }
    router.push({
      name: item.referenceId,
    });
  }
  emit('hide-submenu');
  console.log('clickMenu---', key, item, keys);
};
// 菜单点击事件，左侧菜单有三级时显示/隐藏浮框菜单
const clickSub = (subItem: any) => {
  if (prop.type === 1 && subItem.children?.length > 0) {
    if (data.isOpen) {
      data.clickId = subItem.id;
      console.log('clickSub---', data.clickId);
      emit('show-submenu', subItem);
    } else {
      emit('hide-submenu');
    }
  }
};
// 显示浮框菜单
const openSub = () => {
  data.isOpen = true;
};
// 隐藏浮框菜单
const closeSub = () => {
  data.isOpen = false;
};
// 收起指定菜单
const closeMenuId = (id?: string) => {
  if (id) {
    nextTick(() => {
      menuRef.value?.close(id);
    });
  } else {
    menuRef.value?.close(data.clickId);
    data.clickId = '';
  }
};
// 设置选中菜单
const selectMenuId = (id: string) => {
  data.selectId = id;
};
// 展开指定菜单
const openMenuId = (id: any) => {
  nextTick(() => {
    try {
      menuRef.value?.open(id);
    } catch (e: any) {
      console.log(e);
    }
  });
};
// 清空选中项
const clearSelectId = () => {
  data.selectId = '';
  data.clickId = '';
  data.isOpen = false;
};
defineExpose({
  closeMenuId,
  selectMenuId,
  openMenuId,
  clearSelectId,
});
</script>

<style lang="scss">
.qc-menu-wrap {
  &.qc-menu-wrap1 {
    display: flex;
    position: fixed;
    left: 162px;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;

    .menu-wrap {
      margin-top: 64px;
      min-width: 162px;
    }
    .el-menu {
      background-color: #fafafa;
    }
    .el-menu-item.select-item {
      border: 0;
    }
  }

  &.qc-menu-wrap3 {
    left: 50px;
  }

  .iconfont {
    width: 14px;
    height: 18px;
    margin-right: 4px;
    font-size: 14px;
  }

  .el-icon svg {
    color: #000;
    font-size: 16px;
  }

  .el-menu-item,
  .el-sub-menu__title {
    height: 40px;
    line-height: 18px;
    color: #555555;
    font-size: 13px;

    &:hover {
      background-color: #eee;
      // background-color: #f8f8f8;
    }
    &:active {
      background-color: #68a0ff;
      color: #fff;
      font-weight: bold;
    }

    &.select-item {
      background-color: #68a0ff;
      color: #fff;
      font-weight: bold;
      border-right: 4px solid var(--el-color-primary);
      box-sizing: border-box;
    }
  }
  .el-sub-menu.select-item .el-sub-menu__title {
    background-color: #68a0ff;
    color: #fff;
    &:hover {
      background-color: #68a0ff;
      color: #fff;
    }
    &:active {
      background-color: #68a0ff;
      color: #fff;
      font-weight: normal;
    }
    .el-sub-menu__icon-arrow {
      color: #fff;
    }
    .el-icon svg {
      color: #fff;
    }
  }
}
</style>