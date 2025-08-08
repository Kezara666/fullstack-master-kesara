import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiPropertyOptional({ example: 'john@example.com' })
  email?: string;

  @ApiPropertyOptional({ example: '0771234567' })
  phoneNumber?: string;

  @ApiPropertyOptional({ example: '901234567V' })
  idNumber?: string;

  @ApiPropertyOptional({ example: 'admin' })
  role?: string;

  @ApiProperty({ example: 1 })
  shopId: number;

  @ApiPropertyOptional({ example: 'john@example.com' })
  userName: string;

  @ApiPropertyOptional({ example: 'john@example.com' })
  password: string;
}
