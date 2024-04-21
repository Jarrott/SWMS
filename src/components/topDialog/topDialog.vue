<template>
  <div class="shop-content-wrap">
    <div class="shop-content-wrap-left">
      <img v-if="prop.currentTypeName==='shop'" src="@/assets/images/home/icon13.png" alt="" />
      <img v-if="prop.currentTypeName==='events'" src="@/assets/images/header/icon2.png" alt="" />
      <img v-if="prop.currentTypeName==='about'" src="@/assets/images/header/icon3.png" alt="" />
    </div>
    <div class="shop-content-wrap-right" :style="{'backgroundColor': data.leftTitleList[0].color}">
      <div class="link-box">
        <div class="left-products">
          <div class="title">{{ data.leftTitleList[0].sign }}</div>
          <div class="other-title" v-for="(l, lindex) in data.leftTitleList" :key="lindex" @click="handleJumpPath(l)">{{ l.title }}</div>
        </div>
        <div class="right-collection" v-if="data.rightTitleList.length>0">
          <div class="title">{{ data.rightTitleList[0].sign }}</div>
          <div class="other-title" v-for="(r, rindex) in data.rightTitleList" :key="rindex" @click="handleJumpPath(r)">{{ r.title }}</div>
        </div>
      </div>

      <div class="right-bottom-box" :style="{'backgroundColor': data.leftTitleList[0].bottomColor}">
        <div class="club">JOIN THE WORLDS MOST EXCITING WHISKY CLUB</div>
        <div class="btn translate-btn" @click="handleJumpJoin('join')">
          <span>JOIN</span>
          <span class="iconfont icon-xiangyou"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

interface Props {
  currentTypeName?: any; // shop、events、about
}
const prop = withDefaults(defineProps<Props>(), {
  currentTypeName: '',
});

const router = useRouter();
const route = useRoute();

const data = reactive({
  leftTitleList: [
    {
      title: 'ALL PRODUCTS',
      urlName: 'goodsList'
    },
    {
      title: 'MEMBERSHIPS',
      urlName: 'join'
    },
    {
      title: 'WHISKY',
      urlName: 'whisky',
      urlQueryParams: 'whisky'
    },
    {
      title: 'GIFT CARD',
      urlName: 'giftCard'
    },
    {
      title: 'BOTTLE OF THE MONTH',
      urlName: 'bottleMonth'
    }
  ] as any,
  rightTitleList: [
    {
      title: 'NEW RELEASES',
      urlName: 'collect'
    },
    {
      title: 'BUNDLES',
      urlName: 'bundles'
    },
    {
      title: 'VAULTS COLLECTION',
      urlName: 'vaults'
    },
    {
      title: 'SINGLE CASK SPIRITS',
      urlName: 'single'
    },
    {
      title: 'AMERICAN WHISKEY',
      urlName: 'american'
    }
  ] as any,
});


