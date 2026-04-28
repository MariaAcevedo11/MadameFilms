import type { AuthRequest } from 'src/auth/types/auth-request.type';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/reviews.entity';
import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    findAll(): Promise<Review[]>;
    findOne(id: string): Promise<Review | null>;
    create(dto: CreateReviewDto, req: AuthRequest): Promise<Review>;
    update(id: string, dto: Partial<CreateReviewDto>): Promise<Review>;
    delete(id: string): Promise<void>;
}
