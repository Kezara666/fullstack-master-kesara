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
