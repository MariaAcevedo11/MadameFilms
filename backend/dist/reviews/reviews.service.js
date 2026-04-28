"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reviews_entity_1 = require("./entities/reviews.entity");
let ReviewsService = class ReviewsService {
    reviewsRepository;
    constructor(reviewsRepository) {
        this.reviewsRepository = reviewsRepository;
    }
    findAll() {
        return this.reviewsRepository.find();
    }
    findOne(id) {
        return this.reviewsRepository.findOneBy({ id });
    }
    async create(dto, userId) {
        const newReview = this.reviewsRepository.create({
            ...dto,
            user: { id: userId },
            movie: { id: dto.movieId },
            date: new Date(),
        });
        return await this.reviewsRepository.save(newReview);
    }
    async update(id, dto) {
        const existing = await this.findOne(id);
        if (!existing) {
            throw new common_1.NotFoundException(`Review with id ${id} not found`);
        }
        const updated = this.reviewsRepository.merge(existing, {
            ...dto,
            date: new Date(),
        });
        return this.reviewsRepository.save(updated);
    }
    async delete(id) {
        const review = await this.findOne(id);
        if (!review) {
            throw new common_1.NotFoundException(`Review with id ${id} not found`);
        }
        await this.reviewsRepository.delete(id);
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reviews_entity_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map