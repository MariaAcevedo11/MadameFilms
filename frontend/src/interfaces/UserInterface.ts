import type { ReviewInterface } from './ReviewInterface';

export interface UserInterface {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
  reviews?: ReviewInterface[];
  image: string;
}
