<template>
  <div class="collec-page-wrap">
   <GoodsListFilter title="SINGLE CASK SPIRITS" type="single"></GoodsListFilter>
   <div class="desc">
     <span class="common">Our passion to seek out the finer things in life has led to our</span> 
     <span class="strong"> Single Cask Spirits</span>
     <span class="common"> collection, the result of a collaboration between the most creative and skilled distillers, a carefully selected team of category ambassadors who are experts in their fields, and our own Tasting Panel – which is always the final voice when it comes to assessing and approving a bottle to ensure quality. Discover single cask rum, gin, cognac, and armagnac to expand your flavour palate and embrace the wonderful wider world of the single cask. </span>
    
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

import { SINGLE_GOODS_LIST } from "@/utils/simulatedData";

const router = useRouter();
const route = useRoute();

const {
  query: { id },
} = route;

const data = reactive({
  goodsList: SINGLE_GOODS_LIST,
  
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