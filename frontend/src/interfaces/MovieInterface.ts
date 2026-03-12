import type { ActressInterface } from './ActressInterfaces';

export interface MovieInterface {
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
  actress?: ActressInterface;
}
