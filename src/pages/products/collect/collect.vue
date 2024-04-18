<template>
  <div class="collec-page-wrap">
   <GoodsListFilter title="New Outturn Offerings" type="collect"></GoodsListFilter>
   <div class="desc">
     <span class="common">Create your very own</span> 
     <span class="strong"> Spring Whisky Adventures</span>
     <span class="common"> with </span>
    <span class="strong">eight (8) newly released Society casks</span>
    <span class="common">
      from the Highlands, Speyside and Islay! Diversity of flavours in our whisky keeps things interesting
      and keeps connoisseurs of flavour (like us!) asking questions. And the questions
      that lead to a greater overall understanding of the subject are the best part.
      That’s why it’s so important for each of us to keep the experience fresh for ourselves and explore new styles from different distilleries and cask types. 
      The joy in discovering something new is what drives those of us who rejoice in the quirky,
      enlightening individuality of Society single malt whisky! This month,
      we push the frontiers of flavour by presenting a 
    </span>
    <span class="strong">different flavour profile for each whisky released</span>
    <span class="common">
      ! From “Young & Spritely” to “Peated”,
    there is a new taste adventure for each of us in the casks that follow!
    </span>
    <br/><br/>
    <span class="common">Our </span><span class="strong">Spring Whisky Adventures bundle</span>
     <span class="common">
       features four casks with a stunning spectrum of aromas and flavours to indulge in.
     And remember, any order of 3 or more Society bottles will receive 
     </span>
     <span class="strong">FREE GROUND SHIPPING</span> <span class="common">in the continental US! The Society’s</span> 
     <span class="strong">Scott Brunow</span><span class="common"> and </span> <span class="strong">Linh Do</span>
      <span class="common">sat down last night to taste several casks from today’s release. </span>
      <span class="text-underline">
        Click here to check out the April Outturn Preview Tasting
      </span>
       <span class="common"> for more information on select casks.</span>
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

import { COLLECT_GOODS_LIST } from "@/utils/simulatedData";

const router = useRouter();
const route = useRoute();

const {
  query: { id },
} = route;

const data = reactive({
  goodsList: COLLECT_GOODS_LIST,
  
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