import api from '@/api/interceptors';

import type { CreateMovieDTO } from '@/dtos/CreateMovieDTO';
import type { UpdateMovieDTO } from '@/dtos/UpdateMovieDTO';
import type { MovieInterface } from '@/interfaces/MovieInterface';

export class MovieService {
  private static readonly API_URL = '/movies';

  public static async getMovies(): Promise<MovieInterface[]> {
    const { data } = await api.get(this.API_URL);
    return data;
  }

  public static async getMovieById(id: number): Promise<MovieInterface> {
    const { data } = await api.get(`${this.API_URL}/${id}`);
    return data;
  }

  public static async createMovie(dto: CreateMovieDTO): Promise<MovieInterface> {
    const { data } = await api.post(this.API_URL, dto);
    return data;
  }

  public static async updateMovie(id: number, dto: UpdateMovieDTO): Promise<MovieInterface> {
    const { data } = await api.patch(`${this.API_URL}/${id}`, dto);
    return data;
  }

  public static async deleteMovie(id: number): Promise<void> {
    await api.delete(`${this.API_URL}/${id}`);
  }
}
