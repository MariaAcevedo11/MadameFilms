// Author: Gabriela Sanabria

// External imports
import axios from 'axios';

// Internal imports
import { AuthService } from './AuthService';
import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO';
import type { UpdateReviewDTO } from '@/dtos/UpdateReviewDTO';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';

export class ReviewService {
  private static readonly API_URL = 'http://localhost:3000/api/reviews';

  public static async getReviews(): Promise<ReviewInterface[]> {
    const { data } = await axios.get(this.API_URL);
    return data;
  }

  public static async getReviewById(id: number): Promise<ReviewInterface> {
    const { data } = await axios.get(`${this.API_URL}/${id}`);
    return data;
  }

  public static async createReview(dto: CreateReviewDTO): Promise<ReviewInterface> {
    const loggedUser = await AuthService.getCurrentUser();

    if (!loggedUser) {
      throw new Error('User must be logged in');
    }

    const reviewToSend = {
      ...dto,
      date: new Date(),
      userId: loggedUser.id,
    };

    const { data } = await axios.post(this.API_URL, reviewToSend);
    return data;
  }

  public static async deleteReview(id: number): Promise<void> {
    const review = await this.getReviewById(id);
    const loggedUser = await AuthService.getCurrentUser();

    if (!loggedUser) {
      throw new Error('User must be logged in');
    }

    if (!(await this.canDelete(review))) {
      throw new Error('You are not authorized to delete this review');
    }

    await axios.delete(`${this.API_URL}/${id}`);
  }

  public static async updateReview(id: number, dto: UpdateReviewDTO): Promise<ReviewInterface> {
    const loggedUser = await AuthService.getCurrentUser();

    if (!loggedUser) {
      throw new Error('User must be logged in to update a review');
    }

    const existing = await this.getReviewById(id);

    if (!existing) {
      throw new Error('Review not found');
    }

    if (existing.userId !== loggedUser.id) {
      throw new Error('You are not authorized to update this review');
    }

    const reviewToSend = {
      ...dto,
      date: new Date(),
    };

    const { data } = await axios.put(`${this.API_URL}/${id}`, reviewToSend);

    return data;
  }

  public static async canEdit(review: ReviewInterface): Promise<boolean> {
    const loggedUser = await AuthService.getCurrentUser();

    if (!loggedUser) return false;

    return review.userId === loggedUser.id;
  }

  public static async canDelete(review: ReviewInterface): Promise<boolean> {
    const loggedUser = await AuthService.getCurrentUser();

    if (!loggedUser) return false;

    return review.userId === loggedUser.id || loggedUser.role === 'admin';
  }
}
