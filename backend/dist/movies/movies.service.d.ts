import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
export declare class MoviesService {
    private moviesRepository;
    constructor(moviesRepository: Repository<Movie>);
    findAll(): Promise<Movie[]>;
    findOne(id: number): Promise<Movie | null>;
    create(dto: CreateMovieDto): Promise<Movie>;
    delete(id: number): Promise<void>;
    update(id: number, dto: UpdateMovieDto): Promise<Movie>;
}
