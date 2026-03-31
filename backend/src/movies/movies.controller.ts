import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

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
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }
}
