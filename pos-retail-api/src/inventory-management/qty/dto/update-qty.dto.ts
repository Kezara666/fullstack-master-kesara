import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateQtyDto {
  @ApiPropertyOptional({ example: 1 })
  productId?: number;

  @ApiPropertyOptional({ example: 1 })
  qtyTypeId?: number;

  @ApiPropertyOptional({ example: 100.5 })
  qty?: number;

  @ApiPropertyOptional({ example: 1 })
  shopId?: number;

  @ApiPropertyOptional({ example: 102 })
  updatedById?: number;
}