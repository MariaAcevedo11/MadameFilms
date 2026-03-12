import type { ReviewInterface } from '@/interfaces/ReviewInterface';

/** Updatable fields for a review (rating, comment, movie). User and date are never sent in updates. */
export type UpdateReviewDTO = Partial<Pick<ReviewInterface, 'rating' | 'comment' | 'movie'>>;
