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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async login(dto) {
        const { email, password } = dto;
        const user = await this.usersService.findByEmail(email);
        if (!user || user.password !== password) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role,
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return { access_token: accessToken };
    }
    async register(dto) {
        const user = await this.usersService.create({
            username: dto.username,
            email: dto.email,
            password: dto.password,
            image: dto.image,
            role: dto.role,
        });
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role,
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return { access_token: accessToken };
    }
    async getProfile(jwtPayload) {
        return this.usersService.findOne(jwtPayload.id);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map