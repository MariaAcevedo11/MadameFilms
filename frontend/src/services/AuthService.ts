// Interal imports
import api from '@/api/interceptors';
import type { UserInterface } from '@/interfaces/UserInterface';
import { useAuthStore } from '@/stores/authStore';

export class AuthService {
  private static readonly API_URL = '/auth';

  public static async login(email: string, password: string): Promise<void> {
    const { data } = await api.post(`${this.API_URL}/login`, {
      email: email.trim().toLowerCase(),
      password: password.trim(),
    });

    const authStore = useAuthStore();
    authStore.setSession(data.access_token);

    const profile = await this.getProfile();
    authStore.setUser(profile);
  }

  public static async register(dto: {
    username: string;
    email: string;
    password: string;
    image: string;
    role: string;
  }): Promise<void> {
    const { data } = await api.post(`${this.API_URL}/register`, {
      username: dto.username.trim(),
      email: dto.email.trim().toLowerCase(),
      password: dto.password.trim(),
      image: dto.image.trim(),
      role: dto.role,
    });

    const authStore = useAuthStore();
    authStore.setSession(data.access_token);

    const profile = await this.getProfile();
    authStore.setUser(profile);
  }

  public static async getProfile(): Promise<UserInterface> {
    const { data } = await api.get(`${this.API_URL}/profile`, {});
    return data;
  }

  public static async getCurrentUser(): Promise<UserInterface | null> {
    const authStore = useAuthStore();

    if (!authStore.accessToken) return null;
    if (authStore.loggedInUser) {
      return authStore.loggedInUser;
    }

    await authStore.fetchUser();
    return authStore.loggedInUser;
  }

  public static async getUserId(): Promise<number | null> {
    const user = await this.getCurrentUser();
    return user ? user.id : null;
  }

  public static async isAdmin(): Promise<boolean> {
    const user = await this.getCurrentUser();
    if (!user) return false;
    return user.role === 'admin';
  }

  public static async logout(): Promise<void> {
    const authStore = useAuthStore();
    authStore.clearSession();
  }

  public static async isLoggedIn(): Promise<boolean> {
    const authStore = useAuthStore();
    return !!authStore.accessToken;
  }
}
