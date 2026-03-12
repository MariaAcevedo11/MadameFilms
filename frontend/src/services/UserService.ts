// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';
import { useUserStore } from '@/stores/userstore';

// Functions
export class UserService {
  static login(email: string, password: string): void {
    const store = useUserStore();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    const user = store.users.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === normalizedPassword,
    );

    store.currentUser = user ?? null;
  }

  static logout(): void {
    useUserStore().currentUser = null;
  }

  static getCurrentUser(): UserInterface | null {
    return useUserStore().currentUser;
  }

  static isLogged(): boolean {
    return useUserStore().isLogged;
  }

  public static isAdmin(): boolean {
    return useUserStore().currentUser?.role === 'admin';
  }
}


