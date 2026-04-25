// Author: Gabriela Sanabria

// Internal imports
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

// Functions
@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async findOne(id: number): Promise<Movie | null> {
    return this.moviesRepository.findOneBy({ id });
  }

  async create(dto: CreateMovieDto): Promise<Movie> {
    const newMovie = this.moviesRepository.create({
      ...dto,
      actress: { id: dto.actressId },
    });
    return this.moviesRepository.save(newMovie);
  }

  async delete(id: number): Promise<void> {
    await this.moviesRepository.delete(id);
  }

  async update(id: number, dto: UpdateMovieDto): Promise<Movie> {
    const existing = await this.findOne(id);

    if (!existing) {
      throw new Error('Movie not found.');
    }

    const updatedMovie: Movie = {
      ...existing,
      title: dto.title ?? existing.title,
      description: dto.description ?? existing.description,
      cast: dto.cast ?? existing.cast,
      director: dto.director ?? existing.director,
      releaseDate: dto.releaseDate ?? existing.releaseDate,
      genre: dto.genre ?? existing.genre,
      durationMin: dto.durationMin ?? existing.durationMin,
      country: dto.country ?? existing.country,
      language: dto.language ?? existing.language,
      image: dto.image ?? existing.image,
      actressId: dto.actressId ?? existing.actressId,
    };

    return this.moviesRepository.save(updatedMovie);
  }
}
