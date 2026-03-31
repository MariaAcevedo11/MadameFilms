export interface CreateMovieDto {
  id: number;
  title: string;
  description: string;
  cast: string;
  director: string;
  releaseDate: Date;
  genre: string;
  durationMin: number;
  country: string;
  language: string;
  image: string;

  actressId: number;
}
