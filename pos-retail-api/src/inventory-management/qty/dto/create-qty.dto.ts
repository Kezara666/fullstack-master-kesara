import { ApiProperty } from '@nestjs/swagger';

export class CreateQtyDto {
  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 1 })
  qtyTypeId: number;

  @ApiProperty({ example: 100.5 })
  qty: number;

  @ApiProperty({ example: 1 })
  shopId: number;

  @ApiProperty({ example: 101 })
  createdById: number;

  @ApiProperty({ example: 101 })
  updatedById: number;
}