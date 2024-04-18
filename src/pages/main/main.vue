<template>
  <div class="common-layout">
    <el-container>

      <el-header class="header-wrap">
        <div class="header-wrap-main" :class="headerHidden ? 'show-header' : 'hidden-header'">
          <div class="logo-box" @click="handleJumpUrl('home')">
            <img src="@/assets/images/home/logo.png" alt="" />
          </div>
           <div class="right-wrap">
            <div class="box-wrap" v-for="(item, index) in headerTypeList" :key="index" @click="handleTopClick(item, index)">
              <span>{{ item.name }}</span>
              <img class="icon-arrow" :class="{'arrowTransform': currentTypeIndex==index&&item.active}" src="@/assets/images/home/arrow-down.png" alt="" />
            </div>

            <!-- <div class="box-wrap" @click="handleTopClick('shop')">
              <span>SHOP</span>
              <img class="icon-arrow" :class="{'arrowTransform': currentTypeName=='shop'}" src="@/assets/images/home/arrow-down.png" alt="" />
            </div>
            <div class="box-wrap" @click="handleTopClick('events')">
              <span>EVENTS</span>
              <img class="icon-arrow" :class="{'arrowTransform': currentTypeName=='events'}" src="@/assets/images/home/arrow-down.png" alt="" />
            </div>
            <div class="box-wrap" @click="handleTopClick('about')">
              <span>ABOUT</span>
              <img class="icon-arrow" :class="{'arrowTransform': currentTypeName=='about'}" src="@/assets/images/home/arrow-down.png" alt="" />
            </div> -->
            <div class="join-box" @click="handleJumpUrl('join')">JOIN</div>
            <img class="right-icon" src="@/assets/images/home/search.png" alt="" @click="handleSearch" />
            <img class="right-icon" src="@/assets/images/home/user.png" alt="" @click="handleLogin" />
            <div class="cart-box">
              <img class="right-icon" src="@/assets/images/home/shopping-cart.png" alt="" @click="handleJumpUrl('cart')" />
              <div class="badge">3</div>
            </div>
          </div>
          <div class="header-bottom-line"></div>
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
        <el-main class="main-wrap" @scroll.passive="handleScroll($event)" @mousewheel="mouseWheel">
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
          <div class="top-dialog-content">
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

const headerHidden: boolean = ref(true);

const route = useRoute();
const router = useRouter();

const drawerDialog = ref(false);
const notFooterUrlList: any = ref(['shop', 'event', 'about']);
const isShowRouter = ref(true); // 是否显示路由容器
const currentTypeName = ref(''); // shop、events、about
const currentTypeIndex = ref(-1);
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
])

// console.log('>>>>>>', window.location);


const searchValue = ref('');

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

const handleTopClick = (item: any, index: number) => {
  currentTypeName.value = item.name;
  item.active = !item.active;
  currentTypeIndex.value = index;

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
