import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateShopDto {
  @ApiPropertyOptional({ example: 'Updated Name' })
  name?: string;

  @ApiPropertyOptional({ example: 'Updated description' })
  description?: string;

  @ApiPropertyOptional({ example: false })
  isActive?: boolean;
}
