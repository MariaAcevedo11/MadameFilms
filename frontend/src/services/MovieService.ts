// Internal imports
import type { CreateMovieDTO } from '@/dtos/CreateMovieDTO';
import type { UpdateMovieDTO } from '@/dtos/UpdateMovieDTO';
import type { MovieInterface } from '@/interfaces/MovieInterface';
import { useMovieStore } from '@/stores/moviestore';
import { UserService } from './UserService';

// Variables
// (none)

// Reactive variables
// (none)

// Functions
export class MovieService {
  static getMovies(): MovieInterface[] {
    return useMovieStore().movies;
  }

  static getMovieById(id: number): MovieInterface | undefined {
    return useMovieStore().movies.find((movie) => movie.id === id);
  }

  static createMovie(movie: CreateMovieDTO): void {
    const movies = useMovieStore().movies;
    const id =
      movies.length > 0 ? Math.max(...movies.map((m) => m.id)) + 1 : 1;
    movies.push({ id, ...movie });
  }

  static deleteMovie(id: number): void {
    const store = useMovieStore();
    store.movies = store.movies.filter((movie) => movie.id !== id);
  }

  static updateMovie(id: number, data: UpdateMovieDTO): void {
    if (!UserService.isAdmin()) {
      throw new Error('Only admin users can update movies.');
    }

    const store = useMovieStore();
    const index = store.movies.findIndex((movie) => movie.id === id);
    if (index === -1) {
      throw new Error('Movie not found.');
    }

    const existing = store.movies[index]!;
    const updated: MovieInterface = {
      id: existing.id,
      title: data.title ?? existing.title,
      description: data.description ?? existing.description,
      cast: data.cast ?? existing.cast,
      director: data.director ?? existing.director,
      releaseDate: data.releaseDate ?? existing.releaseDate,
      genre: data.genre ?? existing.genre,
      durationMin: data.durationMin ?? existing.durationMin,
      country: data.country ?? existing.country,
      language: data.language ?? existing.language,
      image: data.image ?? existing.image,
      actress: data.actress ?? existing.actress,
    };
    store.movies[index] = updated;
  }
}
