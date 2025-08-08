
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'John Doe', description: 'Customer name' })
  name: string;
  @ApiProperty({ example: '+1234567890', description: 'Customer phone number' })
  phoneNumber: string;
}