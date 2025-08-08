import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin', description: 'The username of the user' })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ example: 'admin', description: 'The password of the user' })
  @IsString()
  @IsNotEmpty()
  password: string;
}