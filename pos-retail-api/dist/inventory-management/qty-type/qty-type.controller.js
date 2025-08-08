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
exports.QtyTypeController = void 0;
const common_1 = require("@nestjs/common");
const qty_type_service_1 = require("./qty-type.service");
const create_qty_type_dto_1 = require("./dto/create-qty-type.dto");
const update_qty_type_dto_1 = require("./dto/update-qty-type.dto");
let QtyTypeController = class QtyTypeController {
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        const qtyType = await this.service.create(dto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'QtyType created successfully',
            data: qtyType,
        };
    }
    async findAll() {
        return await this.service.findAll();
    }
    async findByShop(shopId) {
        return await this.service.findByShop(shopId);
    }
    async findOne(id) {
        return await this.service.findOne(id);
    }
    async update(id, dto) {
        return await this.service.update(id, dto);
    }
    async remove(id) {
        return await this.service.remove(id);
    }
};
exports.QtyTypeController = QtyTypeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_qty_type_dto_1.CreateQtyTypeDto]),
    __metadata("design:returntype", Promise)
], QtyTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QtyTypeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('shop/:shopId'),
    __param(0, (0, common_1.Param)('shopId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QtyTypeController.prototype, "findByShop", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QtyTypeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_qty_type_dto_1.UpdateQtyTypeDto]),
    __metadata("design:returntype", Promise)
], QtyTypeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QtyTypeController.prototype, "remove", null);
exports.QtyTypeController = QtyTypeController = __decorate([
    (0, common_1.Controller)('qty-types'),
    __metadata("design:paramtypes", [qty_type_service_1.QtyTypeService])
], QtyTypeController);
//# sourceMappingURL=qty-type.controller.js.map