// Author: Gabriela Sanabria
// External imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

// Internal imports
import type { ActressInterface } from '@/interfaces/ActressInterface.js';

export const useActressStore = defineStore('actress', () => {
  const actresses = ref<ActressInterface[]>([]);

  return { actresses };
});
