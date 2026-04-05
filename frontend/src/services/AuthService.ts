// Author: Gabriela Martinez

//External imports
import axios from 'axios';

//Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';

export class AuthService {
  private static readonly API_URL = 'http://localhost:3000/api/auth';

  static async login(
    email: string,
    password: string
  ): Promise<UserInterface> {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    const { data } = await axios.post(`${this.API_URL}/login`, {
      email: normalizedEmail,
      password: normalizedPassword,
    });

    return data;
  }

  static async getCurrentUser(): Promise<UserInterface> {
    const { data } = await axios.get(`${this.API_URL}/me`);
    return data;
  }

  static async isLogged(): Promise<boolean> {
    try {
      await this.getCurrentUser();
      return true;
    } catch {
      return false;
    }
  }

  static async isAdmin(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user.role === 'admin';
  }

  static async logout(): Promise<void> {
    await axios.post(`${this.API_URL}/logout`);
  }
}