import { Actress } from 'src/actresses/entities/actress.entity';
import { Review } from 'src/reviews/entities/reviews.entity';
export declare class Movie {
    id: number;
    title: string;
    description: string;
    cast: string;
    director: string;
    releaseDate: Date;
    genre: string;
    durationMin: number;
    country: string;
    language: string;
    image: string;
    actress: Actress;
    actressId: number;
    reviews: Review[];
}
