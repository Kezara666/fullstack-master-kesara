import { CreateItemSellDto } from './dto/create-item-sell.dto';
import { UpdateItemSellDto } from './dto/update-item-sell.dto';
export declare class ItemSellService {
    create(createItemSellDto: CreateItemSellDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateItemSellDto: UpdateItemSellDto): string;
    remove(id: number): string;
}
