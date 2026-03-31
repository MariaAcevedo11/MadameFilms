import { CreateMovieDto } from './dto/create-movie.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/Movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private MoviesRepository: Repository<Movie>,
  ) {}

  findAll(): Promise<Movie[]> {
    return this.MoviesRepository.find();
  }

  findOne(id: number): Promise<Movie | null> {
    return this.MoviesRepository.findOneBy({ id });
  }

  create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const Movie = this.MoviesRepository.create(createMovieDto);
    return this.MoviesRepository.save(Movie);
  }
}
