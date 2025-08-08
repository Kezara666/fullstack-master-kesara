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
exports.CreateProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateProductDto {
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Laptop', description: 'Name of the product' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'High performance laptop', description: 'Description of the product' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1234567890123', description: 'Bar code of the product' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "barCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'QRCODE123456', description: 'QR code of the product' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "qrCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Electronics', description: 'Category of the product' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Laptops', description: 'Subcategory of the product' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "subcategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 999.99, description: 'Current price of the product' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "currentPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12, description: 'Warranty period in months' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "warranty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Supplier ID' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "supplierId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'QtyType ID' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "qtyTypeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'ProductPrice ID' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "productPriceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: 'Qty' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "qty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "shopId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101 }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "createdById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101 }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "updatedById", void 0);
//# sourceMappingURL=create-product.dto.js.map