import { ActressesModule } from './actresses/actresses.module';
import { HomeModule } from './home/home.module';
import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    HomeModule,
    MoviesModule,
    ReviewsModule,
    UsersModule,
    ActressesModule,
  ],
})
export class AppModule {}
