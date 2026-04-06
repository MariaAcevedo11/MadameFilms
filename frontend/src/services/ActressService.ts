// Author: Gabriela Sanabria

import axios from 'axios';
import type { ActressInterface } from '@/interfaces/ActressInterface';

export class ActressService {
  private static readonly API_URL = 'http://localhost:3000/api/actresses';

  public static async getActress(): Promise<ActressInterface[]> {
    const { data } = await axios.get(this.API_URL);
    return data;
  }

  public static async getActressById(id: number): Promise<ActressInterface> {
    const { data } = await axios.get(`${this.API_URL}/${id}`);
    return data;
  }

  public static async getActressName(id: number): Promise<string> {
    const { data } = await axios.get(`${this.API_URL}/${id}`);
    return data.fullName;
  }
}
