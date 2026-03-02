import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { useReviewStore } from '@/stores/reviewstore.js';

export class ReviewService {
  static getReviews(): ReviewInterface[] {
    return useReviewStore().reviews;
  }

  static getReviewsByBookId(id: number): ReviewInterface[] {
    return useReviewStore().reviews.filter((review) => review.id === id);
  }

  static createReview(review: CreateReviewDTO): void {
    const store = useReviewStore();

    const nextId = store.reviews.length > 0 ? Math.max(...store.reviews.map((r) => r.id)) + 1 : 1;

    store.reviews.push({
      id: nextId,
      ...review,
      date: new Date(), 
    });
  }
}
