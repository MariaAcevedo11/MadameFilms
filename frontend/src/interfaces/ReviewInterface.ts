import type { UserInterface } from './UserInterfaces';

export interface ReviewInterface {
  id: number;
  rating: number;
  comment: string;
  date: Date;
  user: UserInterface;
}
