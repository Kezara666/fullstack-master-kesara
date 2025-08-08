import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateShopDto {
  @ApiProperty({ example: 'Main Branch' })
  name: string;

  @ApiPropertyOptional({ example: 'Downtown location' })
  description?: string;

  @ApiProperty({ example: true })
  isActive: boolean;
}
