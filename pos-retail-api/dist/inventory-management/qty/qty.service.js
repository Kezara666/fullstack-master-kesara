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
exports.QtyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const qty_entity_1 = require("./entities/qty.entity");
const product_entity_1 = require("../../item-management/products/entities/product.entity");
const qty_type_entity_1 = require("../qty-type/entities/qty-type.entity");
const shop_entity_1 = require("../../shop-management/shop/entities/shop.entity");
const user_entity_1 = require("../../shop-management/user/entities/user.entity");
let QtyService = class QtyService {
    constructor(qtyRepository, productRepository, qtyTypeRepository, shopRepository, userRepository) {
        this.qtyRepository = qtyRepository;
        this.productRepository = productRepository;
        this.qtyTypeRepository = qtyTypeRepository;
        this.shopRepository = shopRepository;
        this.userRepository = userRepository;
    }
    async create(createQtyDto) {
        const { productId, qtyTypeId, qty, shopId, createdById, updatedById } = createQtyDto;
        return await this.productRepository.manager.transaction(async (transactionalEntityManager) => {
            const [product, qtyType, shop, createdBy, updatedBy] = await Promise.all([
                transactionalEntityManager.findOneBy(product_entity_1.Product, { id: productId }),
                transactionalEntityManager.findOneBy(qty_type_entity_1.QtyType, { id: qtyTypeId }),
                transactionalEntityManager.findOneBy(shop_entity_1.Shop, { id: shopId }),
                transactionalEntityManager.findOneBy(user_entity_1.User, { id: createdById }),
                transactionalEntityManager.findOneBy(user_entity_1.User, { id: updatedById }),
            ]);
            if (!product || !qtyType || !shop || !createdBy || !updatedBy) {
                throw new Error('Invalid references found');
            }
            const totalQty = product.qty + qty;
            await transactionalEntityManager.update(product_entity_1.Product, { id: productId }, { qty: totalQty });
            const qtyRecord = transactionalEntityManager.create(qty_entity_1.Qty, {
                product,
                qtyType,
                qty,
                shop,
                createdBy,
                updatedBy,
            });
            return await transactionalEntityManager.save(qty_entity_1.Qty, qtyRecord);
        });
    }
    async findAll() {
        return await this.qtyRepository.find({
            relations: ['product', 'qtyType', 'shop', 'createdBy', 'updatedBy'],
        });
    }
    async findByShop(shopId) {
        const shopExists = await this.shopRepository.exists({ where: { id: shopId } });
        if (!shopExists) {
            throw new common_1.NotFoundException(`Shop with ID ${shopId} not found.`);
        }
        const qtys = await this.qtyRepository.find({
            where: {
                shop: { id: shopId },
            },
            relations: ['product', 'qtyType', 'shop', 'createdBy', 'updatedBy'],
        });
        return qtys;
    }
    async findOne(id) {
        return await this.qtyRepository.findOne({
            where: { id },
            relations: ['product', 'qtyType', 'shop', 'createdBy', 'updatedBy'],
        });
    }
    async update(id, updateQtyDto) {
        const qtyRecord = await this.qtyRepository.findOne({
            where: { id },
            relations: ['product', 'qtyType', 'shop', 'updatedBy'],
        });
        if (!qtyRecord)
            throw new Error('Qty record not found');
        const { productId, qtyTypeId, qty, shopId, updatedById } = updateQtyDto;
        if (productId)
            qtyRecord.product = await this.productRepository.findOneBy({ id: productId });
        if (qtyTypeId)
            qtyRecord.qtyType = await this.qtyTypeRepository.findOneBy({ id: qtyTypeId });
        if (qty !== undefined)
            qtyRecord.qty = qty;
        if (shopId)
            qtyRecord.shop = await this.shopRepository.findOneBy({ id: shopId });
        if (updatedById)
            qtyRecord.updatedBy = await this.userRepository.findOneBy({ id: updatedById });
        return await this.qtyRepository.save(qtyRecord);
    }
    async remove(id) {
        await this.qtyRepository.delete(id);
    }
};
exports.QtyService = QtyService;
exports.QtyService = QtyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(qty_entity_1.Qty)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(qty_type_entity_1.QtyType)),
    __param(3, (0, typeorm_1.InjectRepository)(shop_entity_1.Shop)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], QtyService);
//# sourceMappingURL=qty.service.js.map