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
  static updateMovie(id: number, updatedData: Partial<CreateMovieDTO>): void {
    // Import types at the top if needed. Only internal logic here.

    // NOTE: We assume that only a logged-in admin can update a movie,
    // so we fetch the logged user and check their type.
    const user = JSON.parse(localStorage.getItem('loggedUser') || 'null');
    if (!user || user.type !== 'admin') {
      throw new Error('Only admin users can update movies.');
    }

    const store = useMovieStore();
    const movieIndex = store.movies.findIndex((movie: MovieInterface) => movie.id === id);

    if (movieIndex === -1) {
      throw new Error('Movie not found.');
    }

    const existing = store.movies[movieIndex]!;
    const updated: MovieInterface = {
      id: existing.id,
      title: updatedData.title ?? existing.title,
      description: updatedData.description ?? existing.description,
      cast: updatedData.cast ?? existing.cast,
      director: updatedData.director ?? existing.director,
      releaseDate: updatedData.releaseDate ?? existing.releaseDate,
      genre: updatedData.genre ?? existing.genre,
      durationMin: updatedData.durationMin ?? existing.durationMin,
      country: updatedData.country ?? existing.country,
      language: updatedData.language ?? existing.language,
      image: updatedData.image ?? existing.image,
      actress: updatedData.actress ?? existing.actress,
    };
    store.movies[movieIndex] = updated;
  }
}
