// Author: Gabriela Sanabria

// Internal imports
import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO';
import type { UpdateReviewDTO } from '@/dtos/UpdateReviewDTO';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { ReviewService } from '@/services/ReviewService';

// External imports
import { defineStore } from 'pinia';

export const useReviewsStore = defineStore('reviews', {
  state: () => ({
    reviews: [] as ReviewInterface[],
    isLoading: false as boolean,
  }),

  actions: {
    async fetchReviews(): Promise<void> {
      this.isLoading = true;

      try {
        this.reviews = await ReviewService.getReviews();
      } finally {
        this.isLoading = false;
      }
    },

    async addReview(dto: CreateReviewDTO, token: string): Promise<ReviewInterface | null> {
      try {
        const newReview = await ReviewService.createReview(dto);
        this.reviews.push(newReview);
        return newReview;
      } catch {
        return null;
      }
    },

    async updateReviewById(id: number, dto: UpdateReviewDTO, token: string): Promise<boolean> {
      try {
        const updated = await ReviewService.updateReview(id, dto);

        const index = this.reviews.findIndex((r) => r.id === id);
        if (index !== -1) {
          this.reviews[index] = updated;
        }

        return true;
      } catch {
        return false;
      }
    },

    async deleteReviewById(id: number, token: string): Promise<boolean> {
      try {
        await ReviewService.deleteReview(id);
        this.reviews = this.reviews.filter((r) => r.id !== id);
        return true;
      } catch {
        return false;
      }
    },
  },
});
