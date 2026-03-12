// Internal imports
import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO';
import type { UpdateReviewDTO } from '@/dtos/UpdateReviewDTO';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { useReviewStore } from '@/stores/reviewstore.js';
import { UserService } from './UserService';

// Functions
export class ReviewService {
  static getReviews(): ReviewInterface[] {
    return useReviewStore().reviews;
  }

  static getReviewsById(id: number): ReviewInterface[] {
    return useReviewStore().reviews.filter((review) => review.id === id);
  }

  static createReview(dto: CreateReviewDTO): ReviewInterface {
    const reviewStore = useReviewStore();
    const loggedUser = UserService.getCurrentUser();

    if (!loggedUser) {
      throw new Error('User must be logged in');
    }

    const id = reviewStore.reviews.length + 1;

    const newReview: ReviewInterface = {
      id,
      ...dto, 
      date: new Date(),
    };

    reviewStore.reviews.push(newReview);
    return newReview;
  }

  static deleteReview(id: number): void {
    const store = useReviewStore();
    store.reviews = store.reviews.filter((review) => review.id !== id);
  }

  static updateReview(id: number, dto: UpdateReviewDTO): void {
    const loggedUser = UserService.getCurrentUser();
    if (!loggedUser) {
      throw new Error('User must be logged in to update a review');
    }

    const store = useReviewStore();
    const index = store.reviews.findIndex((review) => review.id === id);
    if (index === -1) {
      throw new Error('Review not found');
    }

    const existing = store.reviews[index]!;
    if (existing.userId !== loggedUser.id) {
      throw new Error('You are not authorized to update this review');
    }

    const updatedReview: ReviewInterface = {
      id: existing.id,
      rating: dto.rating ?? existing.rating,
      comment: dto.comment ?? existing.comment,
      date: new Date(),
      userId: existing.userId,
      movieId: dto.movieId ?? existing.movieId,
    };

    store.reviews[index] = updatedReview;
  }

  static canEdit(review: ReviewInterface): boolean {
    const loggedUser = UserService.getCurrentUser();

    if (!loggedUser) return false;

    return review.userId === loggedUser.id;
  }

  static canDelete(review: ReviewInterface): boolean {
    const loggedUser = UserService.getCurrentUser();

    if (!loggedUser) return false;

    return review.userId === loggedUser.id || loggedUser.role === 'admin';
  }
}
