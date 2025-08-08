import { Repository } from 'typeorm';
import { CreateQtyDto } from './dto/create-qty.dto';
import { UpdateQtyDto } from './dto/update-qty.dto';
import { Qty } from './entities/qty.entity';
import { Product } from 'src/item-management/products/entities/product.entity';
import { QtyType } from 'src/inventory-management/qty-type/entities/qty-type.entity';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';
export declare class QtyService {
    private readonly qtyRepository;
    private readonly productRepository;
    private readonly qtyTypeRepository;
    private readonly shopRepository;
    private readonly userRepository;
    constructor(qtyRepository: Repository<Qty>, productRepository: Repository<Product>, qtyTypeRepository: Repository<QtyType>, shopRepository: Repository<Shop>, userRepository: Repository<User>);
    create(createQtyDto: CreateQtyDto): Promise<Qty>;
    findAll(): Promise<Qty[]>;
    findByShop(shopId: number): Promise<Qty[]>;
    findOne(id: number): Promise<Qty>;
    update(id: number, updateQtyDto: UpdateQtyDto): Promise<Qty>;
    remove(id: number): Promise<void>;
}
