import type { UserInterface } from '@/interfaces/UserInterface.js';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const users = ref<UserInterface[]>([]);
  const currentUser = ref<UserInterface | null>(null); 

  const isLogged = computed(() => users.value !== null);
  const isAdmin = computed(() => currentUser.value?.role === 'admin');

  return {
    users,
    currentUser, 
    isLogged,
    isAdmin,
  };
});