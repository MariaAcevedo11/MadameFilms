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

  static updateReview(id: number, updatedReview: Partial<CreateReviewDTO>): void {
    const store = useReviewStore();
    const currentReviews = store.reviews;
    const user = UserService.getLoggedUser();

    if (!user) {
      throw new Error('User must be logged in to update a review');
    }

    const index = currentReviews.findIndex((review) => review.id === id);

    if (index === -1) {
      throw new Error('Review not found');
    }

    const existingReview = currentReviews[index]!;

    // Only the user who published the review can update it
    if (existingReview.user.id !== user.id) {
      throw new Error('You are not authorized to update this review');
    }

    // Update only allowed fields from CreateReviewDTO (e.g., rating, comment, movie)
    const updated: ReviewInterface = {
      ...existingReview,
      ...updatedReview,
      date: new Date(), // update the "updated at" timestamp
      user: existingReview.user, // keep the original user
    };

    // Replace the review in the store
    store.reviews[index] = updated;
  }
}
