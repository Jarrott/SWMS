import { InjectionKey } from 'vue';

/**
 * 引入InjectionKey 并将其传入usestore
 *
 */

import { useStore as baseUseStore, createStore, Store } from 'vuex';

//为store state声明类型
export interface State {
  scrollTop: number;
}

//定义 injection key
export const key: InjectionKey<Store<State>> = Symbol();

//导出store模块
export const store = createStore<State>({
  state: {
    scrollTop: 0,
  },
  getters: {
    getScrollTop: (state) => {
      return state.scrollTop;
    },
  },
  mutations: {
    setScrollTop(state, params: number) {
      state.scrollTop = params;
    },
  },
  actions: {},
});

export function useStore() {
  return baseUseStore(key);
}
