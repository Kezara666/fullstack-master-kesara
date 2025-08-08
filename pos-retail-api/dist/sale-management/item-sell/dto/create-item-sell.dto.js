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
exports.CreateItemSellDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateItemSellDto {
}
exports.CreateItemSellDto = CreateItemSellDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateItemSellDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateItemSellDto.prototype, "productPriceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateItemSellDto.prototype, "qtyTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateItemSellDto.prototype, "qty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25.99 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateItemSellDto.prototype, "qntPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateItemSellDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5.50, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateItemSellDto.prototype, "pendingdAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateItemSellDto.prototype, "completedItemSell", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateItemSellDto.prototype, "shopId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateItemSellDto.prototype, "createdById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateItemSellDto.prototype, "updatedById", void 0);
//# sourceMappingURL=create-item-sell.dto.js.map