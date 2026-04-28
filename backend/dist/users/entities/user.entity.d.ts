import { Review } from 'src/reviews/entities/reviews.entity';
export declare class User {
    id: number;
    username: string;
    role: string;
    email: string;
    password: string;
    image: string;
    reviews: Review[];
}
