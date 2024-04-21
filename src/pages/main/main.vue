<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-wrap">
        <div class="header-wrap-main" :class="headerHidden ? 'show-header' : (userStore.userInfo.userId ? 'hidden-header2' : 'hidden-header')">
          <!-- 登录之后展示用户信息 start-->
          <div class="user-box" v-if="userStore && userStore.userInfo && userStore.userInfo.userId">
            <div class="user-left flex">
              <img class="user-img" src="@/assets/images/header/user.png" alt="" />
              <span class="user-name">{{ userStore.userInfo?.email }}</span>
              <span class="user-id">JP{{ userStore.userInfo?.userId }}</span>
              <span class="user-period">Validity Period：2024/06/30</span>
            </div>
            <div class="user-right flex" @click="handleLogout">
              <img class="user-img" src="@/assets/images/header/logout.png" alt="" />
              <span class="log-out">LOG OUT</span>
            </div>
          </div>
          <!-- 登录之后展示用户信息 end-->

          <!-- 头部信息 start-->
          <div class="main-content">
            <div class="logo-box" @click="handleJumpUrl('home')">
              <img src="@/assets/images/home/logo.png" alt="" />
            </div>
            <div class="right-wrap">
              <div class="box-wrap"
                v-for="(item, index) in headerTypeList" :key="index"
                @click="handleTopClick(item, index)">
                <span>{{ item.name }}</span>
                <img class="icon-arrow" :class="{'arrowTransform': item.active}" src="@/assets/images/home/arrow-down.png" alt="" />
              </div>
              <div class="join-box" @click="handleJumpUrl('join')">JOIN</div>
              <img class="right-icon" src="@/assets/images/home/search.png" alt="" @click="handleSearch" />
              <img class="right-icon" src="@/assets/images/home/user.png" alt="" @click="handleLogin" />
              <div class="cart-box">
                <img class="right-icon" src="@/assets/images/home/shopping-cart.png" alt="" @click="handleJumpUrl('cart')" />
                <div class="badge" v-if="badgeNum>0">{{ badgeNum }}</div>
              </div>
            </div>
          </div>
          <div class="header-bottom-line"></div>
          <!-- 头部信息 end-->
        </div>

        <!-- 搜索 start -->
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
        <!-- 搜索 end -->

      </el-header>

      <template v-if="isShowRouter">
        <el-main class="main-wrap"
        :class="(userStore.userInfo.userId&&!headerHidden)?'main-wrap2':(!userStore.userInfo.userId&&headerHidden ? 'main-wrap3': '')"
        @scroll.passive="handleScroll($event)" @mousewheel="mouseWheel">
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
      </template>

      <template v-else>
        <el-main class="top-main-wrap">
          <div class="top-dialog-content" :class="(userStore.userInfo.userId) ? 'top-dialog-content2':''">
            <TopDialog :currentTypeName="currentTypeName" @change-elMain="changeElMain"></TopDialog>
          </div>
        </el-main>
      </template>

    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Footer from './footer.vue';
import TopDialog from '@/components/topDialog/topDialog.vue';
import {cartGoodsStore} from '@/store/cart';
import {useUserStore} from '@/store/user';
const cartStore = cartGoodsStore();
const userStore = useUserStore();

const headerHidden: boolean = ref(true);

const route = useRoute();
const router = useRouter();

const drawerDialog = ref(false);
const isShowRouter = ref(true); // 是否显示带有footer的路由容器
const currentTypeName = ref(''); // shop、events、about
const headerTypeList = ref([
  {
    name: 'shop',
    active: false,
  },
  {
    name: 'events',
    active: false,
  },
  {
    name: 'about',
    active: false,
  }
]);
const badgeNum = computed(() => cartStore.getCartNum); // 头部购物车角标

const searchValue = ref('');

// 头部搜索项
const handleSearch = () => {
  drawerDialog.value = true;
};

// 跳转登录
const handleLogin = () => {
  if (userStore.userInfo.userId) {
    router.push({
      path: '/mine',
    });
  } else {
    router.push({
      path: '/login',
    });
  }
};

// 路由跳转
const handleJumpUrl = (urlName: string) => {
  isShowRouter.value = true;
  router.push({
    name: urlName,
  });
};

const handleTopClick = (item: any, index: number) => {
  if (currentTypeName.value !== item.name) {
    headerTypeList.value.map((tb:any) => {
      tb.active = false;
      isShowRouter.value = true
    })
  }
  currentTypeName.value = item.name;
  item.active = !item.active;
  isShowRouter.value = !isShowRouter.value;
};

const changeElMain = (item: any) => {
  isShowRouter.value = true;
  if (item.urlQueryParams) {
    router.push({
      name: item.urlName,
      query: { type: item.urlQueryParams },
    });
  } else {
    router.push({ name: item.urlName });
  }
}

const mouseWheel = (e?: any) => {
  if (e.wheelDelta || e.detail) {
    if (e.wheelDelta > 0 || e.detail < 0) {
      headerHidden.value = true;
    }
    if (e.wheelDelta < 0 || e.detail > 0) {
      headerHidden.value = false;
    }
  }
};

// 退出登录
const handleLogout = () => {
  ElMessageBox.confirm('Are you sure you want to log out', 'Tip', {
    confirmButtonText: 'confirm',
    cancelButtonText: 'cancel',
    type: 'warning',
  }).then(() => {
    userStore.$reset();
    window.localStorage.removeItem('token');
  });
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
