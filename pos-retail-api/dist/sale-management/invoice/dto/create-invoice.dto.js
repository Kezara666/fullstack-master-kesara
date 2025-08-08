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
exports.CreateInvoiceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_item_sell_dto_1 = require("../../item-sell/dto/create-item-sell.dto");
class CreateInvoiceDto {
}
exports.CreateInvoiceDto = CreateInvoiceDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID of the customer (optional)', example: 123 }),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total amount of the invoice', example: 1000.50 }),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Discount applied to the invoice', example: 50 }),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Net total after discount', example: 950.50 }),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "netTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of items sold',
        type: [create_item_sell_dto_1.CreateItemSellDto]
    }),
    __metadata("design:type", Array)
], CreateInvoiceDto.prototype, "itemsSelled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Pending amount if any', example: 100 }),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "pendingdAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether the item sell is completed', example: true }),
    __metadata("design:type", Boolean)
], CreateInvoiceDto.prototype, "completedItemSell", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date invoice was created', type: String, format: 'date-time' }),
    __metadata("design:type", Date)
], CreateInvoiceDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date invoice was updated', type: String, format: 'date-time' }),
    __metadata("design:type", Date)
], CreateInvoiceDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shop ID where invoice was created', example: 1 }),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "shopId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID who created the invoice', example: 10 }),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "createdById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID who last updated the invoice', example: 10 }),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "updatedById", void 0);
//# sourceMappingURL=create-invoice.dto.js.map