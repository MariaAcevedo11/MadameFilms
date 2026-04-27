// Author: Gabriela Martinez

// External imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

// Internal imports
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Movie | null> {
    return this.moviesService.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateMovieDto>,
  ): Promise<Movie> {
    return this.moviesService.update(Number(id), dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.moviesService.delete(Number(id));
  }
}
