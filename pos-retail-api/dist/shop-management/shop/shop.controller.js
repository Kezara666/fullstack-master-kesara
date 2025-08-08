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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopController = void 0;
const common_1 = require("@nestjs/common");
const shop_service_1 = require("./shop.service");
const create_shop_dto_1 = require("./dto/create-shop.dto");
const update_shop_dto_1 = require("./dto/update-shop.dto");
const swagger_1 = require("@nestjs/swagger");
const shop_entity_1 = require("./entities/shop.entity");
let ShopController = class ShopController {
    constructor(shopService) {
        this.shopService = shopService;
    }
    create(createShopDto) {
        return this.shopService.create(createShopDto);
    }
    findAll() {
        return this.shopService.findAll();
    }
    findOne(id) {
        return this.shopService.findOne(+id);
    }
    update(id, updateShopDto) {
        return this.shopService.update(+id, updateShopDto);
    }
    remove(id) {
        return this.shopService.remove(+id);
    }
};
exports.ShopController = ShopController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new shop' }),
    (0, swagger_1.ApiBody)({ type: create_shop_dto_1.CreateShopDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Created', type: shop_entity_1.Shop }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shop_dto_1.CreateShopDto]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all shops' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of shops', type: [shop_entity_1.Shop] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get shop by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Found shop', type: shop_entity_1.Shop }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update shop by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number' }),
    (0, swagger_1.ApiBody)({ type: update_shop_dto_1.UpdateShopDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Updated', type: shop_entity_1.Shop }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shop_dto_1.UpdateShopDto]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete shop by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "remove", null);
exports.ShopController = ShopController = __decorate([
    (0, swagger_1.ApiTags)('shops'),
    (0, common_1.Controller)('shops'),
    __metadata("design:paramtypes", [shop_service_1.ShopService])
], ShopController);
//# sourceMappingURL=shop.controller.js.map