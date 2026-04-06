import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Review } from 'src/reviews/entities/reviews.entity';
import { ReviewsController } from 'src/reviews/reviews.controller';
import { ReviewsService } from 'src/reviews/reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Movie, Review])],
  controllers: [MoviesController, ReviewsController],
  providers: [MoviesService, ReviewsService],
})
export class MoviesModule {}
