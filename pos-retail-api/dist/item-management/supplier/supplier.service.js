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
exports.SupplierService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const supplier_entity_1 = require("./entities/supplier.entity");
const shop_entity_1 = require("../../shop-management/shop/entities/shop.entity");
const user_entity_1 = require("../../shop-management/user/entities/user.entity");
let SupplierService = class SupplierService {
    constructor(supplierRepository, shopRepository, userRepository) {
        this.supplierRepository = supplierRepository;
        this.shopRepository = shopRepository;
        this.userRepository = userRepository;
    }
    async create(createSupplierDto) {
        const { name, shopId, createdById } = createSupplierDto;
        const [shop, createdBy] = await Promise.all([
            this.shopRepository.findOneBy({ id: shopId }),
            this.userRepository.findOneBy({ id: createdById }),
        ]);
        if (!shop || !createdBy) {
            throw new Error('Shop or User not found');
        }
        const supplier = this.supplierRepository.create({
            name,
            shop,
            createdBy,
            updatedBy: createdBy,
        });
        return await this.supplierRepository.save(supplier);
    }
    async findAllSpecificShop(id) {
        return await this.supplierRepository.find({
            where: { shop: { id } },
            relations: ['shop', 'createdBy', 'updatedBy'],
        });
    }
    async update(id, updateSupplierDto) {
        const { name, shopId, updatedById } = updateSupplierDto;
        const supplier = await this.supplierRepository.findOne({
            where: { id },
            relations: ['shop', 'updatedBy'],
        });
        if (!supplier) {
            throw new Error('Supplier not found');
        }
        if (shopId) {
            const shop = await this.shopRepository.findOneBy({ id: shopId });
            if (!shop)
                throw new Error('Shop not found');
            supplier.shop = shop;
        }
        if (updatedById) {
            const updatedBy = await this.userRepository.findOneBy({ id: updatedById });
            if (!updatedBy)
                throw new Error('User not found');
            supplier.updatedBy = updatedBy;
        }
        if (name)
            supplier.name = name;
        return await this.supplierRepository.save(supplier);
    }
    async findAll() {
        return await this.supplierRepository.find({
            relations: ['shop', 'createdBy', 'updatedBy'],
        });
    }
    async findOne(id) {
        return await this.supplierRepository.findOne({
            where: { id },
            relations: ['shop', 'createdBy', 'updatedBy'],
        });
    }
    async remove(id) {
        await this.supplierRepository.delete(id);
    }
};
exports.SupplierService = SupplierService;
exports.SupplierService = SupplierService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(supplier_entity_1.Supplier)),
    __param(1, (0, typeorm_1.InjectRepository)(shop_entity_1.Shop)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SupplierService);
//# sourceMappingURL=supplier.service.js.map