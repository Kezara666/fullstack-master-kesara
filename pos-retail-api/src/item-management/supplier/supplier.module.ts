import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { Supplier } from './entities/supplier.entity';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Supplier, Shop, User]),
  ],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}