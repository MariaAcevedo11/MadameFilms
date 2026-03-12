// Author: Gaby
import type { UserInterface } from '@/interfaces/UserInterface.js';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const users = ref<UserInterface[]>([]);
  const loggedUser = ref<UserInterface | null>(null);

  return { users, loggedUser };
});
