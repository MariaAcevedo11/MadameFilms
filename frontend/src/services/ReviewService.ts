import api from "@/api/interceptors";

import type { CreateReviewDTO } from "@/dtos/CreateReviewDTO";
import type { UpdateReviewDTO } from "@/dtos/UpdateReviewDTO";
import type { ReviewInterface } from "@/interfaces/ReviewInterface";

export class ReviewService {
  private static readonly API_URL = "/reviews";

  public static async getReviews(): Promise<ReviewInterface[]> {
    const { data } = await api.get(this.API_URL);
    return data;
  }

  public static async getReviewById(id: number): Promise<ReviewInterface> {
    const { data } = await api.get(`${this.API_URL}/${id}`);
    return data;
  }

  public static async createReview(dto: CreateReviewDTO): Promise<ReviewInterface> {
    const { data } = await api.post(this.API_URL, dto);
    return data;
  }

  public static async updateReview(
    id: number,
    dto: UpdateReviewDTO
  ): Promise<ReviewInterface> {
    const { data } = await api.patch(`${this.API_URL}/${id}`, dto);
    return data;
  }

  public static async deleteReview(id: number): Promise<void> {
    await api.delete(`${this.API_URL}/${id}`);
  }
}