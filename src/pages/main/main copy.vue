<template>
  <div class="common-layout">
    <el-container>

      <el-header class="header-wrap">
        <div class="header-wrap-main" :class="{'header-hidden': headerHidden}">
          <div class="logo-box" @click="clickTitle">
            <img src="@/assets/images/home/logo.png" alt="">
          </div>
           <div class="right-wrap">
            <div class="box-wrap">
              <span>{{headerHidden}}---</span>
              <span>SHOP</span>
              <img class="icon-arrow" src="@/assets/images/home/arrow-down.png" alt="">
            </div>
            <div class="box-wrap">
              <span>EVENTS</span>
              <img class="icon-arrow" src="@/assets/images/home/arrow-down.png" alt="">
            </div>
            <div class="box-wrap">
              <span>ABOUT</span>
              <img class="icon-arrow" src="@/assets/images/home/arrow-down.png" alt="">
            </div>
            <div class="join-box">JOIN</div>
            <img class="right-icon" src="@/assets/images/home/search.png" alt="">
            <img class="right-icon" src="@/assets/images/home/user.png" alt="">
            <img class="right-icon" src="@/assets/images/home/shopping-cart.png" alt="">
          </div>
        </div>
      </el-header>

      <el-container>
        <el-main class="main-wrap" >
          <!-- 提示 -->
          <div id="mainContent">
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
import { exit, bntAuth } from '@/utils/utils';
import { cloneDeep } from 'lodash';

const proxy: any = getCurrentInstance()?.proxy;

const headerHidden: boolean = ref(false);

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
const menuRef = ref();
const subMenuRef = ref();

const accountName = window.localStorage.getItem('accountName');

const orgRef = ref();
const orgObj = reactive({
  id: '-1',
  name: window.localStorage.getItem('orgName') || '平台',
  options: [] as any,
  isClick: true,
  channelName: '',
});
// 读取缓存中平台信息
const cid = window.localStorage.getItem('channelId');
const oid = window.localStorage.getItem('orgId');
if (oid) {
  orgObj.id = oid;
} else if (cid) {
  orgObj.id = cid;
}

const setChannelName = (str: any) => {
  orgObj.channelName = str;
};

// 显示大屏
const clickTitle = () => {
  
};

const handleScroll = () => {
  // console.log('test', );
  // let header = document.getElementById("mainContent")
  // console.log('test22222', header.top);
  
  // console.log('2', window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
  
  // const currentPosition: any = window.pageYOffset || document.documentElement.scrollTop;
  const scrollTop: any = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>', scrollTop);
  
  headerHidden.value = scrollTop > 0;
};

onMounted(() => {
  let header = document.getElementById("mainContent")
  // console.log('test', header.offsetTop);
  
  // console.log('1', window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
  
  
  setTimeout(() => {
    window.addEventListener('scroll', handleScroll, true);
  }, 500);
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
</style>