import { defineStore } from 'pinia';
import { ref } from 'vue';

export const cartGoodsStore = defineStore('cart', {
  state: (): { carGoodsList?: any, cartNum?: number } => {
    return {
      carGoodsList: [], // 购物车商品
      cartNum: 0, // 购物车数量
    }
  },
  getters: {
    getCarGoodsStorage: (state: any) => state.carGoodsList,
    getCartNum: (state: any) => {
      if (state.carGoodsList.length === 0) return 0
      let num = 0;
      state.carGoodsList.map((item: any) => {
        num += item.productNum
      });
      return num
    }
  },
  actions: {
    setCarGoodsListInfo(goodsItem: any) {
      if (this.carGoodsList.length === 0) {
        this.carGoodsList.push(goodsItem)
        return
      }
      let a = this.carGoodsList.some((item: any) => {
        return item.id == goodsItem.id;
      })
      let n = 0
      for (let i = 0; i < this.carGoodsList.length; i++) {
        if (this.carGoodsList[i].id == goodsItem.id) {
          n = i
        }
      }
      // 判断a是否为true如果为true则将carGoodsList[n]的商品个数加1，否则添加到carGoodsList里面
      if (a) {
        this.carGoodsList[n].productNum = this.carGoodsList[n].productNum + 1
      } else {
        this.carGoodsList.push(goodsItem)
      }
    },
    deleteCartInfo(deleteItem: any) {
      let _index: number = 0;
      this.carGoodsList.map((item: any, index: number) => {
        if (item.id == deleteItem.id) {
          _index = index;
          return
        }
      });
      this.carGoodsList.splice(_index, 1);
    }
  },
  // 默认存储到本地，存储内容为state中的全部数据
  persist: true
});