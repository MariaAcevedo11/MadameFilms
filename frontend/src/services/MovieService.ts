// Author: Gabriela Sanabria

//External imports
import axios from 'axios';

// Internal imports
import { AuthService } from './AuthService';
import type { CreateMovieDTO } from '@/dtos/CreateMovieDTO';
import type { UpdateMovieDTO } from '@/dtos/UpdateMovieDTO';
import type { MovieInterface } from '@/interfaces/MovieInterface';

export class MovieService {
  private static readonly API_URL = 'http://localhost:3000/api/movies';

  public static async getMovies(): Promise<MovieInterface[]> {
    const { data } = await axios.get(this.API_URL);
    return data;
  }

  public static async getMovieById(id: number): Promise<MovieInterface> {
    const { data } = await axios.get(`${this.API_URL}/${id}`);
    return data;
  }

  public static async createMovie(dto: CreateMovieDTO): Promise<MovieInterface> {
    const { data } = await axios.post(this.API_URL, dto);
    return data;
  }

  public static async deleteMovie(id: number): Promise<void> {
    await axios.delete(`${this.API_URL}/${id}`);
  }

  public static async updateMovie(
    id: number,
    dto: UpdateMovieDTO
  ): Promise<MovieInterface> {
    if (!AuthService.isAdmin()) {
      throw new Error('Only admin users can update movies.');
    }

    const { data } = await axios.put(`${this.API_URL}/${id}`, dto);
    return data;
  }
}