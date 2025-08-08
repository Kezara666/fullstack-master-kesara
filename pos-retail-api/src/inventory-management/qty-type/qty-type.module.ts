import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QtyTypeController } from './qty-type.controller';
import { QtyTypeService } from './qty-type.service';
import { QtyType } from './entities/qty-type.entity';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QtyType, Shop, User]),
  ],
  controllers: [QtyTypeController],
  providers: [QtyTypeService],
})
export class QtyTypeModule {}