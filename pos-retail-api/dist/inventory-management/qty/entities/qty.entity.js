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
exports.Qty = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../../../item-management/products/entities/product.entity");
const qty_type_entity_1 = require("../../qty-type/entities/qty-type.entity");
const shop_entity_1 = require("../../../shop-management/shop/entities/shop.entity");
const user_entity_1 = require("../../../shop-management/user/entities/user.entity");
let Qty = class Qty {
};
exports.Qty = Qty;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], Qty.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'productId' }),
    (0, swagger_1.ApiProperty)({ type: () => product_entity_1.Product }),
    __metadata("design:type", product_entity_1.Product)
], Qty.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => qty_type_entity_1.QtyType, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'qtyTypeId' }),
    (0, swagger_1.ApiProperty)({ type: () => qty_type_entity_1.QtyType }),
    __metadata("design:type", qty_type_entity_1.QtyType)
], Qty.prototype, "qtyType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    (0, swagger_1.ApiProperty)({ example: 100.5 }),
    __metadata("design:type", Number)
], Qty.prototype, "qty", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Qty.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Qty.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => shop_entity_1.Shop, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'shopId' }),
    (0, swagger_1.ApiProperty)({ type: () => shop_entity_1.Shop }),
    __metadata("design:type", shop_entity_1.Shop)
], Qty.prototype, "shop", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User }),
    __metadata("design:type", user_entity_1.User)
], Qty.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'updatedById' }),
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User }),
    __metadata("design:type", user_entity_1.User)
], Qty.prototype, "updatedBy", void 0);
exports.Qty = Qty = __decorate([
    (0, typeorm_1.Entity)()
], Qty);
//# sourceMappingURL=qty.entity.js.map