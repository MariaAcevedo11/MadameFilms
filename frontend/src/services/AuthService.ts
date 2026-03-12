// Author: Gaby
import type { UserInterface } from '@/interfaces/UserInterface';
import { useUserStore } from '@/stores/userstore';

export class AuthService {
  static login(email: string, password: string): UserInterface | null {
    const store = useUserStore();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    const user = store.users.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === normalizedPassword,
    );

    if (!user) return null;

    store.loggedUser = user;
    return user;
  }

  static logout(): void {
    const store = useUserStore();
    store.loggedUser = null;
  }

  static getLoggedUser(): UserInterface | null {
    const store = useUserStore();
    return store.loggedUser;
  }

  static isAdmin(): boolean {
    const store = useUserStore();
    return store.loggedUser?.type === 'admin';
  }
}
