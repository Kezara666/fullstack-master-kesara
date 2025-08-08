import { Module } from '@nestjs/common';
import { QtyService } from './qty.service';
import { QtyController } from './qty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';
import { QtyType } from '../qty-type/entities/qty-type.entity';
import { Qty } from './entities/qty.entity';
import { Product } from 'src/item-management/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Qty, Shop, User,QtyType,Product])],
  providers: [QtyService],
  controllers: [QtyController],
})
export class QtyModule {}
