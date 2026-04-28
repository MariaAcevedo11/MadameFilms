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
exports.ActressesController = void 0;
const common_1 = require("@nestjs/common");
const actresses_service_1 = require("./actresses.service");
const create_actress_dto_1 = require("./dto/create-actress.dto");
let ActressesController = class ActressesController {
    actressesService;
    constructor(actressesService) {
        this.actressesService = actressesService;
    }
    findAll() {
        return this.actressesService.findAll();
    }
    findOne(id) {
        return this.actressesService.findOne(Number(id));
    }
    create(dto) {
        return this.actressesService.create(dto);
    }
};
exports.ActressesController = ActressesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ActressesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActressesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_actress_dto_1.CreateActressDto]),
    __metadata("design:returntype", void 0)
], ActressesController.prototype, "create", null);
exports.ActressesController = ActressesController = __decorate([
    (0, common_1.Controller)('actresses'),
    __metadata("design:paramtypes", [actresses_service_1.ActressesService])
], ActressesController);
//# sourceMappingURL=actresses.controller.js.map