import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/reviews.entity';
import { CreateReviewDto } from './dto/create-review.dto';

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
}
