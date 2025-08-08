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
exports.Product = void 0;
const qty_type_entity_1 = require("../../../inventory-management/qty-type/entities/qty-type.entity");
const product_price_entity_1 = require("../../product-prices/entities/product-price.entity");
const supplier_entity_1 = require("../../supplier/entities/supplier.entity");
const shop_entity_1 = require("../../../shop-management/shop/entities/shop.entity");
const user_entity_1 = require("../../../shop-management/user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "barCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "qrCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "subcategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Product.prototype, "currentPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Product.prototype, "warranty", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => supplier_entity_1.Supplier, { nullable: false }),
    __metadata("design:type", supplier_entity_1.Supplier)
], Product.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_price_entity_1.ProductPrice, { nullable: true }),
    __metadata("design:type", product_price_entity_1.ProductPrice)
], Product.prototype, "productPrice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => qty_type_entity_1.QtyType, { nullable: false }),
    __metadata("design:type", qty_type_entity_1.QtyType)
], Product.prototype, "qtyType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Product.prototype, "qty", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => shop_entity_1.Shop, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'shopId' }),
    __metadata("design:type", shop_entity_1.Shop)
], Product.prototype, "shop", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", user_entity_1.User)
], Product.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'updatedById' }),
    __metadata("design:type", user_entity_1.User)
], Product.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products')
], Product);
//# sourceMappingURL=product.entity.js.map