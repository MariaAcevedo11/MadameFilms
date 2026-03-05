// Internal imports
import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO';
import type { UpdateReviewDTO } from '@/dtos/UpdateReviewDTO';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { useReviewStore } from '@/stores/reviewstore.js';
import { UserService } from './UserService';

// Variables
// (none)

// Reactive variables
// (none)

// Functions
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
      reviewStore.reviews.length > 0
        ? Math.max(...reviewStore.reviews.map((r) => r.id)) + 1
        : 1;

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

  static updateReview(id: number, data: UpdateReviewDTO): void {
    const loggedUser = UserService.getLoggedUser();
    if (!loggedUser) {
      throw new Error('User must be logged in to update a review');
    }

    const store = useReviewStore();
    const index = store.reviews.findIndex((review) => review.id === id);
    if (index === -1) {
      throw new Error('Review not found');
    }

    const existing = store.reviews[index]!;
    if (existing.user.id !== loggedUser.id) {
      throw new Error('You are not authorized to update this review');
    }

    const updated: ReviewInterface = {
      id: existing.id,
      rating: data.rating ?? existing.rating,
      comment: data.comment ?? existing.comment,
      date: new Date(),
      user: existing.user,
      movie: data.movie ?? existing.movie,
    };
    store.reviews[index] = updated;
  }
}
