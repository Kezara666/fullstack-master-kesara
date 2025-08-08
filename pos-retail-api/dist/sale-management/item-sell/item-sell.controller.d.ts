import { ItemSellService } from './item-sell.service';
import { CreateItemSellDto } from './dto/create-item-sell.dto';
import { UpdateItemSellDto } from './dto/update-item-sell.dto';
export declare class ItemSellController {
    private readonly itemSellService;
    constructor(itemSellService: ItemSellService);
    create(createItemSellDto: CreateItemSellDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateItemSellDto: UpdateItemSellDto): string;
    remove(id: string): string;
}
