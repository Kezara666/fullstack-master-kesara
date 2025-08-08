import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { User } from 'src/shop-management/user/entities/user.entity';
import { Supplier } from 'src/item-management/supplier/entities/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shop,User,Supplier])],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
