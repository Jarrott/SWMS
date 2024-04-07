<template>
  <div class="common-layout">
    <el-container>

      <el-header class="header-wrap">
        <div class="header-wrap-main" :class="headerHidden ? 'show-header' : 'hidden-header'">
          <div class="logo-box" @click="handleJumpUrl('home')">
            <img src="@/assets/images/home/logo.png" alt="" />
          </div>
           <div class="right-wrap">
            <div class="box-wrap">
              <span>SHOP</span>
              <img class="icon-arrow" src="@/assets/images/home/arrow-down.png" alt="" />
            </div>
            <div class="box-wrap">
              <span>EVENTS</span>
              <img class="icon-arrow" src="@/assets/images/home/arrow-down.png" alt="" />
            </div>
            <div class="box-wrap">
              <span>ABOUT</span>
              <img class="icon-arrow" src="@/assets/images/home/arrow-down.png" alt="" />
            </div>
            <div class="join-box" @click="handleJumpUrl('join')">JOIN</div>
            <img class="right-icon" src="@/assets/images/home/search.png" alt="" @click="handleSearch" />
            <img class="right-icon" src="@/assets/images/home/user.png" alt="" @click="handleLogin" />
            <img class="right-icon" src="@/assets/images/home/shopping-cart.png" alt="" />
          </div>
          <div class="header-bottom-line"></div>
        </div>

        <el-drawer
          v-model="drawerDialog"
          :with-header="false"
          :show-close="false"
          size="105"
          class="custom-drawer-box"
          direction="ttb">
          <el-input v-model="searchValue" class="search-input" placeholder="Search the collection"></el-input>
          <div class="iconfont icon-chahao" @click="drawerDialog=false"></div>
        </el-drawer>
      </el-header>

      <el-main class="main-wrap" id="mainContent" @scroll.passive="handleScroll($event)" @mousewheel="mouseWheel">
        <div>
          <el-scrollbar class="page-scrollbar">
            <div class="page-wrap">
              <router-view
                ref="RouterView"
                :key="$route.fullPath"
              ></router-view>
            </div>
          </el-scrollbar>
        </div>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>

    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Footer from './footer.vue';

const headerHidden: boolean = ref(true);

// 缓存组件正则，需要缓存的组件，务必配置 name 字段，且满足该正则
let cacheRE = ref(/^.*List$/);
// 清除缓存，一级菜单切换时使用
const clearKeepAliveCache = () => {
  cacheRE.value = new RegExp(`^${Date.now()}$`);
  nextTick(() => {
    cacheRE.value = /^.*List$/;
  });
  isUpdate.value = false;
};
let isUpdate = ref(false);
const clearCache = () => {
  isUpdate.value = true;
};
const getUpdate = (callback: any) => {
  callback(isUpdate.value);
};
const setUpdate = (flag: boolean) => {
  isUpdate.value = flag;
};

const route = useRoute();
const router = useRouter();

const drawerDialog = ref(false);

const searchValue = ref('');

watch(() => route,(newValue) => {
    nextTick(() => {
      clearKeepAliveCache();
    })
  },
  { immediate: true, deep: true }
);

// 头部搜索项
const handleSearch = () => {
  drawerDialog.value = true;
};

// 跳转登录
const handleLogin = () => {
  router.push({
    path: '/login',
  });
};

// 路由跳转
const handleJumpUrl = (urlName: string) => {
  router.push({
    name: urlName,
  });
};

const mouseWheel = (e?: any) => {
  if (e.wheelDelta || e.detail) {
    if (e.wheelDelta > 0 || e.detail < 0) {
      headerHidden.value = true;
    }
    if (e.wheelDelta < 0 || e.detail > 0) {
      headerHidden.value = false;
    }
  }
}

onMounted(() => {
  // window.addEventListener('scroll', handleScroll, true);
});
onBeforeUnmount(() => {
  // window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped>
@import './main.scss';
.el-footer {
  padding: 0!important;
}

.search-input {
  height: 45px;
  border: 1px solid #2e2e2d;
  box-sizing: border-box;
  color: #2E2E2D;
  font-family: 'Oswald-Regular';

  :deep(.el-input__wrapper) {
    border-radius: 0;
    border: 0;
    
  }
}
</style>
<style lang="scss">
.common-layout {
  .el-overlay {
  }
}
.custom-drawer-box {
  box-sizing: border-box;
  box-shadow: 0 0 25px 5px rgba(0,0,0,.5);
  transform: translateY(0);
  overflow: hidden;

  .icon-chahao {
    font-size: 28px;
    font-weight: 700;
    margin-left: 8px;
    cursor: pointer;
  }

  .el-drawer__body {
    display: flex;
    align-items: center;
    padding: 30px 60px 30px 30px;
    overflow: hidden;
  }
}
</style>