watch(
  () => prop.currentTypeName,
  (newValue) => {
    nextTick(() => {
      if (prop.currentTypeName === 'shop') {
        data.leftTitleList = [
          {
            title: 'ALL PRODUCTS',
            urlName: 'goodsList',
            sign: 'PRODUCTS',
            color: '#3A6A96',
            bottomColor: '#345F87',
          },
          {
            title: 'MEMBERSHIPS',
            urlName: 'join',
            sign: 'PRODUCTS',
            color: '#3A6A96'
          },
          {
            title: 'WHISKY',
            urlName: 'whisky',
            urlQueryParams: 'whisky',
            sign: 'PRODUCTS',
            color: '#3A6A96'
          },
          {
            title: 'GIFT CARD',
            urlName: 'giftCard',
            sign: 'PRODUCTS',
            color: '#3A6A96'
          },
          {
            title: 'BOTTLE OF THE MONTH',
            urlName: 'bottleMonth',
            sign: 'PRODUCTS',
            color: '#3A6A96'
          }
        ];
        data.rightTitleList = [
          {
            title: 'NEW RELEASES',
            urlName: 'collect',
            sign: 'COLLECTIONS',
          },
          {
            title: 'BUNDLES',
            urlName: 'bundles',
            sign: 'COLLECTIONS',
          },
          {
            title: 'VAULTS COLLECTION',
            urlName: 'vaults',
            sign: 'COLLECTIONS',
          },
          {
            title: 'SINGLE CASK SPIRITS',
            urlName: 'single',
            sign: 'COLLECTIONS',
          },
          {
            title: 'AMERICAN WHISKEY',
            urlName: 'american',
            sign: 'COLLECTIONS',
          }
        ];
      } else if (prop.currentTypeName === 'events') {
        data.leftTitleList = [
          {
            title: 'EVENTS',
            urlName: 'events',
            sign: 'EVENTS',
            color: '#ac599e',
            bottomColor: '#9c518f',
          },
          {
            title: 'LIVE STREAMS',
            urlName: 'liveStreams',
            sign: 'EVENTS',
            color: '#ac599e'
          },
          {
            title: 'PRIVATE TASTINGS',
            urlName: 'privateTastings',
            sign: 'EVENTS',
            color: '#ac599e'
          },
        ];
        data.rightTitleList = [];
      } else if (prop.currentTypeName === 'about') {
        data.leftTitleList = [
          {
            title: 'VENUES',
            urlName: 'venues',
            sign: 'For Members',
            color: '#2e2e2d',
            bottomColor: '#2a2a28',
          },
          {
            title: 'UNFILTERED MAGAZINE',
            urlName: 'unfilteredMagazine',
            sign: 'For Members',
            color: '#2e2e2d'
          },
          {
            title: 'WHERE TO FIND US',
            urlName: 'whereToFindUs',
            urlQueryParams: 'whisky',
            color: '#2e2e2d'
          },
          {
            title: 'TASTING NOTE ARCHIVE',
            urlName: 'tastingNote',
            sign: 'For Members',
            color: '#2e2e2d'
          },
        ];
        data.rightTitleList = [
          {
            title: 'HISTORY',
            urlName: 'hhistory',
            sign: 'ABOUT',
          },
          {
            title: 'OUR WHISKY',
            urlName: 'ourWhisky',
            sign: 'ABOUT',
          },
          {
            title: 'NEWS',
            urlName: 'news',
            sign: 'ABOUT',
          },
          {
            title: 'FLAVOUR PROFILES',
            urlName: 'flavourProfiles',
            sign: 'ABOUT',
          },
          {
            title: 'CONTACT',
            urlName: 'contact',
            sign: 'ABOUT',
          }
        ];
      }
    })
  },
  { immediate: true, deep: true }
);


// join
const handleJumpJoin = (name: string) => {
  router.push({ name });
};

const emit = defineEmits(['change-elMain']);
const handleJumpPath = (item: any) => {
  emit('change-elMain', item);
};

onMounted(() => {
  
});

</script>
<style lang="scss" scoped>
.shop-content-wrap {
  padding: 0 3.5%;
  justify-content: space-between;
  display: flex;
  height: 90%;

  &-left {
    width: 40%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      animation: zoom-in-out 1.5s ease;
    }

    @keyframes zoom-in-out {
      0%{
        width: 108%;
      }
      100% {
        width: 100%;
      }
    }

  }

  &-right {
    width: 60%;
    background: #3A6A96;
    box-sizing: border-box;
    color: #ffffff;
    font-size: 24px;
    font-weight: 500;
    font-family: 'Oswald-Medium';
    position: relative;
   
    .link-box {
      display: flex;
      justify-content: space-between;
      padding: 64px 84px 0px 84px;
      

      .left-products, .right-collection {
        animation: opacity-in-out .6s ease;
      }

      @keyframes opacity-in-out {
        0%{
          transform: translateY(20%);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .right-collection {
        animation: opacity-right-in-out .6s ease;
      }

      @keyframes opacity-right-in-out {
        0%{
          transform: translateY(20%);
          opacity: 0;
        }
        50%{
          transform: translateY(20%);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .title {
        border-bottom: 1px solid #fff;
        padding-bottom: 16px;
        width: 360px;
        font-size: 16px;
        letter-spacing: 1.8px;
        text-transform: uppercase;
        margin-bottom: 20px;
      }

      .other-title {
        padding: 16px 0 0;
        cursor: pointer;
      }
    }

    .right-bottom-box {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 160px;
      background: #345F87;
      box-sizing: border-box;
      padding: 48px 84px 48px 84px;
      display: flex;

      .club {
        width: 320px;
      }

      .btn {
        width: 360px;
        height: 64px;
        padding: 0px 24px;
        border: 4px solid #FFF;
        box-sizing: border-box;
        line-height: 64px;
        position: relative;
        margin-left: 130px;
        cursor: pointer;

        &:hover {
          background: #fff;
          color: #2E2E2D;
        }
        
        .icon-xiangyou {
          position: absolute;
          right: 24px;
          font-size: 28px;
        }
      }
    }

  }
}
</style>

