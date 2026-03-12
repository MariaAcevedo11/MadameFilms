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

  static isAuthenticated(): boolean {
    return useUserStore().isAuthenticated;
  }

  static isAdmin(): boolean {
    return useUserStore().isAdmin;
  }
}
