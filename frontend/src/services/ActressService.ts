// Author: Gabriela Sanabria

// External imports
import api from '@/api/interceptors';

// Internal imports
import type { ActressInterface } from '@/interfaces/ActressInterface';



export class ActressService {
  private static readonly API_URL = '/actresses';

  public static async getActress(): Promise<ActressInterface[]> {
    const { data } = await api.get(this.API_URL);
    return data;
  }

  public static async getActressById(id: number): Promise<ActressInterface> {
    const { data } = await api.get(`${this.API_URL}/${id}`);
    return data;
  }

  public static async getActressName(id: number): Promise<string> {
    const { data } = await api.get(`${this.API_URL}/${id}`);
    return data.fullName;
  }
}
