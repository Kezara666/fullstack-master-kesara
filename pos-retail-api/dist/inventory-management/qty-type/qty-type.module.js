"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QtyTypeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const qty_type_controller_1 = require("./qty-type.controller");
const qty_type_service_1 = require("./qty-type.service");
const qty_type_entity_1 = require("./entities/qty-type.entity");
const shop_entity_1 = require("../../shop-management/shop/entities/shop.entity");
const user_entity_1 = require("../../shop-management/user/entities/user.entity");
let QtyTypeModule = class QtyTypeModule {
};
exports.QtyTypeModule = QtyTypeModule;
exports.QtyTypeModule = QtyTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([qty_type_entity_1.QtyType, shop_entity_1.Shop, user_entity_1.User]),
        ],
        controllers: [qty_type_controller_1.QtyTypeController],
        providers: [qty_type_service_1.QtyTypeService],
    })
], QtyTypeModule);
//# sourceMappingURL=qty-type.module.js.map