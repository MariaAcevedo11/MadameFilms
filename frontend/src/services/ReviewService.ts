import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { useReviewStore } from '@/stores/reviewstore.js';
import { UserService } from './UserService';

export class ReviewService {
  static getReviews(): ReviewInterface[] {
    return useReviewStore().reviews;
  }

  static getReviewsByBookId(id: number): ReviewInterface[] {
    return useReviewStore().reviews.filter((review) => review.id === id);
  }

  static createReview(review: CreateReviewDTO): void {
    const reviewStore = useReviewStore();
    const loggedUser = UserService.getLoggedUser();

    if (!loggedUser) {
      throw new Error('User must be logged in');
    }

    const id =
      reviewStore.reviews.length > 0 ? Math.max(...reviewStore.reviews.map((r) => r.id)) + 1 : 1;

    reviewStore.reviews.push({
      id,
      ...review,
      user: loggedUser,
      date: new Date(),
    });
  }

  static deleteReview(id: number): void {
    const store = useReviewStore();
    store.reviews = store.reviews.filter((review) => review.id !== id);
  }
}
