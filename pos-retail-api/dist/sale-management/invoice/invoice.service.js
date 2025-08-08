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
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../../item-management/products/entities/product.entity");
const typeorm_2 = require("typeorm");
const item_sell_entity_1 = require("../item-sell/entities/item-sell.entity");
const invoice_entity_1 = require("./entities/invoice.entity");
const shop_entity_1 = require("../../shop-management/shop/entities/shop.entity");
const user_entity_1 = require("../../shop-management/user/entities/user.entity");
const customer_entity_1 = require("../customer/entities/customer.entity");
const qty_type_entity_1 = require("../../inventory-management/qty-type/entities/qty-type.entity");
const product_price_entity_1 = require("../../item-management/product-prices/entities/product-price.entity");
let InvoiceService = class InvoiceService {
    constructor(invoiceRepository, itemSellRepository, productRepository) {
        this.invoiceRepository = invoiceRepository;
        this.itemSellRepository = itemSellRepository;
        this.productRepository = productRepository;
    }
    async create(createInvoiceDto) {
        const queryRunner = this.invoiceRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const { itemsSelled: itemsSelledDtos, ...invoiceData } = createInvoiceDto;
            const [shop, createdBy, updatedBy, customer] = await Promise.all([
                queryRunner.manager.findOneBy(shop_entity_1.Shop, { id: invoiceData.shopId }),
                queryRunner.manager.findOneBy(user_entity_1.User, { id: invoiceData.createdById }),
                queryRunner.manager.findOneBy(user_entity_1.User, { id: invoiceData.updatedById }),
                invoiceData.customerId ? queryRunner.manager.findOneBy(customer_entity_1.Customer, { id: invoiceData.customerId }) : null,
            ]);
            if (!shop || !createdBy || !updatedBy) {
                throw new common_1.NotFoundException('Invalid shop, createdBy, or updatedBy references');
            }
            const completeInvoiceData = {
                total: invoiceData.total || 0,
                discount: invoiceData.discount || 0,
                netTotal: invoiceData.netTotal || 0,
                completedItemSell: invoiceData.completedItemSell ?? true,
                createdAt: invoiceData.createdAt || new Date(),
                updatedAt: invoiceData.updatedAt || new Date(),
                shop,
                createdBy,
                updatedBy,
                customer: customer || null,
            };
            const invoice = queryRunner.manager.create(invoice_entity_1.Invoice, completeInvoiceData);
            const savedInvoice = await queryRunner.manager.save(invoice_entity_1.Invoice, invoice);
            let total = 0;
            for (const itemDto of itemsSelledDtos) {
                const [product, qtyType, productPrice] = await Promise.all([
                    queryRunner.manager.findOne(product_entity_1.Product, {
                        where: { id: itemDto.productId },
                        relations: ['qtyType'],
                    }),
                    queryRunner.manager.findOneBy(qty_type_entity_1.QtyType, { id: itemDto.qtyTypeId }),
                    itemDto.productPriceId ? queryRunner.manager.findOneBy(product_price_entity_1.ProductPrice, { id: itemDto.productPriceId }) : null,
                ]);
                if (!product) {
                    throw new common_1.NotFoundException(`Product with ID ${itemDto.productId} not found`);
                }
                if (!qtyType) {
                    throw new common_1.NotFoundException(`QtyType with ID ${itemDto.qtyTypeId} not found`);
                }
                if (itemDto.productPriceId && !productPrice) {
                    throw new common_1.NotFoundException(`ProductPrice with ID ${itemDto.productPriceId} not found`);
                }
                if (product.qty < itemDto.qty) {
                    throw new Error(`Insufficient stock for product ${product.name}`);
                }
                product.qty -= itemDto.qty;
                await queryRunner.manager.save(product_entity_1.Product, product);
                const itemSell = queryRunner.manager.create(item_sell_entity_1.ItemSell, {
                    qty: itemDto.qty,
                    qntPrice: itemDto.qntPrice,
                    product,
                    productPrice: productPrice || null,
                    invoiceId: savedInvoice.id,
                    invoice: await queryRunner.manager.findOneBy(invoice_entity_1.Invoice, { id: savedInvoice.id }),
                    qtyType,
                    pendingAmount: itemDto.pendingdAmount || 0,
                    completedItemSell: itemDto.completedItemSell ?? true,
                    shop: shop,
                    createdBy: createdBy,
                    updatedBy: updatedBy
                });
                console.log('itemSell before save:', { ...itemSell, invoiceId: itemSell.invoice.id });
                const savedItemSell = await queryRunner.manager.save(item_sell_entity_1.ItemSell, itemSell);
                console.log('itemSell after save:', { ...savedItemSell, invoiceId: savedItemSell.invoice });
                total += itemSell.qntPrice;
            }
            savedInvoice.total = total;
            savedInvoice.netTotal = total - savedInvoice.discount;
            await queryRunner.manager.save(savedInvoice);
            await queryRunner.commitTransaction();
            return await this.invoiceRepository.findOne({
                where: { id: savedInvoice.id },
                relations: {
                    itemsSelled: {
                        product: true,
                        qtyType: true,
                        productPrice: true
                    },
                },
            });
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll() {
        return await this.invoiceRepository.find({
            relations: {
                itemsSelled: {
                    product: true,
                    qtyType: true,
                },
            },
        });
    }
    async findOne(id) {
        const invoice = await this.invoiceRepository.findOne({
            where: { id },
            relations: ['itemsSelled', 'itemsSelled.product'],
        });
        if (!invoice) {
            throw new common_1.NotFoundException(`Invoice with ID ${id} not found`);
        }
        return invoice;
    }
    async findByShopId(shopId) {
        const invoices = await this.invoiceRepository.find({
            where: {
                shop: { id: shopId },
            },
            relations: {
                itemsSelled: {
                    product: true,
                    qtyType: true,
                    productPrice: true,
                },
                shop: true,
                createdBy: true,
                updatedBy: true,
                customer: true,
            },
            order: {
                createdAt: 'DESC',
            },
        });
        if (!invoices || invoices.length === 0) {
            throw new common_1.NotFoundException(`No invoices found for shop ID ${shopId}`);
        }
        return invoices;
    }
    async update(id, updateInvoiceDto) {
        const invoice = await this.invoiceRepository.findOne({ where: { id } });
        if (!invoice) {
            throw new common_1.NotFoundException(`Invoice with ID ${id} not found`);
        }
        await this.invoiceRepository.update(id, updateInvoiceDto);
        return await this.invoiceRepository.findOne({ where: { id } });
    }
    async remove(id) {
        const invoice = await this.invoiceRepository.findOne({ where: { id } });
        if (!invoice) {
            throw new common_1.NotFoundException(`Invoice with ID ${id} not found`);
        }
        await this.invoiceRepository.remove(invoice);
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __param(1, (0, typeorm_1.InjectRepository)(item_sell_entity_1.ItemSell)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map