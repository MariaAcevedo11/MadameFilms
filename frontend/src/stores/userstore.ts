// Author: Gaby
// External imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface.js';

export const useUserStore = defineStore('user', () => {
  const users = ref<UserInterface[]>([]);
  const currentUser = ref<UserInterface | null>(null);

  return {
    users,
    currentUser,
  };
});
