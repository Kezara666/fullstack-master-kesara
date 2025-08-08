import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQtyTypeDto {
  @ApiProperty({ example: 'Gram' })
  name: string;

  @ApiPropertyOptional({ example: 1 })
  mainQtyId?: number;

  @ApiProperty({ example: 0 })
  primaryWeightTo: number;

  @ApiProperty({ example: 1 })
  shopId: number;

  @ApiProperty({ example: 101 })
  createdById: number;

  @ApiProperty({ example: 101 })
  updatedById: number;
}