<template>
  <div class="common-layout">
    <el-container>

      <el-header class="header-wrap">
        <div class="header-wrap-main" :class="headerHidden ? 'show-header' : 'hidden-header'">
          <div class="logo-box" @click="clickTitle">
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
            <div class="join-box">JOIN</div>
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

      <el-container>
        <el-main class="main-wrap" id="mainContent">
          <!-- 提示 -->
          <div >
            <div v-if="$route.meta.title">
              <el-scrollbar class="page-scrollbar">
                <div class="page-wrap">
                  <router-view v-slot="{ Component }">
                    <keep-alive :include="cacheRE">
                      <component
                        :is="Component"
                        @clear-cache="clearCache"
                        @get-update="getUpdate"
                        @set-update="setUpdate"
                      />
                    </keep-alive>
                  </router-view>
                </div>
              </el-scrollbar>
            </div>
            <router-view
              v-else
              ref="RouterView"
              :key="$route.path"
              @channel-name="setChannelName"
            ></router-view>
          </div>
        </el-main>
        <el-footer>
          <Footer></Footer>
        </el-footer>
      </el-container>
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
const topHeight = ref(0);

const drawerDialog = ref(false);

const searchValue = ref('');

const orgObj = reactive({
  id: '-1',
  channelName: '',
});

const setChannelName = (str: any) => {
  orgObj.channelName = str;
};

const handleSearch = () => {
  drawerDialog.value = true;
};

const handleLogin = () => {
  router.push({
    path: '/login',
  });
};

// 返回首页
const clickTitle = () => {
  router.push({
    path: '/home',
  });
};

const handleScroll = () => {
  let tempTop = (document.getElementById("mainContent")).getBoundingClientRect().top;

  if (tempTop < 0) {
    headerHidden.value = false;
  } else if (tempTop > 0 || tempTop === 120) {
    headerHidden.value = true;
  }
};

onMounted(() => {
  topHeight.value = (document.getElementById("mainContent")).getBoundingClientRect().top;
  window.addEventListener('scroll', handleScroll, true);
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
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
