import { defineStore } from 'pinia';
import { ref } from 'vue';

export const cartGoodsStore = defineStore('cart', {
  state: () => ({
    carGoodsList: [] as any,
    cartNum: 9,
  }),
  getters: {
    getCarGoodsStorage: (state: any) => state.carGoodsList
  },
  actions: {
    setCarGoodsListInfo(goods: any) {
      this.carGoodsList = goods;
    }
  }
});