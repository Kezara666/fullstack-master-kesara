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
exports.ItemSellController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const item_sell_service_1 = require("./item-sell.service");
const create_item_sell_dto_1 = require("./dto/create-item-sell.dto");
const update_item_sell_dto_1 = require("./dto/update-item-sell.dto");
let ItemSellController = class ItemSellController {
    constructor(itemSellService) {
        this.itemSellService = itemSellService;
    }
    create(createItemSellDto) {
        return this.itemSellService.create(createItemSellDto);
    }
    findAll() {
        return this.itemSellService.findAll();
    }
    findOne(id) {
        return this.itemSellService.findOne(+id);
    }
    update(id, updateItemSellDto) {
        return this.itemSellService.update(+id, updateItemSellDto);
    }
    remove(id) {
        return this.itemSellService.remove(+id);
    }
};
exports.ItemSellController = ItemSellController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new item sell record' }),
    (0, swagger_1.ApiBody)({ type: create_item_sell_dto_1.CreateItemSellDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Item sell record created successfully.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_item_sell_dto_1.CreateItemSellDto]),
    __metadata("design:returntype", void 0)
], ItemSellController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all item sell records' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of item sell records returned.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ItemSellController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get an item sell record by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'Item sell record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Item sell record found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Item sell record not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItemSellController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an item sell record by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'Item sell record ID' }),
    (0, swagger_1.ApiBody)({ type: update_item_sell_dto_1.UpdateItemSellDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Item sell record updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Item sell record not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_item_sell_dto_1.UpdateItemSellDto]),
    __metadata("design:returntype", void 0)
], ItemSellController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an item sell record by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'Item sell record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Item sell record deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Item sell record not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItemSellController.prototype, "remove", null);
exports.ItemSellController = ItemSellController = __decorate([
    (0, swagger_1.ApiTags)('item-sell'),
    (0, common_1.Controller)('item-sell'),
    __metadata("design:paramtypes", [item_sell_service_1.ItemSellService])
], ItemSellController);
//# sourceMappingURL=item-sell.controller.js.map