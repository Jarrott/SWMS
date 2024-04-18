<template>
  <div class="common-goods-item-box">

    <img class="new-icon" v-if="prop.goodsItem.isNew&&prop.goodsItem.page=='goodlist'" src="@/assets/images/goods/new.png" alt="">
    <div class="new-icon1" v-if="prop.goodsItem.isNew&&prop.goodsItem.page!=='goodlist'">NEW</div>
    <img class="right-icon" v-if="prop.goodsItem.isRightIcon" :src="prop.goodsItem.isRightIcon" alt="">
    <img class="sign-icon" v-if="prop.goodsItem.isSignIcon" :src="prop.goodsItem.isSignIcon" alt="">

    
    <template v-if="prop.goodsItem.type==0 || prop.goodsItem.type==1">
      <div @click.stop="handleJumpDetails(prop.goodsItem.id)" class="img-box" v-if="prop.goodsItem.type==0"><img class="item-icon" src="@/assets/images/goods/icon1.png" alt="" /></div>
      <div @click.stop="handleJumpDetails(prop.goodsItem.id)" class="img-box" v-else-if="prop.goodsItem.type==1"><img class="item-icon" src="@/assets/images/goods/icon2.png" alt="" /></div>
      <div class="text">{{ prop.goodsItem.no }}</div>
      <div class="title">{{ prop.goodsItem.title }}</div>
    </template>

    <template v-else>
      <div class="img-box" @click.stop="handleJumpDetails(prop.goodsItem.id)">
        <img class="goods-icon" :src="prop.goodsItem.img" alt="" />
      </div>
      <div class="info-box" v-if="prop.goodsItem.type === 2">
        <div class="text1">{{ prop.goodsItem.no }}</div>
        <div class="title bottom-title" :style="`color: ${prop.goodsItem.color};`">{{ prop.goodsItem.title }}</div>
        <div class="info-item flavour">
          <span class="label">FLAVOUR:</span>
          <span class="value" :style="`color: ${prop.goodsItem.color};`">{{ prop.goodsItem.flavour }}</span>
        </div>
        <div class="info-item">
          <span class="label">AGE:</span>
          <span class="value">{{ prop.goodsItem.age }}</span>
        </div>
        <div class="info-item">
          <span class="label">REGION:</span>
          <span class="value">{{ prop.goodsItem.region }}</span>
        </div>
        <div class="info-item">
          <span class="label">CASK:</span>
          <span class="value">{{ prop.goodsItem.cask }}</span>
        </div>
      </div>
      <div class="info-desc-box" v-if="prop.goodsItem.type === 3">
        <div class="text2">{{ prop.goodsItem.no }}</div>
        <div class="title">{{ prop.goodsItem.title }}</div>
        <div class="desc">{{ prop.goodsItem.desc }}</div>
      </div>
      <div class="price-box flex">
        <span>${{ prop.goodsItem.price1 }}</span>
        <span>{{ prop.goodsItem.price2 }} left</span>
      </div>
    </template>

    <div class="btn-box flex">
      <div class="btn btn1 flex" v-if="prop.goodsItem.type===1" @click.stop="handleJumpName('cart')">
        <span>ADD TO CART</span>
        <span class="iconfont icon-xiangyou"></span>
      </div>

      <div class="btn btn1 flex" v-else
      :style="[prop.goodsItem.hovered ? `border:1px solid ${prop.goodsItem.color};color: ${prop.goodsItem.color};background:#fff;`: `background: ${prop.goodsItem.color};border:1px solid ${prop.goodsItem.color};color:#fff;`]"
      @mouseover="prop.goodsItem.hovered = true"
      @mouseleave="prop.goodsItem.hovered = false" @click.stop="handleJumpName('join')">
        <span>JOIN</span>
        <span class="iconfont icon-xiangyou" ></span>
      </div>

      <div class="btn btn2 flex"
      :style="[prop.goodsItem.hovered1 ? `background: ${prop.goodsItem.color};border:1px solid ${prop.goodsItem.color};color:#fff;` : `border:1px solid ${prop.goodsItem.color};color: ${prop.goodsItem.color};background:#fff;`]"
      @mouseover="prop.goodsItem.hovered1 = true"
      @mouseleave="prop.goodsItem.hovered1 = false"
      @click.stop="handleJumpDetails(prop.goodsItem.id)">
        <span>MORE INFO</span>
        <span class="iconfont icon-xiangyou"></span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  goodsItem?: any;
}
const prop = withDefaults(defineProps<Props>(), {
  goodsItem: {} as any,
});

