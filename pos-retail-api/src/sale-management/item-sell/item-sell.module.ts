import { Module } from '@nestjs/common';
import { ItemSellService } from './item-sell.service';
import { ItemSellController } from './item-sell.controller';

@Module({
  controllers: [ItemSellController],
  providers: [ItemSellService],
})
export class ItemSellModule {}
