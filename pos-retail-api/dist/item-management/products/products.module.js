"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const products_controller_1 = require("./products.controller");
const product_entity_1 = require("./entities/product.entity");
const supplier_entity_1 = require("../supplier/entities/supplier.entity");
const qty_type_entity_1 = require("../../inventory-management/qty-type/entities/qty-type.entity");
const typeorm_1 = require("@nestjs/typeorm");
const product_price_entity_1 = require("../product-prices/entities/product-price.entity");
const user_entity_1 = require("../../shop-management/user/entities/user.entity");
const shop_entity_1 = require("../../shop-management/shop/entities/shop.entity");
const qty_entity_1 = require("../../inventory-management/qty/entities/qty.entity");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, supplier_entity_1.Supplier, qty_type_entity_1.QtyType, product_price_entity_1.ProductPrice, user_entity_1.User, shop_entity_1.Shop, qty_entity_1.Qty])],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map