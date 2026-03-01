import type { CreateMovieDTO } from '@/dtos/CreateMovieDTO';
import type { MovieInterface } from '@/interfaces/MovieInterface';
import { useMovieStore } from '@/stores/moviestore';

export class MovieService {
  static getMovies(): MovieInterface[] {
    return useMovieStore().movies;
  }

  static getMovieById(id: number): MovieInterface | undefined {
    return useMovieStore().movies.find((movie) => movie.id === id);
  }

  static createMovie(movie: CreateMovieDTO): void {
    const id = useMovieStore().movies.length + 1;
    useMovieStore().movies.push({ id, ...movie });
  }
}
