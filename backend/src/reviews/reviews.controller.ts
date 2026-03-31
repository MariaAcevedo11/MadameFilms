import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/reviews.entity';
import { ReviewsService } from './reviews.service';

@Controller('Reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  findAll(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Review | null> {
    return this.reviewsService.findOne(Number(id));
  }

  @Post()
  create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewsService.create(createReviewDto);
  }
}
