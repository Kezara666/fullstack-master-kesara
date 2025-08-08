import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPrice } from './entities/product-price.entity';
import { ProductPriceController } from './product-prices.controller';
import { ProductPriceService } from './product-prices.service';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductPrice, Product, Shop, User]),
  ],
  controllers: [ProductPriceController],
  providers: [ProductPriceService],
})
export class ProductPriceModule {}