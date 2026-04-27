// External imports
import { PartialType } from '@nestjs/mapped-types';

// Internal imports
import { CreateReviewDto } from './create-review.dto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}
