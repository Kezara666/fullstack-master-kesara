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
exports.QtyTypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const qty_type_entity_1 = require("./entities/qty-type.entity");
const shop_entity_1 = require("../../shop-management/shop/entities/shop.entity");
const user_entity_1 = require("../../shop-management/user/entities/user.entity");
let QtyTypeService = class QtyTypeService {
    constructor(qtyTypeRepository, shopRepository, userRepository) {
        this.qtyTypeRepository = qtyTypeRepository;
        this.shopRepository = shopRepository;
        this.userRepository = userRepository;
    }
    async create(createDto) {
        const { name, mainQtyId, primaryWeightTo, shopId, createdById, updatedById } = createDto;
        const [shop, createdBy, updatedBy] = await Promise.all([
            this.shopRepository.findOneBy({ id: shopId }),
            this.userRepository.findOneBy({ id: createdById }),
            this.userRepository.findOneBy({ id: updatedById }),
        ]);
        let mainQty;
        if (mainQtyId) {
            mainQty = await this.qtyTypeRepository.findOneBy({ id: mainQtyId });
        }
        const qtyType = this.qtyTypeRepository.create({
            name,
            mainQty,
            primaryWeightTo,
            shop,
            createdBy,
            updatedBy,
        });
        return await this.qtyTypeRepository.save(qtyType);
    }
    async findByShop(shopId) {
        return await this.qtyTypeRepository.find({
            where: { shop: { id: shopId } },
            relations: ['shop'],
        });
    }
    async findAll() {
        return await this.qtyTypeRepository.find({
            relations: ['shop', 'createdBy', 'updatedBy', 'mainQty'],
        });
    }
    async findOne(id) {
        return await this.qtyTypeRepository.findOne({
            where: { id },
            relations: ['shop', 'createdBy', 'updatedBy', 'mainQty'],
        });
    }
    async update(id, updateDto) {
        const qtyType = await this.qtyTypeRepository.findOne({
            where: { id },
            relations: ['mainQty', 'shop', 'updatedBy'],
        });
        if (!qtyType)
            throw new Error('QtyType not found');
        const { name, mainQtyId, primaryWeightTo, shopId, updatedById } = updateDto;
        if (name)
            qtyType.name = name;
        if (primaryWeightTo !== undefined)
            qtyType.primaryWeightTo = primaryWeightTo;
        if (mainQtyId !== undefined) {
            qtyType.mainQty = await this.qtyTypeRepository.findOneBy({ id: mainQtyId });
        }
        if (shopId !== undefined) {
            qtyType.shop = await this.shopRepository.findOneBy({ id: shopId });
        }
        if (updatedById !== undefined) {
            qtyType.updatedBy = await this.userRepository.findOneBy({ id: updatedById });
        }
        return await this.qtyTypeRepository.save(qtyType);
    }
    async remove(id) {
        await this.qtyTypeRepository.delete(id);
    }
};
exports.QtyTypeService = QtyTypeService;
exports.QtyTypeService = QtyTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(qty_type_entity_1.QtyType)),
    __param(1, (0, typeorm_1.InjectRepository)(shop_entity_1.Shop)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], QtyTypeService);
//# sourceMappingURL=qty-type.service.js.map