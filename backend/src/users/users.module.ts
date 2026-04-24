import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { Movie } from 'src/movies/entities/movie.entity';
import { MoviesController } from 'src/movies/movies.controller';
import { MoviesService } from 'src/movies/movies.service';
import { Review } from 'src/reviews/entities/reviews.entity';
import { ReviewsController } from 'src/reviews/reviews.controller';
import { ReviewsService } from 'src/reviews/reviews.service';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User, Movie, Review])],
  controllers: [UsersController, MoviesController, ReviewsController],
  providers: [UsersService, MoviesService, ReviewsService],
})
export class UsersModule {}
