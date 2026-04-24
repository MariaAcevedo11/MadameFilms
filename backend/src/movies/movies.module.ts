import { Actress } from 'src/actresses/entities/actress.entity';
import { ActressesController } from 'src/actresses/actresses.controller';
import { ActressesService } from 'src/actresses/actresses.service';
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
  imports: [AuthModule, TypeOrmModule.forFeature([Movie, Review, Actress])],
  controllers: [MoviesController, ReviewsController, ActressesController],
  providers: [MoviesService, ReviewsService, ActressesService],
})
export class MoviesModule {}
