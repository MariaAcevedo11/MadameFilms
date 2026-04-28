"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActressesModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const actress_entity_1 = require("./entities/actress.entity");
const actresses_controller_1 = require("./actresses.controller");
const actresses_service_1 = require("./actresses.service");
let ActressesModule = class ActressesModule {
};
exports.ActressesModule = ActressesModule;
exports.ActressesModule = ActressesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([actress_entity_1.Actress])],
        controllers: [actresses_controller_1.ActressesController],
        providers: [actresses_service_1.ActressesService],
    })
], ActressesModule);
//# sourceMappingURL=actresses.module.js.map