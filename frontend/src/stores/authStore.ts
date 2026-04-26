// External imports
import { defineStore } from 'pinia';
import type { UserInterface } from '@/interfaces/UserInterface';

// Internal imports
import { AuthService } from '@/services/AuthService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') as string | null,
    loggedInUser: null as UserInterface | null,
  }),
  actions: {
    setSession(token: string) {
      this.accessToken = token;
      localStorage.setItem('accessToken', token);
    },
    setUser(user: UserInterface) {
      this.loggedInUser = user;
    },
    clearSession() {
      this.accessToken = null;
      this.loggedInUser = null;
      localStorage.removeItem('accessToken');
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
