// External imports
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal imports
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/reviews.entity';
import { User } from '../users/entities/user.entity';

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

  create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = this.reviewsRepository.create(createReviewDto);
    return this.reviewsRepository.save(review);
  }

  async update(
    id: number,
    updateReviewDto: UpdateReviewDto,
    loggedUser: User,
  ): Promise<Review> {
    const existing = await this.findOne(id);

    if (!existing) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    if (existing.userId !== loggedUser.id) {
      throw new ForbiddenException(
        'You are not authorized to update this review',
      );
    }

    const updated = this.reviewsRepository.merge(existing, {
      ...updateReviewDto,
      date: new Date(),
    });

    return this.reviewsRepository.save(updated);
  }

  async delete(id: number, loggedUser: User): Promise<void> {
    const review = await this.findOne(id);

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    if (!this.canDelete(review, loggedUser)) {
      throw new ForbiddenException(
        'You are not authorized to delete this review',
      );
    }

    await this.reviewsRepository.delete(id);
  }

  canEdit(review: Review, loggedUser: User | null): boolean {
    if (!loggedUser) return false;

    return review.userId === loggedUser.id;
  }

  canDelete(review: Review, loggedUser: User | null): boolean {
    if (!loggedUser) return false;

    return review.userId === loggedUser.id || loggedUser.role === 'admin';
  }
}
