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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
class CreateUserDto {
    username;
    role;
    email;
    password;
    image;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Username must be text.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Username is required.' }),
    (0, class_validator_1.MinLength)(3, { message: 'Username must be at least 3 characters long.' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Username must be at most 50 characters long.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Role must be text.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Role is required.' }),
    (0, class_validator_1.MinLength)(3, { message: 'Role must be at least 3 characters long.' }),
    (0, class_validator_1.MaxLength)(20, { message: 'Role must be at most 20 characters long.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Email must be text.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required.' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email format is invalid.' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Email must be at most 100 characters long.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Password must be text.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required.' }),
    (0, class_validator_1.MinLength)(3, { message: 'Password must be at least 3 characters long.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Image must be text (URL or path).' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Image is required.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "image", void 0);
//# sourceMappingURL=create-user.dto.js.map