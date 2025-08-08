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
exports.Invoice = void 0;
const customer_entity_1 = require("../../customer/entities/customer.entity");
const item_sell_entity_1 = require("../../item-sell/entities/item-sell.entity");
const shop_entity_1 = require("../../../shop-management/shop/entities/shop.entity");
const user_entity_1 = require("../../../shop-management/user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Invoice = class Invoice {
};
exports.Invoice = Invoice;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Invoice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_sell_entity_1.ItemSell, item => item.invoice),
    __metadata("design:type", Array)
], Invoice.prototype, "itemsSelled", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'customer' }),
    __metadata("design:type", customer_entity_1.Customer)
], Invoice.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], Invoice.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "netTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Invoice.prototype, "completedItemSell", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Invoice.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Invoice.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => shop_entity_1.Shop, (shop) => shop.suppliers),
    (0, typeorm_1.JoinColumn)({ name: 'shopId' }),
    __metadata("design:type", shop_entity_1.Shop)
], Invoice.prototype, "shop", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", user_entity_1.User)
], Invoice.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'updatedById' }),
    __metadata("design:type", user_entity_1.User)
], Invoice.prototype, "updatedBy", void 0);
exports.Invoice = Invoice = __decorate([
    (0, typeorm_1.Entity)()
], Invoice);
//# sourceMappingURL=invoice.entity.js.map