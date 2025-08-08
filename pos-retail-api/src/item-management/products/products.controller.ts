import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { CreateProductWithDependenciesDto } from './dto/create-product-with-dependencies.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

   // NEW ENDPOINT for creating product with all its dependencies in one go
  @Post('create-full') // Choose a clear endpoint name
  @ApiOperation({ summary: 'Create a new product with associated price and quantity' })
  @ApiBody({ type: CreateProductWithDependenciesDto }) // Use the new DTO here
  @ApiResponse({ status: 201, description: 'Product, price, and quantity created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async createWithDependencies(
    @Body() createDto: CreateProductWithDependenciesDto,
  ): Promise<Product> { // Or a custom response DTO if you want to return more than just the product
    return this.productsService.createProductWithDependencies(createDto);
  }


  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of products returned.' })
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get('shop/:shopId')
  @ApiOperation({ summary: 'Get all products by shop ID' })
  @ApiParam({ name: 'shopId', type: Number, description: 'ID of the shop' })
  @ApiResponse({ status: 200, description: 'List of products for the given shop.' })
  async findByShop(@Param('shopId') shopId: number): Promise<Product[]> {
    return this.productsService.findByShop(shopId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product found.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(+id);
  }

  @Patch(':id/set-current-price')
  @ApiOperation({ summary: 'Set current price of a product based on productPrice ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Product ID' })
  @ApiBody({ schema: { properties: { productPriceId: { type: 'number' } } } })
  @ApiResponse({ status: 200, description: 'Product price updated successfully.' })
  @ApiResponse({ status: 404, description: 'Product or Price not found.' })
  async setCurrentPrice(
    @Param('id') productId: string,
    @Body('productPriceId') productPriceId: number,
  ): Promise<void> {
    return this.productsService.setProductCurrentPrice(productPriceId);
  }
}