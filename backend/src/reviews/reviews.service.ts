// External imports
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal imports
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/reviews.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  findAll(): Promise<Review[]> {
    return this.reviewsRepository.find();
  }

  findOne(id: number): Promise<Review | null> {
    return this.reviewsRepository.findOneBy({ id });
  }

  async create(dto: CreateReviewDto): Promise<Review> {
    const newReview = this.reviewsRepository.create({
      ...dto,
      user: { id: dto.userId },
      movie: { id: dto.movieId },
    });
    return await this.reviewsRepository.save(newReview);
  }

  async update(id: number, dto: UpdateReviewDto): Promise<Review> {
    const existing = await this.findOne(id);

    if (!existing) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    const updated = this.reviewsRepository.merge(existing, {
      ...dto,
      date: new Date(),
    });

    return this.reviewsRepository.save(updated);
  }

  async delete(id: number): Promise<void> {
    const review = await this.findOne(id);

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    await this.reviewsRepository.delete(id);
  }
}
