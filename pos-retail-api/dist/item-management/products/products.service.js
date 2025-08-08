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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const qty_type_entity_1 = require("../../inventory-management/qty-type/entities/qty-type.entity");
const supplier_entity_1 = require("../supplier/entities/supplier.entity");
const product_price_entity_1 = require("../product-prices/entities/product-price.entity");
const shop_entity_1 = require("../../shop-management/shop/entities/shop.entity");
const user_entity_1 = require("../../shop-management/user/entities/user.entity");
const qty_entity_1 = require("../../inventory-management/qty/entities/qty.entity");
let ProductsService = class ProductsService {
    constructor(productRepository, productPriceRepository, supplierRepository, qtyTypeRepository, qtyRepository, shopRepository, userRepository, entityManager) {
        this.productRepository = productRepository;
        this.productPriceRepository = productPriceRepository;
        this.supplierRepository = supplierRepository;
        this.qtyTypeRepository = qtyTypeRepository;
        this.qtyRepository = qtyRepository;
        this.shopRepository = shopRepository;
        this.userRepository = userRepository;
        this.entityManager = entityManager;
    }
    async create(createProductDto) {
        const { supplierId, qtyTypeId, productPriceId, shopId, createdById, updatedById, ...rest } = createProductDto;
        const [supplier, qtyType, shop, createdBy, updatedBy] = await Promise.all([
            this.supplierRepository.findOneBy({ id: supplierId }),
            this.qtyTypeRepository.findOneBy({ id: qtyTypeId }),
            this.shopRepository.findOneBy({ id: shopId }),
            this.userRepository.findOneBy({ id: createdById }),
            this.userRepository.findOneBy({ id: updatedById }),
        ]);
        if (!supplier || !qtyType || !shop || !createdBy || !updatedBy) {
            throw new common_1.NotFoundException('Invalid references found');
        }
        let productPrice = null;
        if (productPriceId !== undefined) {
            productPrice = await this.productPriceRepository.findOneBy({ id: productPriceId });
            if (!productPrice) {
                throw new common_1.NotFoundException(`ProductPrice with ID ${productPriceId} not found`);
            }
        }
        const product = this.productRepository.create({
            ...rest,
            supplier,
            qtyType,
            productPrice,
            shop,
            createdBy,
            updatedBy,
        });
        return await this.productRepository.save(product);
    }
    async createProductWithDependencies(createDto) {
        return this.entityManager.transaction(async (transactionalEntityManager) => {
            const supplier = await transactionalEntityManager.findOneBy(supplier_entity_1.Supplier, { id: createDto.supplierId });
            if (!supplier) {
                throw new common_1.NotFoundException(`Supplier with ID ${createDto.supplierId} not found.`);
            }
            const qtyType = await transactionalEntityManager.findOneBy(qty_type_entity_1.QtyType, { id: createDto.qtyTypeId });
            if (!qtyType) {
                throw new common_1.NotFoundException(`Quantity Type with ID ${createDto.qtyTypeId} not found.`);
            }
            const shop = await transactionalEntityManager.findOneBy(shop_entity_1.Shop, { id: createDto.shopId });
            if (!shop) {
                throw new common_1.NotFoundException(`Shop with ID ${createDto.shopId} not found.`);
            }
            const createdBy = await transactionalEntityManager.findOneBy(user_entity_1.User, { id: createDto.createdById });
            if (!createdBy) {
                throw new common_1.NotFoundException(`User with ID ${createDto.createdById} (created by) not found.`);
            }
            const updatedBy = await transactionalEntityManager.findOneBy(user_entity_1.User, { id: createDto.updatedById });
            if (!updatedBy) {
                throw new common_1.NotFoundException(`User with ID ${createDto.updatedById} (updated by) not found.`);
            }
            const productToCreate = transactionalEntityManager.create(product_entity_1.Product, {
                name: createDto.name,
                description: createDto.description,
                barCode: createDto.barCode,
                qrCode: createDto.qrCode,
                category: createDto.category,
                subcategory: createDto.subcategory,
                currentPrice: createDto.currentPrice,
                warranty: createDto.warranty,
                qty: createDto.qty,
                shop: shop,
                createdBy: createdBy,
                updatedBy: updatedBy,
                supplier: supplier,
                qtyType: qtyType,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            const savedProduct = await transactionalEntityManager.save(productToCreate);
            const productPriceToCreate = transactionalEntityManager.create(product_price_entity_1.ProductPrice, {
                ...createDto.productPrice,
                product: savedProduct,
                shop: shop,
                createdBy: createdBy,
                updatedBy: updatedBy
            });
            const savedProductPrice = await transactionalEntityManager.save(productPriceToCreate);
            savedProduct.productPrice = savedProductPrice;
            savedProduct.currentPrice = savedProductPrice.primarySalePrice;
            await transactionalEntityManager.save(savedProduct);
            const qtyToCreate = transactionalEntityManager.create(qty_entity_1.Qty, {
                product: savedProduct,
                qtyType: qtyType,
                qty: createDto.qtyData.qty,
                shop: shop,
                createdBy: createdBy,
                updatedBy: updatedBy
            });
            await transactionalEntityManager.save(qtyToCreate);
            return savedProduct;
        });
    }
    async findAll() {
        const product = await this.productRepository.find({
            relations: ['supplier', 'qtyType', 'shop', 'createdBy', 'updatedBy', 'productPrice'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product Not Founds`);
        }
        return product;
    }
    async findByShop(shopId) {
        const product = await this.productRepository.find({
            where: { shop: { id: shopId } },
            relations: ['supplier', 'qtyType', 'shop', 'createdBy', 'updatedBy', 'productPrice'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product Not Founds`);
        }
        return product;
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['supplier', 'qtyType', 'productPrice', 'shop', 'createdBy', 'updatedBy', 'productPrice'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['supplier', 'qtyType', 'productPrice', 'shop', 'createdBy', 'updatedBy', 'productPrice'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        const { supplierId, qtyTypeId, productPriceId, shopId, updatedById, ...rest } = updateProductDto;
        Object.assign(product, rest);
        if (supplierId !== undefined) {
            const supplier = await this.supplierRepository.findOneBy({ id: supplierId });
            if (!supplier) {
                throw new common_1.NotFoundException(`Supplier with ID ${supplierId} not found`);
            }
            product.supplier = supplier;
        }
        if (qtyTypeId !== undefined) {
            const qtyType = await this.qtyTypeRepository.findOneBy({ id: qtyTypeId });
            if (!qtyType) {
                throw new common_1.NotFoundException(`QtyType with ID ${qtyTypeId} not found`);
            }
            product.qtyType = qtyType;
        }
        if (productPriceId !== undefined) {
            const productPrice = await this.productPriceRepository.findOneBy({ id: productPriceId });
            if (!productPrice) {
                throw new common_1.NotFoundException(`ProductPrice with ID ${productPriceId} not found`);
            }
            product.productPrice = productPrice;
        }
        if (shopId !== undefined) {
            const shop = await this.shopRepository.findOneBy({ id: shopId });
            if (!shop) {
                throw new common_1.NotFoundException(`Shop with ID ${shopId} not found`);
            }
            product.shop = shop;
        }
        if (updatedById !== undefined) {
            const updatedBy = await this.userRepository.findOneBy({ id: updatedById });
            if (!updatedBy) {
                throw new common_1.NotFoundException(`User with ID ${updatedById} not found`);
            }
            product.updatedBy = updatedBy;
        }
        await this.productRepository.save(product);
        return this.findOne(id);
    }
    async remove(id) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['productPrice'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        if (product.productPrice) {
            product.productPrice = null;
            await this.productRepository.save(product);
        }
        await this.productPriceRepository.delete({ productId: id });
        await this.qtyRepository.delete({ product: { id } });
        await this.productRepository.delete(id);
    }
    async setProductCurrentPrice(productPriceId) {
        const price = await this.productPriceRepository.findOneBy({ id: productPriceId });
        if (!price) {
            throw new Error(`ProductPrice not found for ID: ${productPriceId}`);
        }
        const product = await this.productRepository.findOneBy({ id: price.productId });
        if (!product) {
            throw new Error(`Product not found for price ID: ${price.id}`);
        }
        product.currentPrice = price.primarySalePrice;
        product.productPrice = price;
        await this.productRepository.save(product);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(product_price_entity_1.ProductPrice)),
    __param(2, (0, typeorm_1.InjectRepository)(supplier_entity_1.Supplier)),
    __param(3, (0, typeorm_1.InjectRepository)(qty_type_entity_1.QtyType)),
    __param(4, (0, typeorm_1.InjectRepository)(qty_entity_1.Qty)),
    __param(5, (0, typeorm_1.InjectRepository)(shop_entity_1.Shop)),
    __param(6, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.EntityManager])
], ProductsService);
//# sourceMappingURL=products.service.js.map