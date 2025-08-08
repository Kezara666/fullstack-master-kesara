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
exports.ProductPriceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_price_entity_1 = require("./entities/product-price.entity");
const shop_entity_1 = require("../../shop-management/shop/entities/shop.entity");
const user_entity_1 = require("../../shop-management/user/entities/user.entity");
const product_entity_1 = require("../products/entities/product.entity");
let ProductPriceService = class ProductPriceService {
    constructor(productPriceRepository, shopRepository, userRepository, productRepository) {
        this.productPriceRepository = productPriceRepository;
        this.shopRepository = shopRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }
    async create(createProductPriceDto) {
        const { productId, shopId, createdById, updatedById, ...rest } = createProductPriceDto;
        const [product, shop, createdBy, updatedBy] = await Promise.all([
            this.productRepository.findOneBy({ id: productId }),
            this.shopRepository.findOneBy({ id: shopId }),
            this.userRepository.findOneBy({ id: createdById }),
            this.userRepository.findOneBy({ id: updatedById }),
        ]);
        if (!product || !shop || !createdBy || !updatedBy) {
            throw new Error('Invalid references found');
        }
        const price = this.productPriceRepository.create({
            ...rest,
            product,
            shop,
            createdBy,
            updatedBy,
        });
        return await this.productPriceRepository.save(price);
    }
    async findAll() {
        return await this.productPriceRepository.find({
            relations: ['product', 'shop', 'createdBy', 'updatedBy'],
        });
    }
    async findByShop(shopId) {
        return await this.productPriceRepository.find({
            where: { shop: { id: shopId } },
            relations: ['product', 'shop', 'createdBy', 'updatedBy'],
        });
    }
    async findOne(id) {
        return await this.productPriceRepository.findOneOrFail({
            where: { id },
            relations: ['product', 'shop', 'createdBy', 'updatedBy'],
        });
    }
    async update(id, updateProductPriceDto) {
        const price = await this.productPriceRepository.findOne({
            where: { id },
            relations: ['product', 'shop', 'updatedBy'],
        });
        if (!price) {
            throw new Error(`ProductPrice with ID ${id} not found`);
        }
        const { productId, shopId, updatedById, ...rest } = updateProductPriceDto;
        Object.assign(price, rest);
        if (productId !== undefined) {
            const product = await this.productRepository.findOneBy({ id: productId });
            if (!product) {
                throw new Error(`Product with ID ${productId} not found`);
            }
            price.product = product;
        }
        if (shopId !== undefined) {
            const shop = await this.shopRepository.findOneBy({ id: shopId });
            if (!shop) {
                throw new Error(`Shop with ID ${shopId} not found`);
            }
            price.shop = shop;
        }
        if (updatedById !== undefined) {
            const user = await this.userRepository.findOneBy({ id: updatedById });
            if (!user) {
                throw new Error(`User with ID ${updatedById} not found`);
            }
            price.updatedBy = user;
        }
        await this.productPriceRepository.save(price);
        return this.findOne(id);
    }
    async remove(id) {
        await this.productPriceRepository.delete(id);
    }
};
exports.ProductPriceService = ProductPriceService;
exports.ProductPriceService = ProductPriceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_price_entity_1.ProductPrice)),
    __param(1, (0, typeorm_1.InjectRepository)(shop_entity_1.Shop)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductPriceService);
//# sourceMappingURL=product-prices.service.js.map