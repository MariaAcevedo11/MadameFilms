// Author: Gaby
// External imports
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<UserInterface | null>(null);

  const isLogged = computed(() => !!currentUser.value);

  return {
    currentUser,
    isLogged,
  };
});
