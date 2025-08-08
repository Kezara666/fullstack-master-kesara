import { ApiProperty } from '@nestjs/swagger';

export class CreateProductPriceDto {
  @ApiProperty({ example: 10.5 })
  wholeSalePrice: number;

  @ApiProperty({ example: 8.0 })
  broughtPrice: number;

  @ApiProperty({ example: 12.0 })
  primarySalePrice: number;

  @ApiProperty({ example: 1 }) // Product ID
  productId: number;

  @ApiProperty({ example: 1 }) // Shop ID
  shopId: number;

  @ApiProperty({ example: 101 }) // Created by user ID
  createdById: number;

  @ApiProperty({ example: 101 }) // Updated by user ID
  updatedById: number;
}