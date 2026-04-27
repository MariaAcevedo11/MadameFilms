// Author: Gabriela Sanabria

// External imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

//Internal imports
import { MoviesModule } from 'src/movies/movies.module';
import { Review } from './entities/reviews.entity';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), UsersModule, MoviesModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
