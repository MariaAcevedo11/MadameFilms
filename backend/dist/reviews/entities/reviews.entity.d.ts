import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Review {
    id: number;
    rating: number;
    comment: string;
    date: Date;
    user: User;
    movie: Movie;
    movieId: number;
    userId: number;
}
