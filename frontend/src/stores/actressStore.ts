// Author: Gabriela Sanabria

// Internal imports
import type { ActressInterface } from '@/interfaces/ActressInterface';
import { ActressService } from '@/services/ActressService';

// External imports
import { defineStore } from 'pinia';

export const useActressesStore = defineStore('actresses', {
  state: () => ({
    actress: [] as ActressInterface[],
    isLoading: false as boolean,
  }),

  actions: {
    async fetchActress(): Promise<void> {
      this.isLoading = true;

      try {
        this.actress = await ActressService.getActress();
      } finally {
        this.isLoading = false;
      }
    },

    async getActrById(id: number): Promise<ActressInterface | null> {
      try {
        return await ActressService.getActressById(id);
      } catch {
        return null;
      }
    },

    async getActrName(id: number): Promise<string> {
      try {
        return await ActressService.getActressName(id);
      } catch {
        return '';
      }
    },
  },
});
