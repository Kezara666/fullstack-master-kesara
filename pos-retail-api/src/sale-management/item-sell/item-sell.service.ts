import { Injectable } from '@nestjs/common';
import { CreateItemSellDto } from './dto/create-item-sell.dto';
import { UpdateItemSellDto } from './dto/update-item-sell.dto';

@Injectable()
export class ItemSellService {
  create(createItemSellDto: CreateItemSellDto) {
    return 'This action adds a new itemSell';
  }

  findAll() {
    return `This action returns all itemSell`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemSell`;
  }

  update(id: number, updateItemSellDto: UpdateItemSellDto) {
    return `This action updates a #${id} itemSell`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemSell`;
  }
}
