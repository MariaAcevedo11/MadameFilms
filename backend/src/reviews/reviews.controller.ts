// External imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Internal imports
import type { AuthRequest } from 'src/auth/types/auth-request.type';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/reviews.entity';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
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
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateReviewDto, @Request() req: AuthRequest) {
    return this.reviewsService.create(dto, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateReviewDto>,
  ): Promise<Review> {
    return this.reviewsService.update(Number(id), dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.reviewsService.delete(Number(id));
  }
}
