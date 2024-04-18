<template>
  <div class="goods-page-wrap">
    <GoodsListFilter title="ALL WHISKY" type="whisky"></GoodsListFilter>

    <div class="list-box">
      <div class="row-item" v-for="(goodsItem, index) in data.goodsListData" :key="index">
        <GoodsItem :goodsItem="goodsItem"></GoodsItem>
      </div>
    </div>

  </div>
</template>
<script lang="ts" setup>
import GoodsListFilter from "@/components/good-list-filter/good-list-filter.vue";
import GoodsItem from "@/components/goods-item/goods-item.vue";

import { WHISKY_GOODS_LIST } from "@/utils/simulatedData";

const router = useRouter();
const route = useRoute();
const {
  query: { type },
} = route;


const drawer = ref(false);

const data = reactive({
  goodsListData: WHISKY_GOODS_LIST,
});


</script>

<style lang="scss" scoped>
.goods-page-wrap {
  padding: 0 4.5%;
  box-sizing: border-box;
  font-style: normal;
  font-family: 'Oswald-Medium';

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