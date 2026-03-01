import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ActressInterface } from '@/interfaces/ActressInterface.js';

export const useActressStore = defineStore('actress', () => {
  const actresses = ref<ActressInterface[]>([]);

  return { actresses };
});
