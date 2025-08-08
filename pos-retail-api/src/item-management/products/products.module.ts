
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { Supplier } from '../supplier/entities/supplier.entity';
import { QtyType } from '../../inventory-management/qty-type/entities/qty-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPrice } from '../product-prices/entities/product-price.entity';
import { User } from 'src/shop-management/user/entities/user.entity';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { Qty } from 'src/inventory-management/qty/entities/qty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Supplier, QtyType,ProductPrice,User,Shop,Qty])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