const router = useRouter();

// 跳转
const handleJumpName = (name: string) => {
  router.push({ name })
};

// 跳转详情
const handleJumpDetails = (id: number) => {
  router.push({
    name: 'goodsDetail',
    query: {
      id
    }
  })
};
</script>
<style lang="scss" scoped>
.common-goods-item-box {
  .new-icon {
    position: absolute;
    top: -50px;
    left: -1px;
    width: 75px;
  }

  .new-icon1 {
    position: absolute;
    top: 25px;
    left: -76px;
    width: 75px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: linear-gradient(90deg,#9c7760,#d1b19c 50%,#b18f76);
    color: #fff;
    font-family: Oswald,sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    transform: rotate(270deg);
    transform-origin: top right;
  }

  .right-icon {
    width: 80px;
    height: 80px;
    position: absolute;
    top: -40px;
    right: 16px;
  }

  .sign-icon {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 44px;
    right: 16px;
  }

  .img-box {
    width: 100%;
    text-align: center;
    cursor: pointer;
  }

  .item-icon {
    width: 327px;
    height: 406px;
  }

  .goods-icon {
    // width: 100px;
    height: 400px;
    position: relative;
    top: -60px;
  }

  .text {
    margin-top: 212px;
  }

  .title {
    font-family: 'Oswald-Medium';
    font-size: 25px;
    font-weight: 500;
    line-height: 25px;
    letter-spacing: 0.25px;
    margin: 6px 0 16px;
    text-transform: uppercase;
  }

  .btn-box {
    width: 100%;
    // position: absolute;
    // bottom: 24px;

    .btn {
      flex: 1;
      border: 1px solid #2E2E2D;
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      font-weight: 600;
      font-family: 'Oswald-Medium';
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 20px;
      cursor: pointer;

      .icon-xiangyou {
        font-size: 22px;
      }

      &.btn1 {
        background: #2E2E2D;
        color: #fff;
      }

      &.btn1:hover {
        background: #fff;
        color: #2E2E2D;

        .icon-xiangyou {
          transform: translate(5px);
          transition: all .2s linear;
        }
      }

      &.btn2:hover {
        .icon-xiangyou {
          transform: translate(5px);
          transition: all .2s linear;
        }
      }
    }
  }

  .text1 {
    // margin-top: 43px;
  }

  .info-item {
    font-family: 'Oswald-Medium';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0.28px;
    border-bottom: 1px solid #707070;
    box-sizing: border-box;
    padding-bottom: 6px;
    padding-top: 6px;

    &.flavour {
      border-top: 1px solid #707070;
    }

    .label {
      width: 80px;
      display: inline-block;
    }

    .value {
      font-family: 'Oswald-Regular';
      font-weight: 400;
      margin-left: 30px;
      white-space: nowrap;
      width: calc(100% - 130px);
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .info-desc-box {
    .desc {
      font-family: 'Georgia-Regular';
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.4px;
      height: 158px;
    }
  }

  .price-box {
    width: 100%;
    justify-content: space-between;
    margin: 18px 0 15px;
    font-family: 'Oswald-Medium';
    font-size: 25px;
    font-weight: 500;
    line-height: 27px;
  }
  
}
</style>
