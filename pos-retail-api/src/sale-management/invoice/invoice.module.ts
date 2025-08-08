import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { ItemSell } from '../item-sell/entities/item-sell.entity';
import { Supplier } from 'src/item-management/supplier/entities/supplier.entity';
import { Product } from 'src/item-management/products/entities/product.entity';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice,ItemSell,Supplier,Product,User,Shop])],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
