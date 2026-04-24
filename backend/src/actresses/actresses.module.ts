import { AuthModule } from 'src/auth/auth.module';
import { Actress } from './entities/actress.entity';
import { ActressesController } from './actresses.controller';
import { ActressesService } from './actresses.service';
import { Module } from '@nestjs/common';
import { Movie } from 'src/movies/entities/movie.entity';
import { MoviesController } from 'src/movies/movies.controller';
import { MoviesService } from 'src/movies/movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Actress, Movie])],
  controllers: [ActressesController, MoviesController],
  providers: [ActressesService, MoviesService],
})
export class ActressesModule {}
