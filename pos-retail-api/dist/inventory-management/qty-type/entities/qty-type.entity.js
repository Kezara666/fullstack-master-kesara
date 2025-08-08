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
exports.QtyType = void 0;
const typeorm_1 = require("typeorm");
const shop_entity_1 = require("../../../shop-management/shop/entities/shop.entity");
const user_entity_1 = require("../../../shop-management/user/entities/user.entity");
let QtyType = class QtyType {
};
exports.QtyType = QtyType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], QtyType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], QtyType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => QtyType, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'mainQty' }),
    __metadata("design:type", QtyType)
], QtyType.prototype, "mainQty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], QtyType.prototype, "primaryWeightTo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => shop_entity_1.Shop, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'shopId' }),
    __metadata("design:type", shop_entity_1.Shop)
], QtyType.prototype, "shop", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", user_entity_1.User)
], QtyType.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'updatedById' }),
    __metadata("design:type", user_entity_1.User)
], QtyType.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QtyType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], QtyType.prototype, "updatedAt", void 0);
exports.QtyType = QtyType = __decorate([
    (0, typeorm_1.Entity)('QtyType')
], QtyType);
//# sourceMappingURL=qty-type.entity.js.map