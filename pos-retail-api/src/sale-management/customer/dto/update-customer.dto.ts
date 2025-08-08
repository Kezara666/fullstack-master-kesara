
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCustomerDto {
  @ApiPropertyOptional({ example: 'Jane Doe', description: 'Customer name' })

  name?: string;

  @ApiPropertyOptional({ example: '+1987654321', description: 'Customer phone number' })

  phoneNumber?: string;
}