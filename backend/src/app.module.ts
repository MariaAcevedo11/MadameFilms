// External imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Internal imports
import { ActressesModule } from './actresses/actresses.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { MoviesModule } from './movies/movies.module';
import { ReviewsModule } from './reviews/reviews.module';
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
    AuthModule,
  ],
})
export class AppModule {}
