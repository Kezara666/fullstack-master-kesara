"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPriceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_price_entity_1 = require("./entities/product-price.entity");
const product_prices_controller_1 = require("./product-prices.controller");
const product_prices_service_1 = require("./product-prices.service");
const shop_entity_1 = require("../../shop-management/shop/entities/shop.entity");
const user_entity_1 = require("../../shop-management/user/entities/user.entity");
const product_entity_1 = require("../products/entities/product.entity");
let ProductPriceModule = class ProductPriceModule {
};
exports.ProductPriceModule = ProductPriceModule;
exports.ProductPriceModule = ProductPriceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([product_price_entity_1.ProductPrice, product_entity_1.Product, shop_entity_1.Shop, user_entity_1.User]),
        ],
        controllers: [product_prices_controller_1.ProductPriceController],
        providers: [product_prices_service_1.ProductPriceService],
    })
], ProductPriceModule);
//# sourceMappingURL=product-prices.module.js.map