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
exports.QtyController = void 0;
const common_1 = require("@nestjs/common");
const qty_service_1 = require("./qty.service");
const create_qty_dto_1 = require("./dto/create-qty.dto");
const update_qty_dto_1 = require("./dto/update-qty.dto");
const qty_entity_1 = require("./entities/qty.entity");
const swagger_1 = require("@nestjs/swagger");
let QtyController = class QtyController {
    constructor(qtyService) {
        this.qtyService = qtyService;
    }
    async create(createQtyDto) {
        return this.qtyService.create(createQtyDto);
    }
    async findAll() {
        return this.qtyService.findAll();
    }
    async findByShop(shopId) {
        return this.qtyService.findByShop(+shopId);
    }
    async findOne(id) {
        return this.qtyService.findOne(id);
    }
    async update(id, updateQtyDto) {
        return this.qtyService.update(id, updateQtyDto);
    }
    async remove(id) {
        await this.qtyService.remove(id);
    }
};
exports.QtyController = QtyController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_qty_dto_1.CreateQtyDto]),
    __metadata("design:returntype", Promise)
], QtyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QtyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('shop/:shopId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all quantity records by shop ID' }),
    (0, swagger_1.ApiParam)({ name: 'shopId', type: Number, description: 'ID of the shop' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of quantity records for the given shop.', type: [qty_entity_1.Qty] }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No quantity records found for this shop or shop does not exist.' }),
    __param(0, (0, common_1.Param)('shopId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QtyController.prototype, "findByShop", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QtyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_qty_dto_1.UpdateQtyDto]),
    __metadata("design:returntype", Promise)
], QtyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QtyController.prototype, "remove", null);
exports.QtyController = QtyController = __decorate([
    (0, common_1.Controller)('qties'),
    __metadata("design:paramtypes", [qty_service_1.QtyService])
], QtyController);
//# sourceMappingURL=qty.controller.js.map