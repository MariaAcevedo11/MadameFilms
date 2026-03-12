// Internal imports
import type { CreateMovieDTO } from '@/dtos/CreateMovieDTO';
import type { UpdateMovieDTO } from '@/dtos/UpdateMovieDTO';
import type { MovieInterface } from '@/interfaces/MovieInterface';
import { useMovieStore } from '@/stores/moviestore';
import { UserService } from './UserService';

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
    title: dto.title,
    description: dto.description,
    releaseDate: dto.releaseDate,
    image: dto.image,
    cast: dto.cast,
    director: dto.director,
    genre: dto.genre,
    durationMin: dto.durationMin,
    country: dto.country,
    language: dto.language, 
  };

  movieStore.movies.push(newMovie);

  return newMovie;
}

  static deleteMovie(id: number): void {
    const store = useMovieStore();
    store.movies = store.movies.filter((movie) => movie.id !== id);
  }

  static updateMovie(id: number, dto: UpdateMovieDTO): void {
    if (!UserService.isAdmin()) {
      throw new Error('Only admin users can update movies.');
    }

    const store = useMovieStore();
    const index = store.movies.findIndex((movie) => movie.id === id);
    if (index === -1) {
      throw new Error('Movie not found.');
    }

    const existing = store.movies[index]!;
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
      actress: dto.actress ?? existing.actress,
    };
    store.movies[index] = updatedMovie;
  }
}
