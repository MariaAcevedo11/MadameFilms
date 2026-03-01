import type { MovieInterface } from '@/interfaces/MovieInterface.js';

export type CreateMovieDTO = Omit<MovieInterface, 'id'>;
