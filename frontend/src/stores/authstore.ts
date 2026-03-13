// Author: Gaby
import type { UserInterface } from '@/interfaces/UserInterface';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<UserInterface | null>(null);

  const isLogged = computed(() => !!currentUser.value);

  return {
    currentUser,
    isLogged,
  };
});
