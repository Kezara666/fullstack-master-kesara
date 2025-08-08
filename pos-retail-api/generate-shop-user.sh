#!/bin/bash

GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}Generating Shop and User modules...${NC}"

# Create folder structure
mkdir -p src/shop/entities
mkdir -p src/user/entities
mkdir -p src/shop/dto
mkdir -p src/user/dto

# --- SHOP ENTITY ---
cat > src/shop/entities/shop.entity.ts << EOL
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.shop)
  users: User[];
}
EOL

# --- USER ENTITY ---
cat > src/user/entities/user.entity.ts << EOL
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email?: string;

  @Column({ unique: true })
  phoneNumber?: string;

  @Column({ unique: true })
  idNumber?: string;

  @Column({ nullable: true })
  role?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Shop, (shop) => shop.users)
  @JoinColumn({ name: 'shopId' })
  shop: Shop;

  @Column()
  shopId: number;
}
EOL

# --- SHOP DTOs ---
cat > src/shop/dto/create-shop.dto.ts << EOL
import { ApiProperty } from '@nestjs/swagger';

export class CreateShopDto {
  @ApiProperty({ example: 'Main Branch' })
  name: string;

  @ApiPropertyOptional({ example: 'Downtown location' })
  description?: string;

  @ApiProperty({ example: true })
  isActive: boolean;
}
EOL

cat > src/shop/dto/update-shop.dto.ts << EOL
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateShopDto {
  @ApiPropertyOptional({ example: 'Updated Name' })
  name?: string;

  @ApiPropertyOptional({ example: 'Updated description' })
  description?: string;

  @ApiPropertyOptional({ example: false })
  isActive?: boolean;
}
EOL

# --- USER DTOs ---
cat > src/user/dto/create-user.dto.ts << EOL
import { ApiProperty } from '@nestjs/swagger';

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
}
EOL

cat > src/user/dto/update-user.dto.ts << EOL
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'John Doe' })
  name?: string;

  @ApiPropertyOptional({ example: 'john@example.com' })
  email?: string;

  @ApiPropertyOptional({ example: '0771234567' })
  phoneNumber?: string;

  @ApiPropertyOptional({ example: '901234567V' })
  idNumber?: string;

  @ApiPropertyOptional({ example: 'admin' })
  role?: string;

  @ApiPropertyOptional({ example: 1 })
  shopId?: number;
}
EOL

# --- SHOP SERVICE ---
cat > src/shop/shop.service.ts << EOL
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  create(createShopDto: CreateShopDto): Promise<Shop> {
    const shop = this.shopRepository.create(createShopDto);
    return this.shopRepository.save(shop);
  }

  findAll(): Promise<Shop[]> {
    return this.shopRepository.find({ relations: ['users'] });
  }

  findOne(id: number): Promise<Shop> {
    return this.shopRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  update(id: number, updateShopDto: UpdateShopDto): Promise<Shop> {
    return this.shopRepository.save({ id, ...updateShopDto });
  }

  remove(id: number): Promise<void> {
    return this.shopRepository.delete(id).then();
  }
}
EOL

# --- USER SERVICE ---
cat > src/user/user.service.ts << EOL
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Shop } from '../shop/entities/shop.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const shop = await this.shopRepository.findOneBy({ id: createUserDto.shopId });
    const user = this.userRepository.create({ ...createUserDto, shop });
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['shop'] });
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['shop'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.shopId) {
      const shop = await this.shopRepository.findOneBy({ id: updateUserDto.shopId });
      updateUserDto['shop'] = shop;
    }
    return this.userRepository.save({ id, ...updateUserDto });
  }

  remove(id: number): Promise<void> {
    return this.userRepository.delete(id).then();
  }
}
EOL

# --- SHOP CONTROLLER ---
cat > src/shop/shop.controller.ts << EOL
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Shop } from './entities/shop.entity';

@ApiTags('shops')
@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shop' })
  @ApiBody({ type: CreateShopDto })
  @ApiResponse({ status: 201, description: 'Created', type: Shop })
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopService.create(createShopDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all shops' })
  @ApiResponse({ status: 200, description: 'List of shops', type: [Shop] })
  findAll() {
    return this.shopService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get shop by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Found shop', type: Shop })
  findOne(@Param('id') id: string) {
    return this.shopService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update shop by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateShopDto })
  @ApiResponse({ status: 200, description: 'Updated', type: Shop })
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(+id, updateShopDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete shop by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  remove(@Param('id') id: string) {
    return this.shopService.remove(+id);
  }
}
EOL

# --- USER CONTROLLER ---
cat > src/user/user.controller.ts << EOL
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
EOL

# --- SHOP MODULE ---
cat > src/shop/shop.module.ts << EOL
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shop])],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
EOL

# --- USER MODULE ---
cat > src/user/user.module.ts << EOL
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Shop } from '../shop/entities/shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Shop])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
EOL

echo -e "${GREEN}✅ Shop and User modules generated successfully!${NC}"