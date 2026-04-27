// External imports
import { PartialType } from '@nestjs/mapped-types';

// Internal imports
import { CreateMovieDto } from './create-movie.dto';
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
