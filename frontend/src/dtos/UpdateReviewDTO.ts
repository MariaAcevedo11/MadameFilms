// Author: Maria Acevedo
import type { ReviewInterface } from '@/interfaces/ReviewInterface';

export type UpdateReviewDTO = Partial<Pick<ReviewInterface, 'rating' | 'comment' | 'movieId'>>;
