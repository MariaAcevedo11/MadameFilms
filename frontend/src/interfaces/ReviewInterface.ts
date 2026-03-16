// Author: Gabriela Sanabria
export interface ReviewInterface {
  id: number;
  rating: number;
  comment: string;
  date: Date;

  userId: number;
  movieId: number;
}
