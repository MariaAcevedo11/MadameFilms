import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { Movie } from 'src/movies/entities/movie.entity';
import { MoviesController } from 'src/movies/movies.controller';
import { MoviesService } from 'src/movies/movies.service';
import { Review } from './entities/reviews.entity';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Review, Movie])],
  controllers: [ReviewsController, MoviesController],
  providers: [ReviewsService, MoviesService],
})
export class ReviewsModule {}
