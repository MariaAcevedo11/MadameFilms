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
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const movie_entity_1 = require("./entities/movie.entity");
const typeorm_2 = require("typeorm");
let MoviesService = class MoviesService {
    moviesRepository;
    constructor(moviesRepository) {
        this.moviesRepository = moviesRepository;
    }
    async findAll() {
        return this.moviesRepository.find();
    }
    async findOne(id) {
        return this.moviesRepository.findOneBy({ id });
    }
    async create(dto) {
        const newMovie = this.moviesRepository.create({
            ...dto,
            actress: { id: dto.actressId },
        });
        return this.moviesRepository.save(newMovie);
    }
    async delete(id) {
        await this.moviesRepository.delete(id);
    }
    async update(id, dto) {
        const existing = await this.findOne(id);
        if (!existing) {
            throw new Error('Movie not found.');
        }
        const updatedMovie = {
            ...existing,
            title: dto.title ?? existing.title,
            description: dto.description ?? existing.description,
            cast: dto.cast ?? existing.cast,
            director: dto.director ?? existing.director,
            releaseDate: dto.releaseDate ?? existing.releaseDate,
            genre: dto.genre ?? existing.genre,
            durationMin: dto.durationMin ?? existing.durationMin,
            country: dto.country ?? existing.country,
            language: dto.language ?? existing.language,
            image: dto.image ?? existing.image,
            actressId: dto.actressId ?? existing.actressId,
        };
        return this.moviesRepository.save(updatedMovie);
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MoviesService);
//# sourceMappingURL=movies.service.js.map