// Internal imports
import { AuthService } from './AuthService';
import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import type { UpdateReviewDTO } from '@/dtos/UpdateReviewDTO';
import { useReviewStore } from '@/stores/reviewstore.js';

// Functions
export class ReviewService {
  static getReviews(): ReviewInterface[] {
    return useReviewStore().reviews;
  }

  static getReviewById(id: number): ReviewInterface | undefined {
    return useReviewStore().reviews.find((review) => review.id === id);
  }

  static createReview(dto: CreateReviewDTO): ReviewInterface {
    const reviewStore = useReviewStore();
    const loggedUser = AuthService.getCurrentUser();

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
    const reviewStore = useReviewStore();
    reviewStore.reviews = reviewStore.reviews.filter((review) => review.id !== id);
  }

  static updateReview(id: number, dto: UpdateReviewDTO): void {
    const loggedUser = AuthService.getCurrentUser();
    if (!loggedUser) {
      throw new Error('User must be logged in to update a review');
    }

    const reviewStore = useReviewStore();
    const existing = ReviewService.getReviewById(id);

    if (!existing) {
      throw new Error('Review not found');
    }

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

    const index = reviewStore.reviews.findIndex((r) => r.id === id);
    reviewStore.reviews[index] = updatedReview;
  }

  static canEdit(review: ReviewInterface): boolean {
    const loggedUser = AuthService.getCurrentUser();

    if (!loggedUser) return false;

    return review.userId === loggedUser.id;
  }

  static canDelete(review: ReviewInterface): boolean {
    const loggedUser = AuthService.getCurrentUser();

    if (!loggedUser) return false;

    return review.userId === loggedUser.id || loggedUser.role === 'admin';
  }
}
