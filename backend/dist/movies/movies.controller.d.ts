import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    findAll(): Promise<Movie[]>;
    findOne(id: string): Promise<Movie | null>;
    create(dto: CreateMovieDto): Promise<Movie>;
    update(id: string, dto: Partial<CreateMovieDto>): Promise<Movie>;
    delete(id: string): Promise<void>;
}
