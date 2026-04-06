// Author: Gabriela Sanabria

// Internal imports

import { AuthService } from 'src/auth/auth.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

// Functions
@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private MoviesRepository: Repository<Movie>,
    private authService: AuthService,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.MoviesRepository.find();
  }

  async findOne(id: number): Promise<Movie | null> {
    return this.MoviesRepository.findOneBy({ id });
  }

  async create(dto: CreateMovieDto): Promise<Movie> {
    const newMovie = this.MoviesRepository.create(dto);
    return this.MoviesRepository.save(newMovie);
  }

  async delete(id: number): Promise<void> {
    await this.MoviesRepository.delete(id);
  }

  async update(id: number, dto: UpdateMovieDto, user: User): Promise<Movie> {
    if (!this.authService.isAdmin(user)) {
      throw new Error('Only admin users can update movies.');
    }

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

    return this.MoviesRepository.save(updatedMovie);
  }
}
