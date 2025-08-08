// src/products/dto/create-product-with-dependencies.dto.ts
import { IsNotEmpty, IsNumber, IsString, IsOptional, ValidateNested, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// Nested DTO for ProductPrice data
export class ProductPriceDataDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  wholeSalePrice: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  broughtPrice: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  primarySalePrice: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  createdById: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  updatedById: number;
}

// Nested DTO for Quantity data
export class QtyDataDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  qtyTypeId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  createdById: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  updatedById: number;
}

// Main DTO for creating Product with its dependencies
export class CreateProductWithDependenciesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  barCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  qrCode?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  subcategory?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  currentPrice: number; // This will likely be set by primarySalePrice from productPrice during backend processing

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  warranty: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  supplierId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  qtyTypeId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  qty: number; // Initial quantity for the product, also used for Qty entity

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  createdById: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  updatedById: number;

  @ApiProperty({ type: () => ProductPriceDataDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ProductPriceDataDto)
  productPrice: ProductPriceDataDto;

  @ApiProperty({ type: () => QtyDataDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => QtyDataDto)
  qtyData: QtyDataDto;
}