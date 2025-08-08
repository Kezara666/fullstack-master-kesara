"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QtyModule = void 0;
const common_1 = require("@nestjs/common");
const qty_service_1 = require("./qty.service");
const qty_controller_1 = require("./qty.controller");
const typeorm_1 = require("@nestjs/typeorm");
const shop_entity_1 = require("../../shop-management/shop/entities/shop.entity");
const user_entity_1 = require("../../shop-management/user/entities/user.entity");
const qty_type_entity_1 = require("../qty-type/entities/qty-type.entity");
const qty_entity_1 = require("./entities/qty.entity");
const product_entity_1 = require("../../item-management/products/entities/product.entity");
let QtyModule = class QtyModule {
};
exports.QtyModule = QtyModule;
exports.QtyModule = QtyModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([qty_entity_1.Qty, shop_entity_1.Shop, user_entity_1.User, qty_type_entity_1.QtyType, product_entity_1.Product])],
        providers: [qty_service_1.QtyService],
        controllers: [qty_controller_1.QtyController],
    })
], QtyModule);
//# sourceMappingURL=qty.module.js.map