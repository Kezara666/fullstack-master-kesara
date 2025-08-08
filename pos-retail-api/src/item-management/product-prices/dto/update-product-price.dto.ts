import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductPriceDto {
  @ApiPropertyOptional({ example: 10.5 })
  wholeSalePrice?: number;

  @ApiPropertyOptional({ example: 8.0 })
  broughtPrice?: number;

  @ApiPropertyOptional({ example: 12.0 })
  primarySalePrice?: number;

  @ApiPropertyOptional({ example: 1 })
  productId?: number;

  @ApiPropertyOptional({ example: 1 })
  shopId?: number;

  @ApiPropertyOptional({ example: 101 })
  updatedById?: number;
}