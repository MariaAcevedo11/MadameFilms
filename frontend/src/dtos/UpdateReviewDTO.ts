import type { ReviewInterface } from '@/interfaces/ReviewInterface';

export type UpdateReviewDTO = Partial<Pick<ReviewInterface, 'rating' | 'comment' | 'movie'>>;
