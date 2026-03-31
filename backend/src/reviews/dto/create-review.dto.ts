export class CreateReviewDto {
  id: number;
  rating: number;
  comment: string;
  date: Date;

  userId: number;
  movieId: number;
}
