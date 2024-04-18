import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '@/types/user';

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<User>({
    token: '111'
  });

  const setUserInfo = (u: User) => {
    userInfo.value = u;
  };

  return { userInfo, setUserInfo }
}, { persist: true });
