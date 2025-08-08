import { ApiProperty } from '@nestjs/swagger';

export class CreateSupplierDto {
  @ApiProperty({ example: 'ABC Supplier' })
  readonly name: string;

  @ApiProperty({ example: 1 })
  readonly shopId: number;

  @ApiProperty({ example: 101 })
  readonly createdById: number;
}