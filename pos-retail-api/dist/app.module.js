"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const qty_type_module_1 = require("./inventory-management/qty-type/qty-type.module");
const supplier_module_1 = require("./item-management/supplier/supplier.module");
const products_module_1 = require("./item-management/products/products.module");
const qty_module_1 = require("./inventory-management/qty/qty.module");
const item_sell_module_1 = require("./sale-management/item-sell/item-sell.module");
const invoice_module_1 = require("./sale-management/invoice/invoice.module");
const customer_module_1 = require("./sale-management/customer/customer.module");
const product_prices_module_1 = require("./item-management/product-prices/product-prices.module");
const shop_module_1 = require("./shop-management/shop/shop.module");
const user_module_1 = require("./shop-management/user/user.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                charset: 'utf8mb4',
                password: '',
                database: 'pos',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                logging: true,
            }),
            qty_type_module_1.QtyTypeModule,
            supplier_module_1.SupplierModule,
            products_module_1.ProductsModule,
            product_prices_module_1.ProductPriceModule,
            qty_module_1.QtyModule,
            item_sell_module_1.ItemSellModule,
            invoice_module_1.InvoiceModule,
            customer_module_1.CustomerModule,
            shop_module_1.ShopModule,
            user_module_1.UserModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService,],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map