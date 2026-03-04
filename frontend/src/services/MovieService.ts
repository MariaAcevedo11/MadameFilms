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
    const movies = useMovieStore().movies;
    const id = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
    movies.push({ id, ...movie });
  }

  static deleteMovie(id: number): void {
    const store = useMovieStore();
    store.movies = store.movies.filter((movie) => movie.id !== id);
  }
}
