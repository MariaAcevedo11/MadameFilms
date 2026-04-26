
// External imports
import api from "@/api/interceptors";

// Internal imports
import type { CreateUserDTO } from '@/dtos/CreateUserDTO';
import type { UserInterface } from '@/interfaces/UserInterface';

export class UserService {
  private static readonly API_URL = '/users';

  public static async getUsers(): Promise<UserInterface[]> {
    const { data } = await api.get(this.API_URL);
    return data;
  }

  public static async getUserById(id: number): Promise<UserInterface> {
    const { data } = await api.get(`${this.API_URL}/${id}`);
    return data;
  }

  public static async createUser(userData: CreateUserDTO): Promise<UserInterface> {
    const { data } = await api.post(this.API_URL, userData);
    return data;
  }

  public static async deleteUser(id: number): Promise<void> {
    await api.delete(`${this.API_URL}/${id}`);
  }
}