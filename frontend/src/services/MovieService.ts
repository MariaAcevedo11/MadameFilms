// Author: Gabriela Sanabria
// Internal imports
import { AuthService } from './AuthService';
import type { CreateMovieDTO } from '@/dtos/CreateMovieDTO';
import type { MovieInterface } from '@/interfaces/MovieInterface';
import type { UpdateMovieDTO } from '@/dtos/UpdateMovieDTO';
import { useMovieStore } from '@/stores/moviestore';

// Functions
export class MovieService {
  static getMovies(): MovieInterface[] {
    return useMovieStore().movies;
  }

  static getMovieById(id: number): MovieInterface | undefined {
    return useMovieStore().movies.find((movie) => movie.id === id);
  }

  static createMovie(dto: CreateMovieDTO): MovieInterface {
    const movieStore = useMovieStore();

    const id = movieStore.movies.length + 1;

    const newMovie: MovieInterface = {
      id,
      ...dto,
    };

    movieStore.movies.push(newMovie);

    return newMovie;
  }

  static deleteMovie(id: number): void {
    const movieStore = useMovieStore();
    movieStore.movies = movieStore.movies.filter((movie) => movie.id !== id);
  }

  static updateMovie(id: number, dto: UpdateMovieDTO): void {
    if (!AuthService.isAdmin()) {
      throw new Error('Only admin users can update movies.');
    }

    const movieStore = useMovieStore();
    const existing = MovieService.getMovieById(id);

    if (!existing) {
      throw new Error('Movie not found.');
    }

    const updatedMovie: MovieInterface = {
      id: existing.id,
      title: dto.title ?? existing.title,
      description: dto.description ?? existing.description,
      cast: dto.cast ?? existing.cast,
      director: dto.director ?? existing.director,
      releaseDate: dto.releaseDate ?? existing.releaseDate,
      genre: dto.genre ?? existing.genre,
      durationMin: dto.durationMin ?? existing.durationMin,
      country: dto.country ?? existing.country,
      language: dto.language ?? existing.language,
      image: dto.image ?? existing.image,
      actressId: dto.actressId ?? existing.actressId,
    };

    const index = movieStore.movies.findIndex((m) => m.id === id);
    movieStore.movies[index] = updatedMovie;
  }
}
