import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/reviews.entity';
export declare class ReviewsService {
    private reviewsRepository;
    constructor(reviewsRepository: Repository<Review>);
    findAll(): Promise<Review[]>;
    findOne(id: number): Promise<Review | null>;
    create(dto: CreateReviewDto, userId: number): Promise<Review>;
    update(id: number, dto: UpdateReviewDto): Promise<Review>;
    delete(id: number): Promise<void>;
}
