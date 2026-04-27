// External imports
import { defineStore } from 'pinia';
import type { UserInterface } from '@/interfaces/UserInterface';

// Internal imports
import { AuthService } from '@/services/AuthService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null as string | null,
    loggedInUser: null as UserInterface | null,
  }),

  persist: true,

  actions: {
    setSession(token: string) {
      this.accessToken = token;
    },

    setUser(user: UserInterface) {
      this.loggedInUser = user;
    },

    clearSession() {
      this.accessToken = null;
      this.loggedInUser = null;
    },

    async fetchUser() {
      if (!this.accessToken) return;

      try {
        const user = await AuthService.getProfile();
        this.setUser(user);
      } catch {
        this.clearSession();
      }
    },
  },
});
