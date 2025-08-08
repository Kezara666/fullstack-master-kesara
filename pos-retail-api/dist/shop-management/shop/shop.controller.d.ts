import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';
export declare class ShopController {
    private readonly shopService;
    constructor(shopService: ShopService);
    create(createShopDto: CreateShopDto): Promise<Shop>;
    findAll(): Promise<Shop[]>;
    findOne(id: string): Promise<Shop>;
    update(id: string, updateShopDto: UpdateShopDto): Promise<Shop>;
    remove(id: string): Promise<void>;
}
