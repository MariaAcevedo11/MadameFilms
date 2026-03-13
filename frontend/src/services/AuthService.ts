// Author: Gaby
import type { UserInterface } from '@/interfaces/UserInterface';
import { useAuthStore } from '@/stores/authstore';
import { useUserStore } from '@/stores/userstore';

export class AuthService {
  static login(email: string, password: string): void {
    const userStore = useUserStore();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    const user = userStore.users.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === normalizedPassword,
    );

    useAuthStore().currentUser = user ?? null;
  }

  static logout(): void {
    useAuthStore().currentUser = null;
  }

  static getCurrentUser(): UserInterface | null {
    return useAuthStore().currentUser;
  }

  static isLogged(): boolean {
    return useAuthStore().isLogged;
  }

  static isAdmin(): boolean {
    return useAuthStore().currentUser?.role === 'admin';
  }
}
