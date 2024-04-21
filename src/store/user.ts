import { values } from 'lodash-es';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: (): { userInfo?: any, token?: string } => {
    return {
      userInfo: {}, // 用户信息
      token: '',
    }
  },
  getters: {
    getUserInfo: (state: any) => state.userInfo,
    getToken: (state) => state.token
  },
  actions: {
    setUserInfo(info: any) {
      this.userInfo = info
    },
    setToken(value: string) {
      this.token = value
    }
  },
  // 默认存储到本地，存储内容为state中的全部数据
  persist: true
});
