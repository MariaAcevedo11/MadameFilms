// Author: Gabriela Sanabria

//External imports
import axios from 'axios';

//Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';


export class UserService {
  private static readonly API_URL = 'http://localhost:3000/api/users';

  public static async getUserById(id: number): Promise<UserInterface> {
    const { data } = await axios.get(`${this.API_URL}/${id}`);
    return data;
  }
}