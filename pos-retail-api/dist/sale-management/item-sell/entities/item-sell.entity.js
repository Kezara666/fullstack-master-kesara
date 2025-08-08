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
exports.ItemSell = void 0;
const product_entity_1 = require("../../../item-management/products/entities/product.entity");
const qty_type_entity_1 = require("../../../inventory-management/qty-type/entities/qty-type.entity");
const invoice_entity_1 = require("../../invoice/entities/invoice.entity");
const typeorm_1 = require("typeorm");
const shop_entity_1 = require("../../../shop-management/shop/entities/shop.entity");
const user_entity_1 = require("../../../shop-management/user/entities/user.entity");
const product_price_entity_1 = require("../../../item-management/product-prices/entities/product-price.entity");
let ItemSell = class ItemSell {
};
exports.ItemSell = ItemSell;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ItemSell.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'product' }),
    __metadata("design:type", product_entity_1.Product)
], ItemSell.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_price_entity_1.ProductPrice, { nullable: true }),
    __metadata("design:type", product_price_entity_1.ProductPrice)
], ItemSell.prototype, "productPrice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => invoice_entity_1.Invoice, invoice => invoice.itemsSelled, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'invoiceId' }),
    __metadata("design:type", invoice_entity_1.Invoice)
], ItemSell.prototype, "invoice", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ItemSell.prototype, "invoiceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => qty_type_entity_1.QtyType, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'qtyType' }),
    __metadata("design:type", qty_type_entity_1.QtyType)
], ItemSell.prototype, "qtyType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], ItemSell.prototype, "qty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], ItemSell.prototype, "qntPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], ItemSell.prototype, "pendingdAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], ItemSell.prototype, "completedItemSell", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ItemSell.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ItemSell.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => shop_entity_1.Shop, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'shopId' }),
    __metadata("design:type", shop_entity_1.Shop)
], ItemSell.prototype, "shop", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", user_entity_1.User)
], ItemSell.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'updatedById' }),
    __metadata("design:type", user_entity_1.User)
], ItemSell.prototype, "updatedBy", void 0);
exports.ItemSell = ItemSell = __decorate([
    (0, typeorm_1.Entity)()
], ItemSell);
//# sourceMappingURL=item-sell.entity.js.map