import type { MovieInterface } from './MovieInterface';
import type { UserInterface } from './UserInterface';

export interface ReviewInterface {
  id: number;
  rating: number;
  comment: string;
  date: Date;
  
  user: UserInterface;
  movie?: MovieInterface;
}
