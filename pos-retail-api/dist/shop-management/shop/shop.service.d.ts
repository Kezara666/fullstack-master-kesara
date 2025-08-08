import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { User } from 'src/shop-management/user/entities/user.entity';
import { Supplier } from 'src/item-management/supplier/entities/supplier.entity';
export declare class ShopService {
    private readonly shopRepository;
    private readonly userRepository;
    private readonly supplierRepository;
    constructor(shopRepository: Repository<Shop>, userRepository: Repository<User>, supplierRepository: Repository<Supplier>);
    create(createShopDto: CreateShopDto): Promise<Shop>;
    findAll(): Promise<Shop[]>;
    findOne(id: number): Promise<Shop>;
    update(id: number, updateShopDto: UpdateShopDto): Promise<Shop>;
    remove(id: number): Promise<void>;
}
