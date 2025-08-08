import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Created', type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Found user', type: User })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in a user by username and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully', type: User })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.findOneByUserNameAndPassword(loginDto.userName, loginDto.password);
    if (!user) {
      throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED);
    }
    // Optionally, generate a JWT token here instead of returning the user directly
    return user // Exclude password
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Updated', type: User })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
