import type { CreateMovieDTO } from '@/dtos/CreateMovieDTO';

/** Partial payload for updating a movie. Only provided fields are updated. */
export type UpdateMovieDTO = Partial<CreateMovieDTO>;
