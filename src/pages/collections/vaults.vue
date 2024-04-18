<template>
  <div class="collec-page-wrap">
   <GoodsListFilter title="THE VAULTS COLLECTION" type="vaults"></GoodsListFilter>
   <div class="desc">
     <span class="strong">The Vaults Collection</span>
     <span class="common"> is a selection of the </span>
    <span class="strong">finest and rarest single cask, single malt whisky, </span>
    <span class="common">
      set aside from The Scotch Malt Whisky Society’s most remarkable stocks over the years. They have been released from the depths of our treasure trove of casks, after decades of slow maturation and careful nurturing. The Vaults Collection represents the whisky lover’s dream
    </span>
    <span class="strong">A chance to journey back into whisky history, </span>
    <span class="common">
      including the opportunity to experience styles or distilleries that no longer exist. The Collection takes its name from the Society’s historical home at The Vaults in Leith, Scotland’s oldest commercial building in continuous use whose connection with the drinks world dates back to the 12th century. Each bottle has a specially designed label and is offered in a beautiful wooden box.
    </span>
   </div>
   <div class="list-box">
     <div class="row-item" v-for="(item, index) in data.goodsList" :key="index">
       <GoodsItem :goodsItem="item"></GoodsItem>
     </div>
   </div>
  </div>
</template>
<script lang="ts" setup>
import GoodsListFilter from "@/components/good-list-filter/good-list-filter.vue";
import GoodsItem from "@/components/goods-item/goods-item.vue";

import { VAULTS_GOODS_LIST } from "@/utils/simulatedData";

const router = useRouter();
const route = useRoute();

const {
  query: { id },
} = route;

const data = reactive({
  goodsList: VAULTS_GOODS_LIST,
  
});

const handleChange = (item: any) => {
  item.isOpen = !item.isOpen;
};

const handleJump = (name: string) => {
  router.push({name})
};
</script>

<style lang="scss" scoped>
.collec-page-wrap {
  padding: 0 4.5%;
  box-sizing: border-box;
  font-style: normal;
  flex-shrink: 0;
  color: #2E2E2D;

  .desc {
    font-size: 20px;
    font-style: italic;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: 0.4px;
    margin-top: 60px;
    padding: 0 210px;
    box-sizing: border-box;
    
    .common {
      font-family: 'Georgia-Italic';
    }
    .text-underline {
      text-decoration: underline;
      cursor: pointer;
    }
    span {
      font-weight: 600;
    }
  }

  .list-box {
    display: flex;
    margin-top: 124px;
    flex-wrap: wrap;
    width: 100%;

    .row-item {
      border: 1px solid #C1C1C1;
      background: #FFF;
      display: inline-flex;
      width: calc(25% - 16px);
      box-sizing: border-box;
      padding: 0px 22px 24px 22px;
      flex-direction: column;
      color: #2E2E2D;
      font-family: 'Oswald-Regular';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 21px;
      letter-spacing: 1.4px;
      margin-right: 16px;
      margin-bottom: 120px;
      position: relative;

      &:nth-child(4n) {
        margin-right: 0;
      }
      
    }
  }
  
}
</style>