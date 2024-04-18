<template>
  <div class="shop-content-wrap">
    <div class="shop-content-wrap-left"></div>
    <div class="shop-content-wrap-right">
      <div class="link-box">
        <div class="left-products">
          <div class="title">PRODUCTS</div>
          <div class="other-title" v-for="(l, lindex) in data.leftTitleList" :key="lindex" @click="handleJumpPath(l)">{{ l.title }}</div>
        </div>
        <div class="right-collection">
          <div class="title">COLLECTIONS</div>
          <div class="other-title" v-for="(r, rindex) in data.rightTitleList" :key="rindex" @click="handleJumpPath(r)">{{ r.title }}</div>
        </div>
      </div>

      <div class="right-bottom-box">
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

const router = useRouter();

const data = reactive({
  email: '',
  password: '',
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
      urlName: 'goodsList',
      urlQueryParams: 'whisky'
    },
    {
      title: 'GIFT CARD',
      urlName: 'giftCard'
    },
    {
      title: 'BOTTLE OF THE MONTH',
      urlName: 'bottle-of-the-month'
    }
  ] as any,
  rightTitleList: [
    {
      title: 'NEW RELEASES',
      urlName: 'new-outturn-offerings'
    },
    {
      title: 'BUNDLES',
      urlName: 'special-bundle-v2'
    },
    {
      title: 'VAULTS COLLECTION',
      urlName: ''
    },
    {
      title: 'SINGLE CASK SPIRITS',
      urlName: ''
    },
    {
      title: 'AMERICAN WHISKEY',
      urlName: ''
    }
  ] as any,
});

// join
const handleJumpJoin = (name: string) => {
  router.push({ name });
};

const handleJumpPath = (item: any) => {
  if (item.urlQueryParams) {
    router.push({
      name: item.urlName,
      query: { type: item.urlQueryParams },
    });
  } else {
    router.push({ name: item.urlName });
  }
};


</script>

<style lang="scss" scoped>
.shop-content-wrap {
  padding: 0 4.5%;
  justify-content: space-between;
  display: flex;
  height: 84vh;

  &-left {
    width: 40%;
    background: url('@/assets/images/home/icon13.png') no-repeat;
    background-size: 100%;
    background-color: #3A6A96;
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
        padding: 16px 0;
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