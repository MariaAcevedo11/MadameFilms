// Author: Gabriela Sanabria

// Internal imports
import type { CreateMovieDTO } from '@/dtos/CreateMovieDTO';
import type { UpdateMovieDTO } from '@/dtos/UpdateMovieDTO';
import type { MovieInterface } from '@/interfaces/MovieInterface';
import { MovieService } from '@/services/MovieService';

// External imports
import { defineStore } from 'pinia';

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [] as MovieInterface[],
    isLoading: false as boolean,
  }),

  actions: {
    async fetchMovies(): Promise<void> {
      this.isLoading = true;

      try {
        this.movies = await MovieService.getMovies();
      } finally {
        this.isLoading = false;
      }
    },

    async addMovie(dto: CreateMovieDTO, token: string): Promise<MovieInterface | null> {
      try {
        const newMovie = await MovieService.createMovie(dto);
        this.movies.push(newMovie);
        return newMovie;
      } catch {
        return null;
      }
    },

    async updateMovieById(id: number, dto: UpdateMovieDTO, token: string): Promise<boolean> {
      try {
        const updated = await MovieService.updateMovie(id, dto);

        const index = this.movies.findIndex((m) => m.id === id);
        if (index !== -1) {
          this.movies[index] = updated;
        }

        return true;
      } catch {
        return false;
      }
    },

    async deleteMovieById(id: number, token: string): Promise<boolean> {
      try {
        await MovieService.deleteMovie(id);
        this.movies = this.movies.filter((m) => m.id !== id);
        return true;
      } catch {
        return false;
      }
    },
  },
});
