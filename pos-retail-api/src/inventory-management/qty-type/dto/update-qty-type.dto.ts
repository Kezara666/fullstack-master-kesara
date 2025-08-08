import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateQtyTypeDto {
  @ApiPropertyOptional({ example: 'Kilogram' })
  name?: string;

  @ApiPropertyOptional({ example: 1 })
  mainQtyId?: number;

  @ApiPropertyOptional({ example: 1000 })
  primaryWeightTo?: number;

  @ApiPropertyOptional({ example: 1 })
  shopId?: number;

  @ApiPropertyOptional({ example: 102 })
  updatedById?: number;
}