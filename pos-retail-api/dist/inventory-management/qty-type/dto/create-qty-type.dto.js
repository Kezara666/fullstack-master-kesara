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
exports.CreateQtyTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateQtyTypeDto {
}
exports.CreateQtyTypeDto = CreateQtyTypeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Gram' }),
    __metadata("design:type", String)
], CreateQtyTypeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    __metadata("design:type", Number)
], CreateQtyTypeDto.prototype, "mainQtyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], CreateQtyTypeDto.prototype, "primaryWeightTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CreateQtyTypeDto.prototype, "shopId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101 }),
    __metadata("design:type", Number)
], CreateQtyTypeDto.prototype, "createdById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101 }),
    __metadata("design:type", Number)
], CreateQtyTypeDto.prototype, "updatedById", void 0);
//# sourceMappingURL=create-qty-type.dto.js.map