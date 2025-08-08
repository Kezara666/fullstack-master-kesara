import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSupplierDto {
  @ApiPropertyOptional({ example: 'Updated Supplier Name' })
  readonly name?: string;

  @ApiPropertyOptional({ example: 1 })
  readonly shopId?: number;

  @ApiPropertyOptional({ example: 102 })
  readonly updatedById: number;
}