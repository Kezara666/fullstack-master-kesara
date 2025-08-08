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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const create_product_with_dependencies_dto_1 = require("./dto/create-product-with-dependencies.dto");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async create(createProductDto) {
        return this.productsService.create(createProductDto);
    }
    async createWithDependencies(createDto) {
        return this.productsService.createProductWithDependencies(createDto);
    }
    async findAll() {
        return this.productsService.findAll();
    }
    async findByShop(shopId) {
        return this.productsService.findByShop(shopId);
    }
    async findOne(id) {
        return this.productsService.findOne(+id);
    }
    async update(id, updateProductDto) {
        return this.productsService.update(+id, updateProductDto);
    }
    async remove(id) {
        return this.productsService.remove(+id);
    }
    async setCurrentPrice(productId, productPriceId) {
        return this.productsService.setProductCurrentPrice(productPriceId);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new product' }),
    (0, swagger_1.ApiBody)({ type: create_product_dto_1.CreateProductDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product created successfully.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('create-full'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new product with associated price and quantity' }),
    (0, swagger_1.ApiBody)({ type: create_product_with_dependencies_dto_1.CreateProductWithDependenciesDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product, price, and quantity created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_with_dependencies_dto_1.CreateProductWithDependenciesDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createWithDependencies", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of products returned.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('shop/:shopId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products by shop ID' }),
    (0, swagger_1.ApiParam)({ name: 'shopId', type: Number, description: 'ID of the shop' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of products for the given shop.' }),
    __param(0, (0, common_1.Param)('shopId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findByShop", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a product by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'Product ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a product by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiBody)({ type: update_product_dto_1.UpdateProductDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a product by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'Product ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/set-current-price'),
    (0, swagger_1.ApiOperation)({ summary: 'Set current price of a product based on productPrice ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'Product ID' }),
    (0, swagger_1.ApiBody)({ schema: { properties: { productPriceId: { type: 'number' } } } }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product price updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product or Price not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('productPriceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "setCurrentPrice", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map